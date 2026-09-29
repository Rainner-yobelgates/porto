<script setup lang="ts">
import { profile, suggestedSearches } from '../../../content/portfolio'
defineProps<{ compact?: boolean }>()
const { query, search } = usePortfolioSearch()
const { recentSearches, clear } = useRecentSearches()
const route = useRoute()
const input = ref<HTMLInputElement | null>(null)
const root = ref<HTMLElement | null>(null)
const value = ref(query.value)
const opened = ref(false)
const selected = ref(-1)
const listId = useId()
const suggestions = computed(() => {
  const choices = [
    ...recentSearches.value,
    ...suggestedSearches.map((item) => item.query),
    ...searchIndex.map((item) => item.title),
  ]
  const normalized = normalizeQuery(value.value)
  return [...new Set(choices)]
    .filter((item) => !normalized || normalizeQuery(item).includes(normalized))
    .slice(0, 5)
})
watch(query, (current) => {
  value.value = current
})
watch(value, () => {
  selected.value = -1
})
useKeyboardSearchShortcut(() => {
  input.value?.focus()
  opened.value = true
})
async function submit(term = value.value) {
  opened.value = false
  selected.value = -1
  input.value?.blur()
  await search(term)
}
function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    opened.value = false
    selected.value = -1
    event.stopPropagation()
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    opened.value = true
    const count = suggestions.value.length
    if (count) {
      selected.value =
        selected.value < 0
          ? event.key === 'ArrowDown'
            ? 0
            : count - 1
          : (selected.value + (event.key === 'ArrowDown' ? 1 : -1) + count) % count
    }
  }
  if (event.key === 'Enter') {
    event.preventDefault()
    void submit(
      opened.value && selected.value >= 0 ? suggestions.value[selected.value] : value.value,
    )
  }
}
function focusout(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) opened.value = false
}
function clearInput() {
  value.value = ''
  input.value?.focus()
}
async function clearHistory() {
  clear()

  if (route.path === '/search') {
    await navigateTo('/', { replace: true })
  }
}
</script>
<template>
  <div
    ref="root"
    class="search-component"
    :class="{ compact, 'is-open': opened }"
    @focusout="focusout"
  >
    <form class="search-bar" role="search" @submit.prevent="submit()">
      <AppIcon name="search" :size="23" />
      <label class="sr-only" :for="`${listId}-input`">
        Search {{ profile.shortName }}’s portfolio
      </label>
      <input
        :id="`${listId}-input`"
        ref="input"
        v-model="value"
        type="text"
        role="combobox"
        autocomplete="off"
        maxlength="200"
        placeholder="Search my work, skills, projects, or experience..."
        :aria-expanded="opened"
        :aria-controls="`${listId}-suggestions`"
        :aria-activedescendant="
          opened && selected >= 0 ? `${listId}-option-${selected}` : undefined
        "
        aria-autocomplete="list"
        @focus="opened = true"
        @input="opened = true"
        @keydown="keydown"
      />
      <kbd v-if="!value" class="keyboard-hint">Ctrl K</kbd>
      <button
        v-if="value"
        type="button"
        class="clear-search icon-button"
        aria-label="Clear search"
        @click="clearInput"
      >
        <AppIcon name="close" :size="16" />
      </button>
      <button type="submit" class="search-submit" aria-label="Search portfolio">
        <AppIcon name="search" :size="21" />
      </button>
    </form>
    <Transition name="suggestions">
      <div v-if="opened" class="suggestion-panel">
        <div v-if="recentSearches.length" class="suggestion-heading">
          <span>Recent searches</span>
          <button type="button" class="text-button" @click="clearHistory">Clear all</button>
        </div>
        <ul :id="`${listId}-suggestions`" role="listbox" aria-label="Search suggestions">
          <li
            v-for="(suggestion, index) in suggestions"
            :id="`${listId}-option-${index}`"
            :key="suggestion"
            role="option"
            :aria-selected="selected === index"
            :class="{ selected: selected === index }"
            @pointermove="selected = index"
            @mousedown.prevent
            @click="submit(suggestion)"
          >
            <AppIcon
              :name="recentSearches.includes(suggestion) ? 'history' : 'search'"
              :size="16"
            />
            <SearchHighlight :text="suggestion" :query="value" />
            <AppIcon class="suggestion-arrow" name="diagonal" :size="14" />
          </li>
          <li v-if="!suggestions.length" class="suggestion-empty">
            Press Enter to search for “{{ value }}”
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
