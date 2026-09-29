<script setup lang="ts">
defineProps<{ label: string }>()
</script>
<template>
  <span class="technology-chip">{{ label }}</span>
</template>
