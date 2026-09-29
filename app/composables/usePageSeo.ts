import { profile } from '../../content/portfolio'
export function usePageSeo(title: string | (() => string), description: string | (() => string)) {
  const fullTitle = () => `${typeof title === 'function' ? title() : title} — ${profile.shortName}`
  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary',
  })
}
