<script setup lang="ts">
const props = defineProps<{ text: string; query: string }>()
const parts = computed(() => {
  const index = props.text.toLowerCase().indexOf(props.query.trim().toLowerCase())
  const length = props.query.trim().length
  return index < 0 || !length
    ? [props.text, '', '']
    : [
        props.text.slice(0, index),
        props.text.slice(index, index + length),
        props.text.slice(index + length),
      ]
})
</script>
<template>
  <span>
    {{ parts[0] }}
    <mark v-if="parts[1]">{{ parts[1] }}</mark>
    {{ parts[2] }}
  </span>
</template>
