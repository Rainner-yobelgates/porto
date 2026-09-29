<script setup lang="ts">
import { navigation } from '../../../content/portfolio'
</script>
<template>
  <nav class="shortcut-nav" aria-label="Portfolio sections">
    <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to">
      <AppIcon :name="item.icon" :size="16" />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
