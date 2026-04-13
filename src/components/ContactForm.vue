<template>
  <section id="contact" class="contact" aria-labelledby="contact-heading">
    <div class="contact__container">
      <div class="contact__header">
        <p class="contact__eyebrow">Let's talk</p>
        <h2 id="contact-heading" class="contact__heading">Get in Touch</h2>
        <p class="contact__subheading">
          Have a project in mind or just want to connect? Drop me a message.
        </p>
      </div>

      <!-- Success state -->
      <div
        v-if="submitted"
        class="contact__success"
        role="alert"
        aria-live="polite"
      >
        <svg class="contact__success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p class="contact__success-title">Message sent!</p>
        <p class="contact__success-body">Thanks for reaching out. I'll get back to you soon.</p>
        <button class="btn btn--ghost" type="button" @click="reset">Send another</button>
      </div>

      <!-- Form -->
      <form
        v-else
        class="contact__form"
        novalidate
        @submit.prevent="handleSubmit"
        aria-label="Contact form"
      >
        <!-- Honeypot — hidden from real users, bots fill this -->
        <input
          v-model="honeypot"
          type="text"
          name="_gotcha"
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
          class="contact__honeypot"
        />

        <!-- Name -->
        <div class="form-group" :class="{ 'form-group--error': errors.name }">
          <label for="cf-name" class="form-label">Name</label>
          <input
            id="cf-name"
            v-model.trim="fields.name"
            type="text"
            name="name"
            class="form-input"
            autocomplete="name"
            placeholder="Sean Jones"
            :aria-invalid="errors.name ? 'true' : 'false'"
            aria-describedby="cf-name-error"
            @blur="validateField('name')"
          />
          <p
            v-if="errors.name"
            id="cf-name-error"
            class="form-error"
            role="alert"
          >{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div class="form-group" :class="{ 'form-group--error': errors.email }">
          <label for="cf-email" class="form-label">Email</label>
          <input
            id="cf-email"
            v-model.trim="fields.email"
            type="email"
            name="email"
            class="form-input"
            autocomplete="email"
            placeholder="you@example.com"
            :aria-invalid="errors.email ? 'true' : 'false'"
            aria-describedby="cf-email-error"
            @blur="validateField('email')"
          />
          <p
            v-if="errors.email"
            id="cf-email-error"
            class="form-error"
            role="alert"
          >{{ errors.email }}</p>
        </div>

        <!-- Message -->
        <div class="form-group" :class="{ 'form-group--error': errors.message }">
          <label for="cf-message" class="form-label">Message</label>
          <textarea
            id="cf-message"
            v-model.trim="fields.message"
            name="message"
            rows="5"
            class="form-input form-input--textarea"
            placeholder="Tell me about your project or just say hi."
            :aria-invalid="errors.message ? 'true' : 'false'"
            aria-describedby="cf-message-error"
            @blur="validateField('message')"
          ></textarea>
          <p
            v-if="errors.message"
            id="cf-message-error"
            class="form-error"
            role="alert"
          >{{ errors.message }}</p>
        </div>

        <!-- Submit error -->
        <p
          v-if="submitError"
          class="form-error form-error--submit"
          role="alert"
          aria-live="assertive"
        >{{ submitError }}</p>

        <button
          type="submit"
          class="btn btn--primary contact__submit"
          :disabled="loading"
          :aria-busy="loading"
        >
          <span v-if="loading" class="contact__spinner" aria-hidden="true"></span>
          {{ loading ? 'Sending…' : 'Send Message' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// ─── Spam prevention: record mount time for time gate ──────────────────────
const mountedAt = ref(0)
onMounted(() => {
  mountedAt.value = Date.now()
})

// ─── Form state ────────────────────────────────────────────────────────────
const honeypot = ref('')
const loading = ref(false)
const submitted = ref(false)
const submitError = ref('')

const fields = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })

// ─── Validation ────────────────────────────────────────────────────────────
// RFC 5322-simplified email regex — catches the common invalid formats
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(field: keyof typeof fields): boolean {
  switch (field) {
    case 'name':
      errors.name = fields.name ? '' : 'Name is required.'
      return !errors.name
    case 'email':
      if (!fields.email) {
        errors.email = 'Email is required.'
      } else if (!EMAIL_RE.test(fields.email)) {
        errors.email = 'Please enter a valid email address.'
      } else {
        errors.email = ''
      }
      return !errors.email
    case 'message':
      errors.message = fields.message ? '' : 'Message is required.'
      return !errors.message
  }
}

function validateAll(): boolean {
  const results = (Object.keys(fields) as Array<keyof typeof fields>).map(validateField)
  return results.every(Boolean)
}

// ─── Submission ────────────────────────────────────────────────────────────

async function handleSubmit() {
  submitError.value = ''

  // Always validate first — give real users immediate feedback
  if (!validateAll()) return

  // Spam gates — silently reject bots after validation passes
  if (honeypot.value) return
  if (Date.now() - mountedAt.value < 2000) return

  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
  if (!FORMSPREE_ENDPOINT) {
    submitError.value = 'Contact form is not configured. Please email me directly.'
    return
  }

  loading.value = true
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
    })

    if (response.ok) {
      submitted.value = true
    } else {
      submitError.value = 'Something went wrong. Please try again or email me directly.'
    }
  } catch {
    submitError.value = 'Unable to send message. Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}

function reset() {
  submitted.value = false
  submitError.value = ''
  fields.name = ''
  fields.email = ''
  fields.message = ''
  errors.name = ''
  errors.email = ''
  errors.message = ''
  honeypot.value = ''
  mountedAt.value = Date.now()
}
</script>

<style lang="scss" scoped>
.contact {
  padding: 5rem 1.5rem;
  background: var(--color-bg-secondary);
  transition: background var(--transition-theme);

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }

  &__container {
    max-width: 560px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.025em;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
  }

  &__subheading {
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  &__honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
  }

  &__submit {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  // ─── Success state ────────────────────────────────────────────────────────

  &__success {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    transition:
      background var(--transition-theme),
      border-color var(--transition-theme);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  &__success-icon {
    width: 48px;
    height: 48px;
    color: var(--color-accent);
    margin-bottom: 0.25rem;
  }

  &__success-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &__success-body {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
  }

  // ─── Loading spinner ──────────────────────────────────────────────────────

  &__spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid color-mix(in srgb, currentColor 35%, transparent);
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// ─── Form field primitives ────────────────────────────────────────────────────

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  &--error .form-input {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 15%, transparent);
  }
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  transition: color var(--transition-theme);
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: var(--color-bg-card);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  transition:
    background var(--transition-theme),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    color var(--transition-theme);
  outline: none;

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.6;
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
  }

  &--textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }
}

.form-error {
  font-size: 0.8125rem;
  color: var(--color-error);
  line-height: 1.4;

  &--submit {
    padding: 0.625rem 0.875rem;
    background: color-mix(in srgb, var(--color-error) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent);
    border-radius: 8px;
  }
}
</style>
