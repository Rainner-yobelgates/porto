<script setup lang="ts">
import { profile } from '../../content/portfolio'
usePageSeo('Software Engineer & Web Developer', profile.summary)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        description: profile.summary,
      }),
    },
  ],
})
</script>
<template>
  <div class="home-content">
    <SearchHero />
    <RecentSearches />
  </div>
</template>
