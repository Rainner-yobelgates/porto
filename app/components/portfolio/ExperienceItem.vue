<script setup lang="ts">
import type { Experience } from '../../../types/portfolio'
import { projects } from '../../../content/portfolio'
defineProps<{ entry: Experience }>()
</script>
<template>
  <article :id="entry.id" class="experience-item">
    <span class="timeline-dot" :class="{ current: entry.current }" />
    <div class="experience-top">
      <span class="eyebrow">{{ entry.period }}</span>
      <span v-if="entry.current" class="current-badge">Current role</span>
    </div>
    <h2>{{ entry.role }}</h2>
    <p class="experience-company">{{ entry.company }}</p>
    <ul class="responsibility-list">
      <li v-for="item in entry.responsibilities" :key="item">{{ item }}</li>
    </ul>
    <div class="project-links">
      <NuxtLink v-for="slug in entry.projectSlugs" :key="slug" :to="`/projects/${slug}`">
        {{ projects.find((project) => project.slug === slug)?.title }}
        <AppIcon name="diagonal" :size="12" />
      </NuxtLink>
    </div>
  </article>
</template>
