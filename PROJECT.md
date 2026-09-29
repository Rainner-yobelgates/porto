# PROJECT.md — Rainner Portfolio Search

## Project Name

Working title:

**Rainner Portfolio Search**

Alternative UI brand:

**RAINNER**

The final public domain/name is still TBD.

---

## 1. Overview

A modern personal portfolio built entirely with **Nuxt**, designed around the concept of a personal search engine.

Visitors can search the portfolio as if they were searching a knowledge index of the developer's work, experience, skills, and projects.

The application uses a black + purple premium design with subtle cursor-reactive background motion.

---

## 2. Owner Profile

Name:
- Rainner Yobelgates Franceisten Nainggolan

Current location from CV:
- Pasar Rebo, East Jakarta, Indonesia

Current headline:
- Software Engineer
- Web Developer

Profile summary:
- Web developer with strong interest in application development and technology
- Structured problem-solving mindset
- Fast learner
- Focused on building digital solutions that support users and business needs

---

## 3. Primary Goals

1. Present professional experience clearly.
2. Make projects easy to discover through search.
3. Present technical skills without fake proficiency scoring.
4. Create a memorable portfolio experience without sacrificing usability.
5. Keep the technical implementation simple and maintainable.
6. Build the entire application in one Nuxt codebase.

---

## 4. Technology Stack

Mandatory application stack:

```text
Nuxt
TypeScript
Vue Composition API through Nuxt
Nuxt/Nitro Server Routes
CSS / optional Sass or Tailwind within Nuxt
```

No separate backend.

No Laravel backend.
No NestJS backend.
No Express backend.
No Next.js.
No React application.

Nuxt is responsible for:
- routing
- rendering
- UI
- state
- search
- server API
- contact form handling
- SEO

---

## 5. Source Profile Data

Initial profile content comes from the supplied CV.

### Work Experience

#### Software Engineer — PT Kolink Network Solution
April 2025 – Present

Projects:
- ACS
- Warehouse Management System
- Ecovia

Notable responsibility:
- attendance system
- ZKTeco / UBio device integration
- implementation
- troubleshooting
- client support
- Thailand assignment for technical support and direct coordination with Group / Thai Oil

#### Web Developer — Freelance
October 2023 – April 2025

Work:
- end-to-end client website development
- interface design in Figma
- web development
- database handling
- team coordination
- e-commerce website
- optical store sales system
- travel / bus reservation system

#### Web Developer — PT Satu Visi Digital
June 2022 – October 2023

Projects:
- Stylease
- book-data website for Galeri SBY-ANI Library in Pacitan

#### Web Developer Intern — PT Industri Telekomunikasi Indonesia
January 2021 – March 2021

Project:
- tourism profile website

---

## 6. Education

SMK Prestasi Prima

Software Engineering
2019 – 2022

Highlights:
- KKSI
- Markoding
- LSP certificate
- personal projects
- freelance projects

---

## 7. Skill Dataset

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

### Languages
- Indonesian
- English

Note:
- `Bluzen` appears in the CV text but its meaning/category is unclear. Keep it excluded from the public portfolio until clarified.

---

## 8. Core Pages

### `/`
Home / Search Engine

Features:
- hero
- search
- recent searches
- suggested queries
- selected results

### `/about`
Profile overview

### `/projects`
All portfolio projects

### `/projects/[slug]`
Project case study

### `/skills`
Grouped skills

### `/experience`
Professional timeline

### `/contact`
Contact information + form

### `/search?q=`
Search results

---

## 9. Search Categories

Search indexes:
- About
- Projects
- Skills
- Experience

Example queries:

```text
ACS
WMS
warehouse
Ecovia
ZKTeco
Thailand
freelance
Stylease
NestJS
Laravel
AI debugging
```

---

## 10. Initial Project Entries

### ACS
Slug:
`acs`

Category:
Professional

Company:
PT Kolink Network Solution

Summary:
Attendance system and device integration work involving ZKTeco / UBio.

Missing assets:
- screenshots
- public URL
- source URL
- detailed technology stack

### Warehouse Management System
Slug:
`warehouse-management-system`

Category:
Professional

Company:
PT Kolink Network Solution

Summary:
Warehouse system supporting product, stock, goods movement, and storage location management.

Missing assets:
- screenshots
- public URL
- source URL
- detailed technology stack

### Ecovia
Slug:
`ecovia`

Category:
Professional

Company:
PT Kolink Network Solution

Summary:
Location-based platform for discovering destinations, place information, reviews, ratings, and community content.

Missing assets:
- screenshots
- public URL
- source URL
- detailed technology stack

### Stylease
Slug:
`stylease`

Category:
Professional

Company:
PT Satu Visi Digital

Summary:
Branded clothing rental platform with subscription, borrowing, and inventory flows.

Missing assets:
- screenshots
- public URL
- source URL
- detailed technology stack

### Freelance E-Commerce
Slug:
`freelance-ecommerce`

Status:
Placeholder until details are supplied.

### Optical Store System
Slug:
`optical-store-system`

Status:
Placeholder until details are supplied.

### Travel / Bus Reservation System
Slug:
`travel-bus-reservation`

Status:
Placeholder until details are supplied.

### Galeri SBY-ANI Library Website
Slug:
`galeri-sby-ani-library`

Status:
Needs screenshots and detailed scope.

### Tourism Profile Website
Slug:
`tourism-profile-website`

Status:
Needs screenshots and detailed scope.

---

## 11. Missing Information / TODO Content

The following should remain placeholder until the user supplies it:

- profile photo
- GitHub URL
- LinkedIn URL
- portfolio domain
- project screenshots
- project public URLs
- source code URLs
- exact stack for each project
- certificates image/files
- downloadable resume public filename
- preferred public phone visibility
- availability status
- final hero short headline

---

## 12. UI Requirements

Primary palette:
- black
- deep purple
- violet accent
- white typography

Main interaction:
- search bar

Background:
- dark mesh gradient
- cursor-reactive soft glow
- subtle parallax
- no excessive particle effects

Skill page:
- no percentages
- no proficiency bars
- no rating system

---

## 13. Search History

Recent search history is local to each visitor.

Implementation:
- localStorage
- maximum 8 recent entries
- clicking a history entry runs that query
- clear history action

No account/login required.

---

## 14. Contact

Known email:
- ryfranceisten@gmail.com

Known location:
- Pasar Rebo, East Jakarta, Indonesia

Phone exists in the CV but should not be shown publicly unless explicitly approved.

Contact form is processed by Nuxt server API.

---

## 15. SEO

Each page requires:
- title
- meta description
- Open Graph data

Examples:

```text
Rainner — Software Engineer & Web Developer
Projects — Rainner Portfolio
Experience — Rainner Portfolio
```

---

## 16. Performance Goals

- fast initial load
- no heavyweight 3D runtime
- no WebGL requirement for background
- cursor animation via CSS gradients + requestAnimationFrame
- optimized project images
- lazy-loaded non-critical assets

---

## 17. Milestones

### Phase 1 — Foundation
- Nuxt project setup
- tokens / global styles
- layout
- header
- sidebar
- portfolio data model

### Phase 2 — Search Experience
- search input
- suggestions
- results
- recent search storage
- keyboard shortcuts

### Phase 3 — Main Pages
- About
- Projects
- Project Detail
- Skills
- Experience
- Contact

### Phase 4 — Interaction
- cursor-reactive background
- page transitions
- hover states
- reduced-motion support

### Phase 5 — Content Completion
- replace project placeholders
- add real screenshots
- add URLs
- add profile image if supplied
- finalize resume download

### Phase 6 — QA
- responsive testing
- accessibility
- performance
- SEO
- browser testing

---

## 18. Success Criteria

The project is ready when:
- the full app runs as one Nuxt application
- search works across portfolio data
- page navigation is responsive
- content is based on real CV/user data
- placeholders are clearly isolated
- the visual design matches `design.md`
- the background cursor animation is subtle
- no skill percentages exist
- contact handling stays inside Nuxt/Nitro
