<script setup lang="ts">
import { contact, profile } from '../../content/portfolio'
const phoneHref = `tel:+${contact.whatsAppNumber}`
const socialLinks = [
  {
    label: 'Instagram',
    value: contact.instagramHandle,
    href: contact.instagramUrl,
    icon: 'instagram',
  },
  { label: 'GitHub', value: contact.githubHandle, href: contact.githubUrl, icon: 'github' },
  { label: 'LinkedIn', value: contact.linkedinName, href: contact.linkedinUrl, icon: 'linkedin' },
]
usePageSeo(
  'Contact',
  `Get in touch with ${profile.shortName} about software engineering, web development, and useful digital solutions.`,
)
</script>
<template>
  <div class="page-content">
    <SectionHeader
      v-reveal
      eyebrow="05 / Good things start with a conversation"
      title="Let’s build something useful."
    />
    <div v-reveal="70" class="contact-grid">
      <div class="contact-copy">
        <p>Have a project in mind, a question about my work, or just want to say hello?</p>
        <p>I’d be glad to hear from you.</p>
        <div class="contact-details">
          <div class="contact-info">
            <span class="section-icon"><AppIcon name="mail" /></span>
            <div>
              <span>Email me</span>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </div>
          </div>
          <div class="contact-info">
            <span class="section-icon"><AppIcon name="phone" /></span>
            <div>
              <span>Phone</span>
              <a :href="phoneHref">{{ contact.phone }}</a>
            </div>
          </div>
          <div v-for="social in socialLinks" :key="social.label" class="contact-info">
            <span class="section-icon"><AppIcon :name="social.icon" /></span>
            <div>
              <span>{{ social.label }}</span>
              <a :href="social.href" target="_blank" rel="noopener noreferrer">{{ social.value }}</a>
            </div>
          </div>
          <div class="contact-info">
            <span class="section-icon"><AppIcon name="pin" /></span>
            <div>
              <span>Based in</span>
              <p>{{ contact.location }}</p>
            </div>
          </div>
        </div>
        <div class="contact-signature">
          Let’s connect
          <span>.</span>
        </div>
      </div>
      <ContactForm />
    </div>
  </div>
</template>
