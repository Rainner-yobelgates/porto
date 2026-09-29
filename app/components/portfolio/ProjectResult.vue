<script setup lang="ts">
import type { Project } from '../../../types/portfolio'
defineProps<{ project: Project; index?: number }>()
</script>
<template>
  <article class="project-result">
    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="project-art"
      :class="`art-${project.slug}`"
      :aria-label="`Explore ${project.title}`"
    >
      <img
        v-if="project.image"
        :src="project.image"
        :alt="`${project.title} screenshot`"
        loading="lazy"
      />
      <template v-else>
        <span class="art-grid" />
        <span class="art-symbol">{{ project.shortLabel }}</span>
        <span class="art-caption">PROJECT / {{ String((index || 0) + 1).padStart(2, '0') }}</span>
      </template>
    </NuxtLink>
    <div class="project-result-body">
      <div class="result-meta">
        <span>{{ project.category }}</span>
        <span class="meta-dot">·</span>
        <span>{{ project.company }}</span>
      </div>
      <h3>
        <NuxtLink :to="`/projects/${project.slug}`">{{ project.title }}</NuxtLink>
      </h3>
      <p>{{ project.summary }}</p>
      <div class="tag-list">
        <TechnologyChip v-for="tag in project.keywords.slice(0, 3)" :key="tag" :label="tag" />
      </div>
    </div>
    <div class="project-trailing">
      <span v-if="project.featured" class="featured-label">
        <span />
        Featured project
      </span>
      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="project-open icon-button"
        :aria-label="`View ${project.title}`"
      >
        <AppIcon name="chevron" :size="20" />
      </NuxtLink>
    </div>
  </article>
</template>
