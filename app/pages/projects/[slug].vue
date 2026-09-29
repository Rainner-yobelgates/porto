<script setup lang="ts">
import { projects } from '../../../content/portfolio'
const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
if (!project.value) throw createError({ statusCode: 404, statusMessage: 'Project not found' })
usePageSeo(
  () => project.value?.title || 'Project not found',
  () => project.value?.summary || 'Explore the portfolio project index.',
)
</script>
<template>
  <div class="page-content">
    <ProjectDetail v-if="project" :key="project.slug" :project="project" />
  </div>
</template>
