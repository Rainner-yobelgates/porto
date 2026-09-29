<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; description?: string }>()
</script>
<template>
  <header class="section-heading">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="description" class="section-description">{{ description }}</p>
  </header>
</template>
