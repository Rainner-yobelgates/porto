# DESIGN.md — Search Engine Portfolio

## 1. Product Vision

Portfolio ini menggunakan metafora **personal search engine**. Pengunjung tidak hanya scroll halaman portfolio biasa, tetapi dapat mencari pengalaman, project, skill, dan informasi tentang pemilik portfolio melalui search bar utama.

Arah visual utama:
- Premium
- Elegant
- Dark
- Black + Purple
- Minimal futuristic
- Search-engine inspired, bukan clone Google
- Interactive tetapi tidak berlebihan

Konsep visual harus terasa seperti produk digital profesional untuk Web / Software Engineer, bukan dashboard enterprise dan bukan landing page template generik.

---

## 2. Visual Identity

### Main Colors

```css
--bg: #07070b;
--bg-soft: #0d0b14;
--surface: rgba(17, 13, 28, 0.78);
--surface-strong: #12101b;
--border: rgba(167, 87, 255, 0.24);
--border-active: rgba(168, 85, 247, 0.72);
--purple: #9b4dff;
--purple-bright: #b45cff;
--purple-soft: #6f2bd9;
--text: #f7f5fb;
--text-secondary: #a9a3b4;
--text-muted: #716b7d;
--success: #33e38e;
```

### Background

Background tidak menggunakan star field, planet, nebula, atau efek space yang terlalu kuat.

Gunakan:
- matte black base
- blurred purple mesh gradient
- very subtle grain/noise
- soft radial glow
- faint vignette
- layered dark-purple waves

Background harus tetap menjadi pendukung UI, bukan focal point.

---

## 3. Cursor Reactive Background

Background bereaksi terhadap cursor secara halus.

### Behavior

Saat cursor bergerak:
- satu soft radial purple glow mengikuti cursor
- glow bergerak dengan smoothing / interpolation, tidak menempel secara kaku
- beberapa mesh layer bergerak dengan parallax sangat kecil
- cursor tidak menimbulkan particle explosion
- tidak ada trail panjang
- tidak ada liquid effect berlebihan

### Recommended motion

```text
cursor position
      ↓
smoothed position (lerp)
      ↓
radial glow position
      ↓
subtle mesh transform ± 6–12 px
```

Target feel:
> cursor movement should be noticed subconsciously, not become the main attraction.

### Motion constraints

- transition smooth
- animation duration visual: 400–900ms
- no aggressive scale
- respect `prefers-reduced-motion`
- mobile: disable cursor-reactive effect

---

## 4. Typography

Gunakan modern grotesk / geometric sans-serif.

Recommended:
- Inter
- Manrope
- Geist
- Plus Jakarta Sans

Hierarchy:
- Hero name: 72–110px desktop
- Page title: 32–44px
- Section title: 22–30px
- Body: 15–18px
- Meta / helper: 12–14px

Hero wordmark:

```text
RAINNER|
```

Style:
- left part white
- end section subtle purple gradient
- blinking caret can be used very subtly

---

## 5. Global Desktop Layout

```text
┌────────────────────────────────────────────────────────────┐
│ Logo / Name                            About Projects Resume│
│                                                            │
│ ┌────────────── Sidebar ─────────────┐   Main Content       │
│ │ Recent Searches                   │                      │
│ │                                   │    RAINNER           │
│ │ Explore                           │    description        │
│ │ Projects                          │    [ search bar ]      │
│ │ Skills                            │    [buttons]           │
│ │ Experience                        │                      │
│ │ Contact                           │    dynamic content     │
│ └───────────────────────────────────┘                      │
└────────────────────────────────────────────────────────────┘
```

Desktop sidebar remains visible.

Tablet:
- sidebar becomes collapsible

Mobile:
- sidebar becomes drawer
- recent searches available from history icon

---

## 6. Header

Left:
- custom `F` logo mark
- name: `Rainner Yobelgates Franceisten Nainggolan`
- small divider
- `Developer Portfolio`

Right:
- About
- Projects
- Resume
- Let's Talk

Top nav must stay visually quiet. Primary interaction remains the search engine.

---

## 7. Sidebar

### Recent Searches

Show latest visitor searches.

Example:
- NestJS projects
- About Rainner
- Warehouse Management System
- ACS attendance integration
- Laravel experience
- Contact Rainner

Functions:
- clickable search history
- clear all
- persisted in localStorage

### Explore

- About
- Projects
- Skills
- Experience
- Contact

Active page receives soft purple highlight.

### Availability Card

Use placeholder until final status is confirmed.

```text
Available for opportunities
Let's build something useful together.
```

---

## 8. Hero / Search

### Hero

```text
DEVELOPER × PROBLEM SOLVER × LIFELONG LEARNER

RAINNER
Search my work, skills, or projects
and discover what I build.
```

### Search Input

Search bar is the primary component.

Placeholder:

```text
Search my work, skills, projects, or experience...
```

Interactions:
- click → focused state
- typing → suggestion dropdown
- Enter → search result view
- `Ctrl/Cmd + K` → focus search
- Escape → close dropdown

### Suggested Queries

Examples based on CV:
- software engineer experience
- ACS project
- warehouse management system
- Ecovia
- freelance projects
- Stylease
- NestJS
- Laravel
- AI-assisted development

---

## 9. Main Shortcut Buttons

Directly below search:

- About
- Projects
- Skills
- Experience
- Contact

Each button:
- pill shape
- icon + label
- inactive = dark surface
- active = purple border + subtle glow

Avoid excessive glow.

---

## 10. Search Focus State

When search is active:

```text
[ search: "nest" ]

┌──────────────────────────────┐
│ NestJS projects             │
│ NestJS experience           │
│ Backend experience          │
│ WMS                         │
│ Web development             │
└──────────────────────────────┘
```

Suggestion panel:
- max 6 results
- keyboard navigable
- query highlight
- rounded dark panel
- subtle glass effect

---

## 11. Search Result Page

Search results should resemble a modern search engine, not a card gallery.

Example:

```text
Search: warehouse

All | Projects | Skills | Experience

4 results

Warehouse Management System
Software Engineer · PT Kolink Network Solution
Product, stock, movement, and storage-location management...

Laravel  MySQL  Warehouse
```

Result structure:
- optional thumbnail
- category
- title
- short description
- tags
- open arrow

---

## 12. About Page

Content sourced from CV.

Primary copy:

> Web developer / software engineer with strong interest in application development and technology. Structured problem solver, fast learner, and focused on building digital solutions useful for users and business needs.

Main profile areas:
- short bio
- role focus
- current role
- location
- selected highlights
- CTA to Resume / Contact

### Profile Image

Current status: **placeholder**.

Until a real profile image is provided, use:
- abstract developer avatar
- monogram
- dark silhouette illustration

Do not invent a real portrait.

### About Stats

Use factual / non-inflated values only.

Possible cards:
- `2021` — Started professional web development journey
- `3+` — Major projects handled at current company
- `Full-stack` — Web application experience

Do not show made-up project totals.

---

## 13. Projects Page

Initial project dataset from CV:

### ACS
Type: Professional Project
Context: PT Kolink Network Solution
Summary:
- attendance system
- ZKTeco / UBio integration
- implementation
- troubleshooting
- client technical support
- Thailand assignment for Group / Thai Oil needs

### Warehouse Management System
Type: Professional Project
Summary:
- product management
- stock management
- goods movement
- warehouse storage location management

### Ecovia
Type: Professional Project
Summary:
- location-based platform
- destination discovery
- place information
- reviews and ratings
- community content

### Freelance E-Commerce Website
Status: content placeholder until project details/screenshots are supplied.

### Optical Store Web System
Status: content placeholder until project details/screenshots are supplied.

### Travel / Bus Reservation System
Status: content placeholder until project details/screenshots are supplied.

### Stylease
Type: Professional Project
Context: PT Satu Visi Digital
Summary:
- branded fashion rental platform
- subscription flow
- borrowing flow
- inventory / stock management

### Library Data Website
Context: Galeri SBY-ANI Library, Pacitan
Summary:
- book data management website
- technical support
- troubleshooting during data entry

### Tourism Profile Website
Context: PKL at PT Industri Telekomunikasi Indonesia
Summary:
- tourism profile website

---

## 14. Project Detail Page

Structure:

```text
breadcrumb

PROJECT TITLE
short summary
technology tags

Overview | Responsibilities | Features | Gallery

Overview
What the project is and why it exists.

Responsibilities
What Rainner handled.

Key Features
Feature list.

Gallery
Screenshots placeholder until assets are supplied.
```

Optional buttons:
- Visit Project
- View Source Code

Only show a button when URL exists.

---

## 15. Skills Page

Important rule:

> **Never show skill percentage, rating, stars, or proficiency bars.**

The page only shows technologies grouped by category.

### Programming Languages
- HTML
- CSS
- JavaScript
- TypeScript
- PHP
- Python

### Frameworks & Libraries
- Laravel
- NestJS
- Vue.js
- React.js
- Next.js

### UI & Development Tools
- Tailwind CSS
- Bootstrap
- Sass
- Figma

### Database & Version Control
- MySQL
- MongoDB
- PostgreSQL
- Git

### AI
- AI-assisted Software Development & Debugging
- Prompt Engineering

For the portfolio implementation itself, these are profile contents only. The application stack remains Nuxt-only.

---

## 16. Experience Page

Timeline:

### Software Engineer — PT Kolink Network Solution
`Apr 2025 – Present`

Highlight:
- ACS
- Warehouse Management System
- Ecovia
- client support
- overseas Thailand assignment

### Web Developer — Freelance
`Oct 2023 – Apr 2025`

Highlight:
- end-to-end client website development
- Figma
- development
- database
- team coordination
- e-commerce
- optical store system
- travel / bus reservation system

### Web Developer — PT Satu Visi Digital
`Jun 2022 – Oct 2023`

Highlight:
- Stylease
- Library data website
- troubleshooting / technical support

### Web Developer Intern — PT Industri Telekomunikasi Indonesia
`Jan 2021 – Mar 2021`

Highlight:
- tourism profile website

---

## 17. Education

### SMK Prestasi Prima
Software Engineering
`2019 – 2022`

Highlights:
- KKSI
- Markoding
- LSP certificate
- personal and freelance projects

---

## 18. Contact Page

Known:
- Location: Pasar Rebo, East Jakarta, Indonesia
- Email: ryfranceisten@gmail.com

CV also contains a phone number, but displaying it publicly on the portfolio should be an explicit choice.

Missing / placeholder:
- LinkedIn URL
- GitHub URL
- public project links
- resume downloadable asset route

Contact form fields:
- Name
- Email
- Subject
- Message

Submit handling should use a Nuxt server route.

---

## 19. Responsive Behavior

### Desktop
- fixed/collapsible sidebar
- large search hero
- multi-column content

### Tablet
- reduced hero size
- sidebar collapsible
- project cards remain horizontal when possible

### Mobile
- drawer navigation
- search bar full width
- button row horizontally scrollable or wrapped
- cards become single column
- disable heavy cursor effects

---

## 20. Accessibility

Required:
- semantic HTML
- keyboard navigation
- visible focus state
- proper `aria-label`
- sufficient contrast
- reduced motion mode
- no information conveyed only by color

---

## 21. Design Guardrails

Do:
- keep UI spacious
- keep search as primary experience
- use purple carefully
- use motion to enhance interaction
- use real CV data

Do not:
- clone Google pixel-for-pixel
- add large stars or planets
- use excessive neon
- use skill percentage
- invent companies, project metrics, links, or accomplishments
- overload every surface with glass blur
