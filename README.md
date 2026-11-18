# Remnexa — product site

Static, self-contained site. English UI. No email, payment, analytics or credential input.

## Build and run

```sh
node build.mjs     # regenerates dist/
npm test           # acceptance tests against dist/
node preview.mjs   # http://127.0.0.1:8810/
```

Node 22+, no package installation.

## Layout

- `pages/remnexa.mjs` — landing composition.
- `products.mjs`, `content.mjs` — copy, documentation sections, sources.
- `templates.mjs`, `ui.mjs`, `shared/` — documentation generation, primitives, styles, scripts.
- `vendor/` — Lucide 1.57.0 (ISC, `LUCIDE-LICENSE`).
- `dist/` — committed build output; deploy this directory as-is.

## Deploy (Cloudflare Pages)

Build command: empty. Build output directory: `dist`.
