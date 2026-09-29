<script setup lang="ts">
import { profile, suggestedSearches } from '../../content/portfolio'
const { query, category, categories, results, search } = usePortfolioSearch()
usePageSeo(
  () => (query.value ? `Search: ${query.value}` : 'Search the portfolio'),
  () =>
    `Search ${profile.shortName}’s projects, skills, experience, and profile${query.value ? ` for ${query.value}` : ''}.`,
)
</script>
<template>
  <div class="page-content search-page">
    <SectionHeader
      eyebrow="Your curiosity, connected"
      :title="query ? `Results for “${query}”` : 'Explore the index.'"
    />
    <nav class="result-tabs" aria-label="Filter search results">
      <NuxtLink
        v-for="item in categories"
        :key="item"
        :to="{
          path: '/search',
          query: { q: query || undefined, category: item === 'All' ? undefined : item },
        }"
        :class="{ active: category === item }"
        :aria-current="category === item ? 'page' : undefined"
      >
        {{ item }}
      </NuxtLink>
    </nav>
    <p class="result-count search-count" role="status">
      {{ results.length }} {{ results.length === 1 ? 'result' : 'results' }} in
      {{ category === 'All' ? 'the portfolio index' : category.toLowerCase() }}
    </p>
    <div v-if="results.length" class="search-results">
      <SearchResultItem v-for="entry in results" :key="entry.id" :entry="entry" />
    </div>
    <div v-else class="empty-state">
      <span class="empty-state-icon"><AppIcon name="search" :size="30" /></span>
      <h2>No matches just yet.</h2>
      <p>Try a shorter query, another category, or one of these starting points.</p>
      <div class="filter-chips">
        <button
          v-for="item in suggestedSearches.slice(0, 4)"
          :key="item.query"
          @click="search(item.query)"
        >
          {{ item.label }}
          <AppIcon name="diagonal" :size="13" />
        </button>
      </div>
      <NuxtLink to="/projects" class="subtle-link">
        Browse all projects
        <AppIcon name="arrow" :size="16" />
      </NuxtLink>
    </div>
  </div>
</template>
