<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>
<template>
  <NuxtLayout>
    <div class="page-content empty-state">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1>
        {{
          error.statusCode === 404
            ? 'This page isn’t in the index.'
            : 'Something interrupted the search.'
        }}
      </h1>
      <p>There’s still plenty to discover.</p>
      <button class="primary-button" @click="clearError({ redirect: '/' })">
        Back to the search
        <AppIcon name="arrow" :size="18" />
      </button>
    </div>
  </NuxtLayout>
</template>
