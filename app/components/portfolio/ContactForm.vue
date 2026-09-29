<script setup lang="ts">
import { contact } from '../../../content/portfolio'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
const form = reactive({ name: '', message: '' })
function submit() {
  window.location.assign(buildWhatsAppUrl(contact.whatsAppNumber, form))
}
</script>
<template>
  <form class="contact-form panel" @submit.prevent="submit">
    <div class="form-heading">
      <h2>Start a conversation</h2>
      <span class="form-mode">WhatsApp</span>
    </div>
    <p class="form-notice">Your message will open in WhatsApp, ready to send.</p>
    <div class="form-field">
      <label for="contact-name">Your name</label>
      <input
        id="contact-name"
        v-model="form.name"
        name="name"
        autocomplete="name"
        placeholder="Alex Morgan"
        required
        minlength="2"
        maxlength="100"
      />
    </div>
    <div class="form-field">
      <label for="contact-message">Your message</label>
      <textarea
        id="contact-message"
        v-model="form.message"
        name="message"
        placeholder="Tell me a little about your idea…"
        required
        minlength="10"
        maxlength="5000"
        rows="4"
      />
    </div>
    <button class="primary-button" type="submit">
      Continue in WhatsApp
      <AppIcon name="arrow" :size="17" />
    </button>
    <p class="form-footnote">
      Prefer email instead?
      <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
    </p>
  </form>
</template>
