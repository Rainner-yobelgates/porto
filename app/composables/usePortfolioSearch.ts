import type { SearchCategory } from '../../types/portfolio'
export function usePortfolioSearch() {
  const route = useRoute()
  const { remember } = useRecentSearches()
  const query = computed(() =>
    typeof route.query.q === 'string' ? route.query.q.slice(0, 200) : '',
  )
  const categories: (SearchCategory | 'All')[] = [
    'All',
    'Projects',
    'Skills',
    'Experience',
    'About',
  ]
  const category = computed(() => categories.find((item) => item === route.query.category) || 'All')
  const results = computed(() => searchPortfolio(query.value, category.value))
  async function search(value: string) {
    const trimmed = value.trim().slice(0, 200)
    if (!trimmed) return
    remember(trimmed)
    await navigateTo({ path: '/search', query: { q: trimmed } })
  }
  return { query, categories, category, results, search }
}
