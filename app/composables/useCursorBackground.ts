import type { Ref } from 'vue'
export function useCursorBackground(element: Ref<HTMLElement | null>) {
  let cleanup = () => {}
  onMounted(() => {
    const media = matchMedia(
      '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)',
    )
    let frame = 0
    let targetX = 0.5
    let targetY = 0.5
    let currentX = 0.5
    let currentY = 0.5
    function tick() {
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      const style = element.value?.style
      style?.setProperty('--pointer-x', `${currentX * 100}%`)
      style?.setProperty('--pointer-y', `${currentY * 100}%`)
      style?.setProperty('--mesh-x', `${(currentX - 0.5) * 16}px`)
      style?.setProperty('--mesh-y', `${(currentY - 0.5) * 16}px`)
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.0001)
        frame = requestAnimationFrame(tick)
      else frame = 0
    }
    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType === 'touch') return
      targetX = event.clientX / innerWidth
      targetY = event.clientY / innerHeight
      element.value?.style.setProperty('--glow-opacity', '1')
      if (!frame) frame = requestAnimationFrame(tick)
    }
    function leave() {
      element.value?.style.setProperty('--glow-opacity', '0')
      cancelAnimationFrame(frame)
      frame = 0
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    media.addEventListener('change', leave)
    cleanup = () => {
      leave()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
      media.removeEventListener('change', leave)
    }
  })
  onBeforeUnmount(() => cleanup())
}
