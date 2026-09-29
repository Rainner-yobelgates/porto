import type { Ref } from 'vue'

interface TypingCharacter {
  clipPath: string
  delay: number
  end: number
}

export function useHeroTyping(
  text: Ref<HTMLElement | null>,
  word: string,
  baseline: Ref<HTMLElement | null>,
) {
  const hasPlayed = useState('hero-wordmark-typed', () => false)
  const phase = ref<'waiting' | 'typing' | 'holding' | 'settled'>(
    hasPlayed.value ? 'settled' : 'waiting',
  )
  const characters = ref<TypingCharacter[]>([])
  const cursorX = ref(0)
  const cursorTop = ref(0)
  const cursorHeight = ref(0)
  const delays = [0, 140, 255, 410, 522, 655, 775]
  const timers: ReturnType<typeof setTimeout>[] = []
  let media: MediaQueryList | undefined
  let observer: ResizeObserver | undefined
  let disposed = false
  let visibleCharacters = 0
  let context: CanvasRenderingContext2D | null = null

  function schedule(callback: () => void, delay: number) {
    timers.push(setTimeout(callback, delay))
  }

  function settle() {
    timers.forEach(clearTimeout)
    phase.value = 'settled'
    characters.value = []
    visibleCharacters = word.length
    measure()
  }

  function measure() {
    const element = text.value
    const node = element?.firstChild
    if (!element || !node) return

    const bounds = element.getBoundingClientRect()
    if (context && baseline.value) {
      const style = getComputedStyle(element)
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const metrics = context.measureText(word)
      const ascent = metrics.actualBoundingBoxAscent
      const descent = metrics.actualBoundingBoxDescent
      cursorTop.value = baseline.value.getBoundingClientRect().top - bounds.top - ascent
      cursorHeight.value = ascent + descent
    }

    const range = document.createRange()
    let start = 0
    const measuredCharacters = [...word].map((_, index) => {
      range.setStart(node, 0)
      range.setEnd(node, index + 1)
      const end = range.getBoundingClientRect().right - bounds.left
      const character = {
        clipPath: `inset(-8px ${index === word.length - 1 ? '-8px' : `${Math.max(0, bounds.width - end)}px`} -8px ${start}px)`,
        delay: 160 + (delays[index] ?? index * 130),
        end,
      }
      start = end
      return character
    })

    if (phase.value !== 'settled') characters.value = measuredCharacters
    if (visibleCharacters) cursorX.value = measuredCharacters[visibleCharacters - 1]!.end + 5
  }

  function motionChanged() {
    if (media?.matches) settle()
  }

  onMounted(async () => {
    media = matchMedia('(prefers-reduced-motion: reduce)')
    media.addEventListener('change', motionChanged)
    const shouldAnimate = !hasPlayed.value && !media.matches
    hasPlayed.value = true
    if (!shouldAnimate) settle()
    await document.fonts.ready
    if (disposed) return

    context = document.createElement('canvas').getContext('2d')
    measure()
    observer = new ResizeObserver(measure)
    observer.observe(text.value!)
    if (!shouldAnimate || media.matches || phase.value === 'settled') {
      settle()
      return
    }
    phase.value = 'typing'

    characters.value.forEach((character, index) => {
      schedule(() => {
        visibleCharacters = index + 1
        cursorX.value = characters.value[index]!.end + 5
      }, character.delay)
    })

    const duration = (characters.value.at(-1)?.delay ?? 935) + 260
    schedule(() => { phase.value = 'holding' }, duration)
    schedule(settle, duration + 500)
  })

  onBeforeUnmount(() => {
    disposed = true
    settle()
    observer?.disconnect()
    media?.removeEventListener('change', motionChanged)
  })

  return { phase, characters, cursorX, cursorTop, cursorHeight }
}
