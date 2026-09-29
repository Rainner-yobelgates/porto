<script setup lang="ts">
import type { Project } from '../../../types/portfolio'
defineProps<{ project: Project }>()
const tabs = ['Overview', 'Responsibilities', 'Features', 'Stack', 'Gallery']
const active = ref('Overview')
const tabId = useId()
function navigateTab(event: KeyboardEvent, index: number) {
  let target: number
  if (event.key === 'ArrowRight') target = (index + 1) % tabs.length
  else if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length
  else if (event.key === 'Home') target = 0
  else if (event.key === 'End') target = tabs.length - 1
  else return
  event.preventDefault()
  active.value = tabs[target] || 'Overview'
  document.getElementById(`${tabId}-${target}`)?.focus()
}
</script>
<template>
  <article class="project-detail">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink to="/projects">Projects</NuxtLink>
      <AppIcon name="chevron" :size="13" />
      <span>{{ project.title }}</span>
    </nav>
    <div class="detail-heading">
      <span class="eyebrow">{{ project.category }} project · {{ project.company }}</span>
      <h1>{{ project.title }}</h1>
      <p>{{ project.summary }}</p>
      <div v-if="project.technologies.length" class="tag-list">
        <TechnologyChip
          v-for="technology in project.technologies"
          :key="technology"
          :label="technology"
        />
      </div>
      <div v-if="project.liveUrl || project.repositoryUrl" class="detail-actions">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          class="primary-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit project
          <AppIcon name="diagonal" :size="16" />
        </a>
        <a
          v-if="project.repositoryUrl"
          :href="project.repositoryUrl"
          class="secondary-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source code
        </a>
      </div>
    </div>
    <div
      class="detail-banner"
      :class="`art-${project.slug}`"
      aria-label="Abstract project placeholder"
    >
      <span class="art-grid" />
      <span>
        {{ project.shortLabel }}
        <i>.</i>
      </span>
      <small>PROJECT INDEX / {{ project.category.toUpperCase() }}</small>
    </div>
    <div class="detail-tabs" role="tablist" aria-label="Project information">
      <button
        v-for="(tab, index) in tabs"
        :id="`${tabId}-${index}`"
        :key="tab"
        role="tab"
        :aria-selected="active === tab"
        :aria-controls="`${tabId}-panel`"
        :tabindex="active === tab ? 0 : -1"
        :class="{ active: active === tab }"
        @click="active = tab"
        @keydown="navigateTab($event, index)"
      >
        {{ tab }}
      </button>
    </div>
    <section
      :id="`${tabId}-panel`"
      class="detail-panel"
      role="tabpanel"
      :aria-labelledby="`${tabId}-${tabs.indexOf(active)}`"
      tabindex="0"
    >
      <template v-if="active === 'Overview'">
        <p class="eyebrow">The project</p>
        <h2>{{ project.title }}</h2>
        <p>{{ project.summary }}</p>
        <p class="detail-note">
          Project screenshots and further case study details will be added when available.
        </p>
      </template>
      <template v-else-if="active === 'Responsibilities'">
        <h2>My contribution</h2>
        <ul v-if="project.responsibilities.length" class="feature-list">
          <li v-for="item in project.responsibilities" :key="item">
            <AppIcon name="check" :size="17" />
            {{ item }}
          </li>
        </ul>
        <p v-else>Detailed responsibilities for this project have not been supplied yet.</p>
      </template>
      <template v-else-if="active === 'Features'">
        <h2>What it does</h2>
        <ul v-if="project.features.length" class="feature-list">
          <li v-for="item in project.features" :key="item">
            <AppIcon name="check" :size="17" />
            {{ item }}
          </li>
        </ul>
        <p v-else>A detailed feature list will be added when available.</p>
      </template>
      <template v-else-if="active === 'Stack'">
        <h2>Project technologies</h2>
        <div v-if="project.technologies.length" class="tag-list">
          <TechnologyChip v-for="item in project.technologies" :key="item" :label="item" />
        </div>
        <p v-else>The exact technology stack for this project is awaiting confirmation.</p>
      </template>
      <template v-else>
        <h2>A closer look</h2>
        <div v-if="project.gallery.length" class="gallery">
          <img
            v-for="(image, index) in project.gallery"
            :key="image"
            :src="image"
            :alt="`${project.title} screenshot ${index + 1}`"
            loading="lazy"
          />
        </div>
        <div v-else class="gallery-placeholder">
          <AppIcon name="image" :size="34" />
          <h3>Screenshots coming later.</h3>
          <p>Project images haven’t been supplied yet.</p>
        </div>
      </template>
    </section>
  </article>
</template>
