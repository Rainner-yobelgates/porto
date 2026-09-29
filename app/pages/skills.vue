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
      v-reveal
      eyebrow="03 / The developer’s toolkit"
      title="Tools for the task."
      description="The languages, frameworks, and tools I work with to bring ideas to life."
    />
    <div class="skills-grid">
      <SkillGroup
        v-for="(group, index) in skillGroups"
        :key="group.id"
        v-reveal="index * 70"
        :group="group"
      />
    </div>
    <div v-reveal="90" class="page-note">
      <AppIcon name="code" :size="18" />
    </div>
  </div>
</template>
