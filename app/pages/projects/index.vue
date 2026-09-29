<script setup lang="ts">
import { profile, projects } from '../../../content/portfolio'
usePageSeo(
  'Projects',
  `Explore ${profile.shortName}’s professional projects, freelance websites, and systems.`,
)
const category = ref('All')
const filters = ['All', 'Professional', 'Freelance', 'Internship']
const filtered = computed(() =>
  projects.filter((project) => category.value === 'All' || project.category === category.value),
)
</script>
<template>
  <div class="page-content">
    <SectionHeader
      eyebrow="02 / Ideas into applications"
      title="An index of my work."
      description="Systems, platforms, and websites built around real-world needs."
    />
    <div class="filter-toolbar">
      <div class="filter-chips" aria-label="Filter projects">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="{ active: category === filter }"
          :aria-pressed="category === filter"
          @click="category = filter"
        >
          {{ filter }}
        </button>
      </div>
      <span class="result-count" aria-live="polite">{{ filtered.length }} projects</span>
    </div>
    <div class="project-list">
      <ProjectResult
        v-for="(project, index) in filtered"
        :key="project.slug"
        :project="project"
        :index="index"
      />
    </div>
  </div>
</template>
