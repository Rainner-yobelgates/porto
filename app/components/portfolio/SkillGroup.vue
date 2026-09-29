<script setup lang="ts">
import type { SkillGroup } from '../../../types/portfolio'
defineProps<{ group: SkillGroup }>()
</script>
<template>
  <section :id="group.id" class="skill-group panel">
    <div class="skill-group-heading">
      <span class="section-icon"><AppIcon :name="group.icon" /></span>
      <h2>{{ group.title }}</h2>
    </div>
    <div class="skill-pills">
      <span v-for="skill in group.skills" :key="skill" class="skill-pill">
        <span class="skill-monogram" aria-hidden="true">
          {{ skill === 'AI-assisted Software Development & Debugging' ? 'AI' : skill.slice(0, 2) }}
        </span>
        {{ skill }}
      </span>
    </div>
  </section>
</template>
