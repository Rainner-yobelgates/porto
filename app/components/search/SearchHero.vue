<script setup lang="ts">
import { profile } from '../../../content/portfolio'

const wordmark = profile.shortName.toUpperCase()
const text = ref<HTMLElement | null>(null)
const baseline = ref<HTMLElement | null>(null)
const { phase, characters, cursorX, cursorTop, cursorHeight } = useHeroTyping(text, wordmark, baseline)
</script>
<template>
  <section class="search-hero">
    <div class="hero-eyebrow">
      {{ profile.headline }}
    </div>
    <h1
      class="hero-wordmark"
      :class="`typing-${phase}`"
      :aria-label="wordmark"
    >
      <span ref="text" class="hero-typed hero-wordmark-base" aria-hidden="true">{{ wordmark }}<span ref="baseline" class="hero-baseline" /></span>
      <!-- Each layer preserves the full word's kerning and continuous gradient. -->
      <span
        v-for="(character, index) in characters"
        :key="index"
        class="hero-typed hero-character-layer"
        aria-hidden="true"
        :style="{ clipPath: character.clipPath, '--character-delay': `${character.delay}ms` }"
      >{{ wordmark }}</span>
      <span
        class="hero-caret"
        aria-hidden="true"
        :style="{
          transform: `translateX(${cursorX}px)`,
          '--caret-top': `${cursorTop}px`,
          '--caret-height': `${cursorHeight}px`,
        }"
      ><span class="hero-caret-light" /></span>
    </h1>
    <SearchBar />
    <ShortcutNavigation />
  </section>
</template>
