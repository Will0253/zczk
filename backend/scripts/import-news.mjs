import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadExports } from './parse-content.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_TOKEN. Set STRAPI_TOKEN to an admin JWT.');
  process.exit(1);
}

function detectMimeType(fileName) {
  const ext = fileName.toLowerCase().split('.').pop();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    default:
      return 'application/octet-stream';
  }
}

async function uploadImage(relativePath) {
  if (!relativePath) return null;
  const normalized = relativePath.replace(/^\//, '');
  const absolutePath = path.join(repoRoot, 'frontend', 'public', normalized);

  try {
    const buffer = await fs.readFile(absolutePath);
    const formData = new FormData();
    const fileName = path.basename(absolutePath);
    const file = new File([buffer], fileName, { type: detectMimeType(fileName) });
    formData.append('files', file);

    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload failed (${res.status}): ${text}`);
    }

    const json = await res.json();
    return json?.[0]?.id ?? null;
  } catch (error) {
    console.warn(`Image upload skipped: ${relativePath}`, error);
    return null;
  }
}

async function fetchExistingNews(slug) {
  const res = await fetch(`${STRAPI_URL}/api/news?filters[slug][$eq]=${encodeURIComponent(slug)}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch existing news failed (${res.status})`);
  }

  const json = await res.json();
  return json?.data?.[0] ?? null;
}

async function upsertNews(payload) {
  const existing = await fetchExistingNews(payload.slug);
  const identifier = existing?.documentId ?? existing?.id;
  const endpoint = identifier ? `${STRAPI_URL}/api/news/${identifier}` : `${STRAPI_URL}/api/news`;
  const method = identifier ? 'PUT' : 'POST';

  const res = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 404 && method === 'PUT') {
      const retry = await fetch(`${STRAPI_URL}/api/news`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: payload }),
      });

      if (!retry.ok) {
        const retryText = await retry.text();
        throw new Error(`Create news failed (${retry.status}): ${retryText}`);
      }

      return retry.json();
    }

    throw new Error(`Upsert news failed (${res.status}): ${text}`);
  }

  return res.json();
}

async function run() {
  const { newsArticles } = await loadExports(
    path.join(repoRoot, 'frontend', 'content', 'news.ts'),
    ['newsArticles']
  );

  for (const article of newsArticles) {
    const imageId = await uploadImage(article.image);

    const payload = {
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      content: article.content,
      category: article.category,
      image: imageId,
      author: article.author,
      featured: article.featured,
      tags: article.tags,
      relatedProducts: article.relatedProducts ?? null,
      viewCount: article.viewCount ?? 0,
      publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString(),
    };

    await upsertNews(payload);
    console.log(`Imported news: ${article.slug}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
