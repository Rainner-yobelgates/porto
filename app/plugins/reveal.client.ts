import type { DirectiveBinding } from 'vue'

function reveal(element: HTMLElement, binding: DirectiveBinding<number | undefined>) {
  const delay = Number(binding.value || 0)
  element.style.setProperty('--reveal-delay', `${delay}ms`)
  element.classList.add('will-reveal')

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.classList.add('is-revealed')
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      element.classList.add('is-revealed')
      observer.unobserve(element)
    },
    { threshold: 0.1, rootMargin: '0px 0px -28px' },
  )

  observer.observe(element)
  ;(element as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    beforeMount: reveal,
    unmounted(element: HTMLElement) {
      ;(element as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver?.disconnect()
    },
  })
})
