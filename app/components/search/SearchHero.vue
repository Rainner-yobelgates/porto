<script setup lang="ts">
import { profile } from '../../../content/portfolio'

const wordmark = profile.shortName.toUpperCase()
const typedWordmark = ref('')
const hasTyped = useState('hero-wordmark-typed', () => false)
const isTyping = ref(false)
const isComplete = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (hasTyped.value || reducedMotion) {
    typedWordmark.value = wordmark
    isComplete.value = true
    return
  }

  hasTyped.value = true
  isTyping.value = true
  let index = 0

  const typeNextCharacter = () => {
    index += 1
    typedWordmark.value = wordmark.slice(0, index)

    if (index < wordmark.length) {
      timer = setTimeout(typeNextCharacter, 135)
      return
    }

    isTyping.value = false
    timer = setTimeout(() => {
      isComplete.value = true
    }, 1000)
  }

  timer = setTimeout(typeNextCharacter, 480)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <section class="search-hero">
    <div class="hero-eyebrow">
      {{ profile.headline }}
    </div>
    <h1
      class="hero-wordmark"
      :class="{ 'is-typing': isTyping, 'is-complete': isComplete }"
      :aria-label="wordmark"
    >
      <span class="hero-typed" aria-hidden="true">{{ typedWordmark }}</span>
      <span class="hero-caret" aria-hidden="true" />
    </h1>
    <SearchBar />
    <ShortcutNavigation />
  </section>
</template>
