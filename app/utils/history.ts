import { normalizeQuery } from './search.ts'
export function addRecentQuery(history: string[], query: string): string[] {
  const value = query.trim().slice(0, 200)
  if (!normalizeQuery(value)) return history
  return [value, ...history.filter((item) => normalizeQuery(item) !== normalizeQuery(value))].slice(
    0,
    8,
  )
}
