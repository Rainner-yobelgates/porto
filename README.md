# Rainner Portfolio Search

A personal search engine for Rainner’s projects, skills, profile, and experience. One Nuxt 4 application with Vue Composition API, TypeScript, local search, and a Nitro contact endpoint.

The September 25 visual revision uses a centered layout on every route, with no sidebar or navigation rail. A large home search becomes compact on inner pages. Autocomplete expands above the shortcut pills; recent searches sit beneath them in one horizontally scrollable row. The latest supplied reference controls the layout, superseding the earlier sidebar descriptions in the original specifications. Profile facts remain sourced from `PROJECT.md`.

## Run locally

Requires Node.js 22.12+ (Node.js 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Search with the main field or Ctrl/Cmd + K.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run preview
```

Browser tests use locally installed Chrome via Playwright and an isolated production server on port 4173. If Chrome is unavailable, install a Playwright browser and adjust `channel` in `playwright.config.ts`. ESLint checks JavaScript and essential Vue rules, while the Nuxt type checker also checks unused TypeScript bindings.

## Content and missing assets

All personal information lives in `content/portfolio.ts`, with interfaces in `types/portfolio.ts`. Content is grounded in `PROJECT.md` and `DESIGN.md`; the supplied CV is available through the Resume action. Update the central model when screenshots, exact project stacks, URLs, profile photo, or availability are supplied. These currently remain null, empty, or explicitly marked `placeholder`. Unknown links are hidden, and abstract project artwork is not presented as a screenshot. Phone visibility remains unapproved and the number is not stored.

Routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/skills`, `/experience`, `/contact`, `/search?q=...`. Search supports partial multi-field matching, ranking, category query parameters, and eight deduplicated recent queries in localStorage. Clearing history stays cleared across reloads. Search runs locally without an external service. Fonts and their licenses are served locally.

## Contact behavior

The Contact form uses browser validation, then redirects visitors to WhatsApp with their name, email, subject, and message prefilled. It does not submit, store, or log visitor messages on the portfolio server. Email and the supplied social profile links remain available as direct contact options.

## Deployment

Build with `npm run build`, then run `node .output/server/index.mjs`. Nitro honors `PORT` and `HOST`. Canonical URLs are intentionally omitted until the deployment domain is known. TypeScript is pinned to 5.9.3 because the current Vue checker does not support TypeScript 7.

The background uses a smoothed requestAnimationFrame loop that stops when settled or the pointer leaves. Cursor reaction is disabled on small screens, touch pointers, and reduced-motion preferences. Navigation, suggestions, and project tabs support keyboard use. Skills have no numeric ratings or progress indicators.
