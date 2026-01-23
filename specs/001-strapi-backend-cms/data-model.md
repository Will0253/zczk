# Data Model

This document describes the content types to be created in Strapi v5 for this feature.

## Product (collectionType)
- `id`: integer (auto)
- `title`: string (required)
- `slug`: UID / string (required, unique) — used for URLs
- `summary`: text (short)
- `description`: rich text (long)
- `coverImage`: media (single)
- `gallery`: media (multiple)
- `publishedAt`: datetime
- `isFeatured`: boolean (for homepage selection)
- `order`: integer (optional, for manual ordering)

Validation rules:
- `title` required, `slug` required and unique, `publishedAt` optional but recommended.

State transitions:
- draft -> published (set `publishedAt`)
- published -> archived (optional field or remove publish flag)

## News (collectionType)
- `id`: integer (auto)
- `title`: string (required)
- `slug`: UID / string (required, unique)
- `summary`: text
- `content`: rich text
- `coverImage`: media (single)
- `attachments`: media (multiple)
- `publishedAt`: datetime
- `isFeatured`: boolean

Validation rules:
- `title` and `slug` required. `content` can be empty (summary-only articles allowed).

## Media Asset (managed by Strapi upload plugin)
- Stored/represented by Strapi's `file` entity. Link to `Product` and `News` via relations.

## Homepage Highlights
- Use a boolean `isFeatured` on Product/News and query top N by `publishedAt` for homepage widgets.

Notes:
- Collections are simple, avoiding heavy relational complexity. If editorial needs advanced categorization or tags, add `Category` or `Tag` collection later.
