<script setup lang="ts">
import { profile } from '../../../content/portfolio'
const route = useRoute()
const menuOpen = ref(false)
const header = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)
const displayName = profile.name.split(' ').slice(0, 2).join(' ')
let desktop: MediaQueryList | undefined
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
function closeMenu(event?: KeyboardEvent) {
  menuOpen.value = false
  if (event) menuButton.value?.focus()
}
function outsideClick(event: PointerEvent) {
  if (!header.value?.contains(event.target as Node)) closeMenu()
}
function focusout(event: FocusEvent) {
  if (!header.value?.contains(event.relatedTarget as Node | null)) closeMenu()
}
function closeMenuOnResize() {
  closeMenu()
}
onMounted(() => {
  document.addEventListener('pointerdown', outsideClick)
  desktop = matchMedia('(min-width: 701px)')
  desktop.addEventListener('change', closeMenuOnResize)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', outsideClick)
  desktop?.removeEventListener('change', closeMenuOnResize)
})
</script>

<template>
  <header ref="header" class="app-header" @keydown.esc="closeMenu($event)" @focusout="focusout">
    <NuxtLink to="/" class="brand" :aria-label="`${profile.shortName} portfolio home`">
      <img class="brand-mark" src="/asssets/logo.png" alt="" aria-hidden="true" />
      <span class="brand-copy">
        <strong>{{ displayName }}</strong>
        <span class="brand-divider" aria-hidden="true">/</span>
        <span>Developer Portfolio</span>
      </span>
    </NuxtLink>
    <button
      ref="menuButton"
      class="icon-button menu-toggle"
      :aria-expanded="menuOpen"
      aria-controls="header-navigation"
      :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
      @click="menuOpen = !menuOpen"
    >
      <AppIcon :name="menuOpen ? 'close' : 'menu'" />
    </button>
    <nav
      id="header-navigation"
      class="header-nav"
      :class="{ 'is-open': menuOpen }"
      aria-label="Main navigation"
    >
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/projects">Projects</NuxtLink>
      <a v-if="profile.resumeUrl" :href="profile.resumeUrl" download>
        Resume
        <AppIcon name="diagonal" :size="14" />
      </a>
      <span
        v-else
        class="unavailable-link"
        title="Resume file has not been supplied"
        aria-label="Resume not yet available"
      >
        Resume
        <span class="soon">Soon</span>
      </span>
      <NuxtLink to="/contact" class="talk-link">
        Let's Talk
        <AppIcon name="arrow" :size="17" />
      </NuxtLink>
    </nav>
  </header>
</template>
