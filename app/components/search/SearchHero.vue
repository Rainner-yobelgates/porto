<script setup lang="ts">
import { profile } from '../../../content/portfolio'
</script>
<template>
  <section class="search-hero">
    <div class="hero-eyebrow">
      {{ profile.headline }}
    </div>
    <h1 class="hero-wordmark">
      {{ profile.shortName.toUpperCase() }}
      <span class="hero-caret" aria-hidden="true" />
    </h1>
    <p class="hero-description">
      Search my work, skills, or projects
      <br />
      <span>and discover what I build.</span>
    </p>
    <SearchBar />
    <ShortcutNavigation />
  </section>
</template>
