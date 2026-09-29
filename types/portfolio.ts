export interface Profile {
  name: string
  shortName: string
  role: string
  headline: string
  summary: string
  location: string
  locationShort: string
  languages: string[]
  image: string | null
  resumeUrl: string | null
  availability: string | null
}
export interface Contact {
  email: string
  location: string
  phone: string
  whatsAppNumber: string
  instagramUrl: string
  instagramHandle: string
  githubUrl: string
  githubHandle: string
  linkedinUrl: string
  linkedinName: string
}
export interface Experience {
  id: string
  role: string
  company: string
  period: string
  current: boolean
  responsibilities: string[]
  projectSlugs: string[]
}
export interface Education {
  school: string
  field: string
  period: string
  highlights: string[]
}
export interface SkillGroup {
  id: string
  title: string
  icon: string
  skills: string[]
}
export interface Project {
  slug: string
  title: string
  shortLabel: string
  summary: string
  category: 'Professional' | 'Freelance' | 'Internship'
  company: string
  features: string[]
  responsibilities: string[]
  technologies: string[]
  keywords: string[]
  image: string | null
  gallery: string[]
  liveUrl: string | null
  repositoryUrl: string | null
  featured: boolean
  status: 'complete' | 'placeholder'
}
export type SearchCategory = 'About' | 'Projects' | 'Skills' | 'Experience'
export interface SearchEntry {
  id: string
  title: string
  description: string
  category: SearchCategory
  href: string
  tags: string[]
  keywords: string[]
  context: string
}
export interface SuggestedSearch {
  query: string
  label: string
}
