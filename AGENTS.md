# AGENTS.md — Nuxt Portfolio Engineering Rules

## Purpose

This file defines implementation rules for any coding agent working on this portfolio.

The portfolio must remain faithful to `design.md` and `PROJECT.md`.

---

## 1. Mandatory Technology Rule

This project is **Nuxt-only**.

Use:
- Nuxt
- Vue Composition API through Nuxt
- TypeScript
- Nuxt server routes / Nitro when server-side logic is required
- Nuxt composables
- Nuxt plugins
- Nuxt middleware
- Nuxt layouts
- Nuxt pages

Do **not** introduce:
- Laravel
- NestJS
- Express
- Next.js
- React application code
- separate backend repository
- separate API server
- microservice architecture

Profile content may mention technologies from the CV, but the portfolio application itself must be implemented in Nuxt.

---

## 2. Version Strategy

Use the latest stable Nuxt version available when implementation begins.

Do not upgrade major versions automatically after the project has started without checking compatibility.

---

## 3. Application Architecture

Preferred structure:

```text
app/
  assets/
  components/
    common/
    layout/
    search/
    portfolio/
  composables/
  layouts/
  pages/
  plugins/
  utils/

content/
  portfolio.ts

server/
  api/
    contact.post.ts

public/
  images/
  projects/

types/
  portfolio.ts

nuxt.config.ts
```

The exact folder structure may follow the active Nuxt version, but responsibilities must remain separated.

---

## 4. Data Source Rule

All portfolio content must come from a central typed data source.

Recommended:

```text
content/portfolio.ts
```

Do not hardcode the same personal data separately across multiple components.

Create typed entities for:
- profile
- experience
- education
- skill groups
- projects
- contact
- suggested searches

---

## 5. Missing Content Rule

If content is not available from the CV or user-provided assets:

Use an explicit placeholder.

Examples:

```ts
status: 'placeholder'
image: null
repositoryUrl: null
liveUrl: null
```

Never invent:
- LinkedIn URLs
- GitHub URLs
- employers
- achievements
- project statistics
- screenshots
- education
- certifications

---

## 6. Search Engine Behavior

Search is a first-class feature.

Search must cover:
- projects
- skills
- experience
- about/profile

Search implementation should initially be local and client-side.

Do not add Algolia, Elasticsearch, Meilisearch, or external search infrastructure unless explicitly requested.

Search should support:
- normalization to lowercase
- multi-field matching
- simple ranking
- category filters
- recent search history
- suggested searches

Recent searches:
- store in localStorage
- maximum recommended: 8
- de-duplicate normalized queries

---

## 7. URL Strategy

Recommended routes:

```text
/
/about
/projects
/projects/[slug]
/skills
/experience
/contact
/search?q=nestjs
```

Search state should be shareable by URL query.

---

## 8. Motion Rules

Use motion carefully.

Allowed:
- subtle cursor-follow glow
- tiny parallax background offsets
- fade/slide transitions
- search dropdown animation
- active pill transitions

Forbidden:
- large particle bursts
- noisy mouse trails
- constant aggressive animation
- excessive 3D transforms
- animations that interfere with reading

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable cursor-reactive motion on touch devices.

---

## 9. Cursor Background Implementation

Implementation goal:

- capture pointer coordinates
- convert to normalized viewport position
- smooth through requestAnimationFrame
- expose CSS variables

Example variables:

```css
--pointer-x: 50%;
--pointer-y: 50%;
--mesh-x: 0px;
--mesh-y: 0px;
```

Use CSS radial gradients driven by these variables.

Prefer GPU-friendly transforms and CSS variables.

Avoid continuously mutating expensive DOM layout properties.

---

## 10. Styling

Use one consistent approach.

Preferred:
- component-scoped CSS
- global design tokens in a single stylesheet
- optional Sass only if already configured

Do not mix multiple styling systems unnecessarily.

If Tailwind is used, it is allowed only as styling inside Nuxt; Nuxt remains the sole application framework.

---

## 11. Components

Expected components:

```text
AppHeader
PortfolioSidebar
SearchHero
SearchInput
SearchSuggestions
SearchResultList
SearchResultItem
SectionTabs
CursorGlow
ProjectList
ProjectListItem
ProjectDetail
SkillGroup
ExperienceTimeline
ExperienceItem
ContactForm
AvailabilityBadge
```

Components should be reusable and data-driven.

---

## 12. Skills Rule

Never implement:
- skill percentages
- progress bars
- star ratings
- numeric proficiency rankings

Only show:
- skill logo/icon
- skill name
- grouping/category

This is a hard design rule.

---

## 13. Images

Until real assets are provided:
- use neutral placeholders
- use local generated abstract assets if available
- do not use random photos of people as the portfolio owner

For project screenshots:
- show placeholders clearly marked internally as placeholder data
- replace when real screenshots are supplied

Optimize images with Nuxt image capabilities when available.

---

## 14. Contact Form

Contact form must remain inside the Nuxt application.

Use:

```text
POST /api/contact
```

implemented as Nuxt/Nitro server route.

The route should:
- validate required fields
- sanitize input
- apply simple anti-spam controls
- return typed JSON

Email delivery provider is TBD.

Until provider credentials exist:
- use a safe mock/server response in development
- do not commit secrets

---

## 15. Security

Never commit:
- API keys
- email passwords
- SMTP credentials
- private tokens

Use runtime config.

Validate all server input.

Do not expose private runtime config to client.

---

## 16. Performance

Targets:
- minimal initial JS
- avoid unnecessary packages
- lazy-load project detail images
- no huge animation libraries unless explicitly approved
- background cursor animation must remain lightweight

Prefer native CSS transitions and Vue/Nuxt primitives.

---

## 17. Accessibility

Every agent must preserve:
- keyboard navigation
- semantic headings
- labels for interactive controls
- focus styles
- reduced motion support
- sufficient contrast

Search suggestions must be keyboard navigable.

---

## 18. SEO

Use Nuxt SEO capabilities:
- dynamic page title
- meta description
- Open Graph tags
- canonical URL when deployment URL is known
- structured metadata for person/profile where appropriate

Do not invent social handles.

---

## 19. Code Quality

Requirements:
- TypeScript
- clear naming
- avoid `any` unless unavoidable
- reusable composables
- no large monolithic page components
- keep UI and portfolio data separate
- remove dead code
- comments only where logic is non-obvious

---

## 20. Definition of Done

A change is complete when:
- it matches `design.md`
- it does not violate Nuxt-only architecture
- it is responsive
- it is keyboard accessible
- it does not invent user data
- search still works
- cursor animation remains subtle
- skill percentages are absent
