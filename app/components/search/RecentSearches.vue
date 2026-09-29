<script setup lang="ts">
import { suggestedSearches } from '../../../content/portfolio'
const { recentSearches, clear } = useRecentSearches()
const { search } = usePortfolioSearch()
const headingId = useId()
</script>

<template>
  <section class="recent-searches" :aria-labelledby="headingId">
    <div class="recent-heading">
      <h2 :id="headingId">
        <AppIcon name="history" :size="17" />
        Recent Searches
      </h2>
      <button class="text-button" :disabled="!recentSearches.length" @click="clear">
        Clear all
      </button>
    </div>
    <ul v-if="recentSearches.length" class="history-list" aria-label="Recent search queries">
      <li v-for="query in recentSearches" :key="query">
        <button :title="query" @click="search(query)">
          <AppIcon name="history" :size="15" />
          <span>{{ query }}</span>
        </button>
      </li>
    </ul>
    <div v-else class="history-empty">
      <span>Your next discovery starts with a search.</span>
      <div class="suggested-starters">
        <span>Try</span>
        <button
          v-for="item in suggestedSearches.slice(0, 3)"
          :key="item.query"
          @click="search(item.query)"
        >
          {{ item.query }}
          <AppIcon name="diagonal" :size="12" />
        </button>
      </div>
    </div>
  </section>
</template>
