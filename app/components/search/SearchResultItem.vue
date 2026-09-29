<script setup lang="ts">
import type { SearchEntry } from '../../../types/portfolio'
defineProps<{ entry: SearchEntry }>()
const icons: Record<string, string> = {
  About: 'user',
  Projects: 'folder',
  Skills: 'code',
  Experience: 'briefcase',
}
</script>
<template>
  <article class="search-result">
    <span class="result-category-icon"><AppIcon :name="icons[entry.category] || 'search'" /></span>
    <div class="result-body">
      <div class="result-meta">
        <span>{{ entry.category }}</span>
        <span class="meta-dot">·</span>
        <span>{{ entry.context }}</span>
      </div>
      <h2>
        <NuxtLink :to="entry.href">
          {{ entry.title }}
          <AppIcon name="diagonal" :size="17" />
        </NuxtLink>
      </h2>
      <p>{{ entry.description }}</p>
      <div class="tag-list">
        <TechnologyChip v-for="tag in entry.tags" :key="tag" :label="tag" />
      </div>
    </div>
  </article>
</template>
