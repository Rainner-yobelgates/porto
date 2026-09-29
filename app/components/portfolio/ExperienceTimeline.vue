<script setup lang="ts">
import { experience } from '../../../content/portfolio'
</script>
<template>
  <div class="experience-timeline">
    <ExperienceItem v-for="entry in experience" :key="entry.id" :entry="entry" />
  </div>
</template>
