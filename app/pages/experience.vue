<script setup lang="ts">
import { profile } from '../../content/portfolio'
usePageSeo(
  'Experience',
  `${profile.shortName}’s professional journey in software engineering, web development, and freelance client work.`,
)
</script>
<template>
  <div class="page-content">
    <SectionHeader
      eyebrow="04 / Learning through building"
      title="The journey so far."
      description="From web development to systems, integrations, and the people who use them."
    />
    <ExperienceTimeline />
  </div>
</template>
