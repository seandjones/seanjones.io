<template>
  <section id="contact" class="section contact" aria-labelledby="contact-heading">
    <div class="section__inner">
      <div class="terminus" aria-hidden="true"><span class="terminus__line"></span><span class="terminus__bar"></span></div>
      <header class="section__head contact__head">
        <h2 id="contact-heading" class="t-display">Get in touch</h2>
      </header>

      <div class="contact__grid">
        <div class="contact__direct">
          <p class="contact__line">{{ copy.line }}</p>
          <p class="contact__facts">
            <span>{{ profile.location }}</span>
            <span>{{ profile.replyTime }}</span>
          </p>
          <p>
            <a class="contact__email" :href="`mailto:${profile.email}`">
              <span class="visually-hidden">Email </span>{{ profile.email }}
            </a>
          </p>
          <p>
            <a class="contact__linkedin" :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="Sean Jones on LinkedIn (opens in a new tab)">LinkedIn</a>
          </p>
        </div>

        <div class="contact__formwrap">
          <div v-if="submitted" class="contact__success" role="status">
            <h3 ref="successHeading" class="t-title" tabindex="-1">Message sent</h3>
            <p>Thanks, {{ sentName }}. I'll reply to {{ sentEmail }}.</p>
            <button class="btn btn--outline" type="button" @click="reset">Send another message</button>
          </div>

          <form v-else class="contact__form" novalidate aria-labelledby="contact-form-intro" @submit.prevent="handleSubmit">
            <p id="contact-form-intro" class="contact__intro">{{ copy.formIntro }}</p>

            <!-- Honeypot: hidden from real users, bots fill this -->
            <input
              v-model="honeypot"
              type="text"
              name="_gotcha"
              autocomplete="off"
              tabindex="-1"
              aria-hidden="true"
              class="contact__honeypot"
            />

            <div class="field" :class="{ 'field--error': errors.name }">
              <label for="cf-name" class="field__label">Name</label>
              <input
                id="cf-name"
                v-model.trim="fields.name"
                type="text"
                name="name"
                class="field__input"
                autocomplete="name"
                maxlength="100"
                required
                :aria-invalid="errors.name ? 'true' : 'false'"
                :aria-describedby="errors.name ? 'cf-name-error' : undefined"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" id="cf-name-error" class="field__error">{{ errors.name }}</p>
            </div>

            <div class="field" :class="{ 'field--error': errors.email }">
              <label for="cf-email" class="field__label">Email</label>
              <input
                id="cf-email"
                v-model.trim="fields.email"
                type="email"
                name="email"
                class="field__input"
                autocomplete="email"
                placeholder="you@company.com"
                maxlength="254"
                required
                :aria-invalid="errors.email ? 'true' : 'false'"
                :aria-describedby="errors.email ? 'cf-email-error' : undefined"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" id="cf-email-error" class="field__error">{{ errors.email }}</p>
            </div>

            <div class="field" :class="{ 'field--error': errors.message }">
              <label for="cf-message" class="field__label">Message</label>
              <textarea
                id="cf-message"
                v-model.trim="fields.message"
                name="message"
                rows="5"
                class="field__input field__input--textarea"
                placeholder="What are you working on?"
                maxlength="5000"
                required
                :aria-invalid="errors.message ? 'true' : 'false'"
                :aria-describedby="errors.message ? 'cf-message-hint cf-message-error' : 'cf-message-hint'"
                @blur="validateField('message')"
              ></textarea>
              <p id="cf-message-hint" class="field__hint">Up to 5,000 characters.</p>
              <p v-if="errors.message" id="cf-message-error" class="field__error">{{ errors.message }}</p>
            </div>

            <p v-if="submitError" class="contact__submit-error" role="alert">{{ submitError }}</p>

            <button type="submit" class="btn btn--solid contact__submit" :disabled="loading" :aria-busy="loading">
              {{ loading ? 'Sending…' : 'Send message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { profile } from '../content/site'

const copy = {
  line: 'Open to conversations about Staff, Principal and engineering-lead roles.',
  formIntro: 'Or send a message here. All fields are required.',
}

const messages = {
  nameEmpty: 'Enter your name.',
  emailEmpty: 'Enter your email address.',
  emailInvalid: "That email address doesn't look right. Check for a typo.",
  messageEmpty: 'Write a short message.',
  network: `Your message didn't send. Check your connection and try again, or email ${profile.email}.`,
  server: `Your message didn't send. Try again, or email ${profile.email}.`,
  unconfigured: `The form isn't working right now. Email ${profile.email} instead.`,
}

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
const sentName = ref('')
const sentEmail = ref('')
const successHeading = ref<HTMLElement | null>(null)

// A request that hangs is treated as a network failure after this long.
const REQUEST_TIMEOUT_MS = 15000
let inflight: AbortController | null = null

onUnmounted(() => {
  inflight?.abort()
})

const fields = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(field: keyof typeof fields): boolean {
  switch (field) {
    case 'name':
      errors.name = fields.name ? '' : messages.nameEmpty
      return !errors.name
    case 'email':
      if (!fields.email) errors.email = messages.emailEmpty
      else if (!EMAIL_RE.test(fields.email)) errors.email = messages.emailInvalid
      else errors.email = ''
      return !errors.email
    case 'message':
      errors.message = fields.message ? '' : messages.messageEmpty
      return !errors.message
  }
}

function validateAll(): boolean {
  const results = (Object.keys(fields) as Array<keyof typeof fields>).map(validateField)
  return results.every(Boolean)
}

async function focusFirstError() {
  await nextTick()
  const first = (['name', 'email', 'message'] as const).find((f) => errors[f])
  if (first) document.getElementById(`cf-${first}`)?.focus()
}

async function handleSubmit() {
  submitError.value = ''

  if (!validateAll()) {
    await focusFirstError()
    return
  }

  // Spam gates: silently reject bots after validation passes
  if (honeypot.value) return
  if (Date.now() - mountedAt.value < 2000) return

  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
  if (!FORMSPREE_ENDPOINT) {
    submitError.value = messages.unconfigured
    return
  }

  loading.value = true
  inflight = new AbortController()
  const timeout = window.setTimeout(() => inflight?.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
      signal: inflight.signal,
    })

    if (response.ok) {
      sentName.value = fields.name
      sentEmail.value = fields.email
      submitted.value = true
      await nextTick()
      successHeading.value?.focus()
    } else {
      submitError.value = messages.server
    }
  } catch {
    submitError.value = messages.network
  } finally {
    window.clearTimeout(timeout)
    inflight = null
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
  padding-top: clamp(3rem, 6vw, 5rem);
}

// The page's lines end here.
.terminus {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.terminus__line {
  flex: 1;
  height: 10px;
  background: var(--ink);
}

.terminus__bar {
  width: 10px;
  height: 44px;
  background: var(--ink);
}

.contact__head {
  border-bottom: none;
  padding-bottom: 0;
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2rem, 5vw, 4.5rem);

  @media (max-width: 859px) {
    grid-template-columns: 1fr;
  }
}

.contact__direct {
  display: grid;
  gap: 0.75rem;
  align-content: start;
}

.contact__line {
  font-weight: 700;
  max-width: 40ch;
}

.contact__facts {
  display: grid;
  gap: 0.2rem;
  font-weight: 600;
}

.contact__email {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: var(--fs-title);
  font-weight: 800;
  overflow-wrap: anywhere;
}

.contact__linkedin {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 700;
}

.contact__form {
  display: grid;
  gap: 1.25rem;
  position: relative;
}

.contact__intro {
  color: var(--ink-2);
}

.contact__honeypot {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  opacity: 0;
  pointer-events: none;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.field__label {
  font-weight: 700;
}

.field__input {
  width: 100%;
  min-height: 48px;
  padding: 0.65rem 0.85rem 0.5rem;
  background: var(--ground);
  border: 2px solid var(--ink-2);
  border-radius: 0;
  color: var(--ink);

  &::placeholder {
    color: var(--ink-2);
    opacity: 1;
  }

  &:hover {
    border-color: var(--ink);
  }

  &:focus-visible {
    border-color: var(--focus);
    outline-offset: 2px;
  }

  &--textarea {
    min-height: 9rem;
    resize: vertical;
    line-height: 1.5;
  }
}

.field--error .field__input {
  border-color: var(--error);
}

.field__hint {
  font-size: var(--fs-label);
  color: var(--ink-2);
}

.field__error {
  color: var(--error);
  font-weight: 600;
}

.contact__submit-error {
  padding: 0.75rem 1rem 0.6rem;
  border: 2px solid var(--error);
  color: var(--ink);
  font-weight: 600;
}

.contact__submit {
  justify-self: start;
}

.contact__success h3:focus {
  outline: none;
}

.contact__success {
  display: grid;
  gap: 0.75rem;
  justify-items: start;
  padding: 1.75rem;
  border: 2px solid var(--rule-strong);
}
</style>
