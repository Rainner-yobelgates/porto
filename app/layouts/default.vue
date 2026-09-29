<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <CursorBackground />
    <a class="skip-link" href="#main-content">Skip to content</a>
    <AppHeader />
    <div class="main-shell">
      <main id="main-content" :class="{ 'home-main': isHome }">
        <section v-if="!isHome" class="inner-search" aria-label="Discover the portfolio">
          <SearchBar compact />
          <ShortcutNavigation />
          <RecentSearches />
        </section>
        <slot />
      </main>
      <footer class="app-footer">
        <span>Thoughtfully built. Always evolving.</span>
        <span>
          <span class="footer-dot" />
          Powered by curiosity
          <span class="footer-divider">/</span>
          Built with Nuxt
        </span>
      </footer>
    </div>
  </div>
</template>
