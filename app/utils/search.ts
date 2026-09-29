import { experience, profile, projects, skillGroups } from '../../content/portfolio.ts'
import type { SearchCategory, SearchEntry } from '../../types/portfolio'

export const normalizeQuery = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
export const searchIndex: SearchEntry[] = [
  {
    id: 'about',
    title: `About ${profile.shortName}`,
    description: profile.summary,
    category: 'About',
    href: '/about',
    tags: [profile.role, 'Web Developer'],
    keywords: [profile.name, profile.location, ...profile.languages],
    context: profile.location,
  },
  ...projects.map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.summary,
    category: 'Projects' as const,
    href: `/projects/${p.slug}`,
    tags: p.keywords.slice(0, 3),
    keywords: [...p.keywords, ...p.technologies, ...p.features, ...p.responsibilities, p.category],
    context: p.company,
  })),
  ...skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      id: `skill-${normalizeQuery(skill)}`,
      title: skill,
      description: `${skill} is part of ${profile.shortName}’s ${group.title.toLowerCase()} toolkit.`,
      category: 'Skills' as const,
      href: `/skills#${group.id}`,
      tags: [group.title],
      keywords: [
        group.title,
        'technology',
        'development',
        ...(group.id === 'ai' ? ['AI', 'debugging', 'assisted'] : []),
      ],
      context: group.title,
    })),
  ),
  ...experience.map((e) => ({
    id: e.id,
    title: `${e.role} · ${e.company}`,
    description: e.responsibilities.join(' '),
    category: 'Experience' as const,
    href: `/experience#${e.id}`,
    tags: [e.period],
    keywords: [
      e.company,
      ...e.projectSlugs.flatMap((slug) => {
        const project = projects.find((p) => p.slug === slug)
        return project ? [project.title, ...project.keywords] : []
      }),
    ],
    context: e.period,
  })),
]
export function searchPortfolio(
  query: string,
  category: SearchCategory | 'All' = 'All',
): SearchEntry[] {
  const normalized = normalizeQuery(query).slice(0, 200)
  const tokens = normalized.split(' ').filter(Boolean)
  const intentWords = new Set([
    'my',
    normalizeQuery(profile.shortName),
    'work',
    'project',
    'projects',
    'skill',
    'skills',
    'experience',
    'about',
  ])
  const terms = tokens.filter((token) => !intentWords.has(token))
  const effectiveTerms = terms.length
    ? terms
    : tokens.filter((token) => !['my', 'work'].includes(token))
  return searchIndex
    .filter((entry) => category === 'All' || entry.category === category)
    .map((entry) => {
      const title = normalizeQuery(entry.title)
      const keywords = normalizeQuery(entry.keywords.join(' '))
      const all = normalizeQuery(
        [
          entry.title,
          entry.description,
          entry.context,
          entry.category,
          ...entry.tags,
          ...entry.keywords,
        ].join(' '),
      )
      if (effectiveTerms.some((token) => !all.includes(token))) return { entry, score: -1 }
      const score =
        (normalized && title === normalized ? 100 : 0) +
        (normalized && title.includes(normalized) ? 30 : 0) +
        effectiveTerms.reduce(
          (sum, token) => sum + (title.includes(token) ? 10 : keywords.includes(token) ? 5 : 1),
          0,
        )
      return { entry, score }
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry)
}
