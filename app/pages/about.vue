<script setup lang="ts">
import { profile, education, experience } from '../../content/portfolio'
usePageSeo('About', profile.summary)
</script>
<template>
  <div class="page-content">
    <SectionHeader
      v-reveal
      eyebrow="01 / The person behind the work"
      :title="`Hello, I’m ${profile.shortName}.`"
      description="Curiosity drives the work. People give it purpose."
    />
    <div v-reveal="70" class="about-grid">
      <div class="profile-monogram" aria-label="Profile image placeholder">
        <span class="monogram-orbit" />
        <span>
          {{ profile.shortName[0] }}
          <b>.</b>
        </span>
        <div>
          {{ profile.role }}
          <small>{{ profile.location }}</small>
        </div>
      </div>
      <div class="about-copy">
        <h2>
          Turning problems into
          <br />
          useful digital solutions.
        </h2>
        <p>{{ profile.summary }}</p>
        <div class="profile-facts">
          <div>
            <span>Currently</span>
            <strong>{{ experience[0]?.role }}</strong>
            <span>{{ experience[0]?.company }}</span>
          </div>
          <div>
            <span>Based in</span>
            <strong>{{ profile.location }}</strong>
          </div>
          <div>
            <span>Languages</span>
            <strong>{{ profile.languages.join(' · ') }}</strong>
          </div>
        </div>
        <NuxtLink to="/contact" class="primary-button">
          Get in touch
          <AppIcon name="arrow" :size="17" />
        </NuxtLink>
      </div>
    </div>
    <section v-reveal="120" class="education-card panel">
      <span class="section-icon"><AppIcon name="book" /></span>
      <div>
        <p class="eyebrow">Education · {{ education.period }}</p>
        <h2>{{ education.school }}</h2>
        <p>{{ education.field }}</p>
        <div class="tag-list">
          <TechnologyChip
            v-for="highlight in education.highlights"
            :key="highlight"
            :label="highlight"
          />
        </div>
      </div>
    </section>
  </div>
</template>
