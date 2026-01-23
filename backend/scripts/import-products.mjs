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

async function fetchExistingProduct(slug) {
  const res = await fetch(`${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch existing product failed (${res.status})`);
  }

  const json = await res.json();
  return json?.data?.[0] ?? null;
}

async function upsertProduct(payload) {
  const existing = await fetchExistingProduct(payload.slug);
  const identifier = existing?.documentId ?? existing?.id;
  const endpoint = identifier
    ? `${STRAPI_URL}/api/products/${identifier}`
    : `${STRAPI_URL}/api/products`;
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
      const retry = await fetch(`${STRAPI_URL}/api/products`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: payload }),
      });

      if (!retry.ok) {
        const retryText = await retry.text();
        throw new Error(`Create product failed (${retry.status}): ${retryText}`);
      }

      return retry.json();
    }

    throw new Error(`Upsert product failed (${res.status}): ${text}`);
  }

  return res.json();
}

async function run() {
  const { products } = await loadExports(
    path.join(repoRoot, 'frontend', 'content', 'products.ts'),
    ['products']
  );

  for (const product of products) {
    const imageId = await uploadImage(product.image);
    const galleryIds = Array.isArray(product.gallery)
      ? (await Promise.all(product.gallery.map(uploadImage))).filter(Boolean)
      : [];

    const payload = {
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      category: product.category,
      image: imageId,
      gallery: galleryIds,
      features: product.features,
      specifications: product.specifications ?? null,
      featured: product.featured,
      order: product.order,
      taobaoLink: product.taobaoLink,
      publishedAt: new Date().toISOString(),
    };

    await upsertProduct(payload);
    console.log(`Imported product: ${product.slug}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
