# API Contracts (routes)

This file lists the REST endpoints that the frontend will use to fetch content from Strapi.

Public endpoints (no auth required):

- GET /api/products
  - Query params: `?populate=coverImage,gallery&filters[isFeatured][$eq]=true&pagination[limit]=N&page=1`
  - Returns: list of `Product` entries

- GET /api/products/:id or /api/products?filters[slug][$eq]=:slug
  - Returns: single `Product` entry (use slug filter preferred for human URLs)

- GET /api/news
  - Query params: `?populate=coverImage,attachments&pagination[limit]=N&page=1`
  - Returns: list of `News` entries

- GET /api/news?filters[slug][$eq]=:slug
  - Returns: single `News` entry by slug

Protected endpoints (require authentication / appropriate role):

- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- POST /api/news
- PUT /api/news/:id
- DELETE /api/news/:id

Notes:
- Pagination, sorting, and filtering follow Strapi v5 query conventions.
- All public GET endpoints must be allowed for the `public` role in Strapi (find/findOne). Write endpoints must be accessible only by authenticated roles.
- Media upload endpoint: POST /api/upload (Strapi built-in) — used during migration to populate media library.
