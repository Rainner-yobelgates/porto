<script setup lang="ts">
import { profile, skillGroups } from '../../content/portfolio'
usePageSeo(
  'Skills & technologies',
  `Explore the programming languages, frameworks, databases, and development tools in ${profile.shortName}’s toolkit.`,
)
</script>
<template>
  <div class="page-content">
    <SectionHeader
      eyebrow="03 / The developer’s toolkit"
      title="Tools for the task."
      description="The languages, frameworks, and tools I work with to bring ideas to life."
    />
    <div class="skills-grid">
      <SkillGroup v-for="group in skillGroups" :key="group.id" :group="group" />
    </div>
    <div class="page-note">
      <AppIcon name="code" :size="18" />
      <p>This portfolio is built with Nuxt, Vue, and TypeScript.</p>
    </div>
  </div>
</template>
