const storageKey = 'rainner:recent-searches:v1'
export function useRecentSearches() {
  const recentSearches = useState<string[]>('recent-searches', () => [])
  const loaded = useState('recent-searches-loaded', () => false)
  onMounted(() => {
    if (loaded.value) return
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]')
      if (Array.isArray(parsed))
        recentSearches.value = parsed
          .filter((item): item is string => typeof item === 'string')
          .reverse()
          .reduce((history, query) => addRecentQuery(history, query), [] as string[])
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
    loaded.value = true
  })
  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(recentSearches.value))
    } catch {
      /* In-memory history remains usable. */
    }
  }
  function remember(query: string) {
    recentSearches.value = addRecentQuery(recentSearches.value, query)
    persist()
  }
  function clear() {
    recentSearches.value = []
    persist()
  }
  return { recentSearches, remember, clear }
}
