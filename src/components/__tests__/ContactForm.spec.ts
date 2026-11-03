import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ContactForm from '../ContactForm.vue'

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fillValidFields(wrapper: ReturnType<typeof mount>) {
  await wrapper.find('#cf-name').setValue('Sean Jones')
  await wrapper.find('#cf-email').setValue('sean@example.com')
  await wrapper.find('#cf-message').setValue('Hello, I would like to connect.')
}

// ─── Validation ───────────────────────────────────────────────────────────────

describe('ContactForm — field validation', () => {
  it('shows the name error when name field is blurred empty', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-name').trigger('blur')
    expect(wrapper.find('#cf-name-error').text()).toBe('Enter your name.')
  })

  it('shows the email error when email field is blurred empty', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-email').trigger('blur')
    expect(wrapper.find('#cf-email-error').text()).toBe('Enter your email address.')
  })

  it('shows format error for an invalid email address', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-email').setValue('not-an-email')
    await wrapper.find('#cf-email').trigger('blur')
    expect(wrapper.find('#cf-email-error').text()).toBe("That email address doesn't look right. Check for a typo.")
  })

  it('clears the email error when a valid email is entered', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-email').setValue('valid@example.com')
    await wrapper.find('#cf-email').trigger('blur')
    expect(wrapper.find('#cf-email-error').exists()).toBe(false)
  })

  it('shows the message error when message field is blurred empty', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-message').trigger('blur')
    expect(wrapper.find('#cf-message-error').text()).toBe('Write a short message.')
  })

  it('shows all three field errors when form is submitted with empty fields', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('#cf-name-error').exists()).toBe(true)
    expect(wrapper.find('#cf-email-error').exists()).toBe(true)
    expect(wrapper.find('#cf-message-error').exists()).toBe(true)
  })

  it('does not call fetch when form is submitted with validation errors', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const wrapper = mount(ContactForm)
    await wrapper.find('form').trigger('submit')
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('sets aria-invalid="true" on fields that fail validation', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.find('#cf-name').trigger('blur')
    await wrapper.find('#cf-email').setValue('bad-email')
    await wrapper.find('#cf-email').trigger('blur')
    await wrapper.find('#cf-message').trigger('blur')
    expect(wrapper.find('#cf-name').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('#cf-email').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('#cf-message').attributes('aria-invalid')).toBe('true')
  })
})

// ─── Spam prevention ──────────────────────────────────────────────────────────

describe('ContactForm — spam prevention', () => {
  it('silently rejects submission when the honeypot field is filled', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const wrapper = mount(ContactForm)
    await fillValidFields(wrapper)
    await wrapper.find('.contact__honeypot').setValue('spam-bot')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('silently rejects submission within 2 seconds of mount', async () => {
    vi.useFakeTimers()
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test')
    try {
      const fetchSpy = vi.spyOn(globalThis, 'fetch')
      const wrapper = mount(ContactForm)
      await fillValidFields(wrapper)
      // No time advance — still inside 2s gate
      await wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(fetchSpy).not.toHaveBeenCalled()
      fetchSpy.mockRestore()
    } finally {
      vi.useRealTimers()
      vi.unstubAllEnvs()
    }
  })
})

// ─── Submission ───────────────────────────────────────────────────────────────

describe('ContactForm — submission', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test')
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('shows the success state after a 200 response from Formspree', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: true } as Response)
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000) // past the 2s time gate
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact__success').exists()).toBe(true)
    expect(wrapper.find('.contact__success').text()).toContain("I'll reply to sean@example.com.")
    // Verify the correct HTTP request was made
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://formspree.io/f/test',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ name: 'Sean Jones', email: 'sean@example.com', message: 'Hello, I would like to connect.' }),
      }),
    )
  })

  it('shows an error message after a non-200 response from Formspree', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: false } as Response)
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact__submit-error').exists()).toBe(true)
  })

  it('shows an error message when fetch throws a network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact__submit-error').exists()).toBe(true)
  })

  it('disables the submit button while the request is in-flight', async () => {
    let resolveResponse!: (value: Response) => void
    vi.spyOn(globalThis, 'fetch').mockReturnValueOnce(
      new Promise<Response>(resolve => { resolveResponse = resolve }),
    )
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    // Request is still in-flight — button must be disabled
    expect((wrapper.find('button[type="submit"]').element as HTMLButtonElement).disabled).toBe(true)
    resolveResponse({ ok: true } as Response)
    await flushPromises()
  })

  it('shows a configuration error when VITE_FORMSPREE_ENDPOINT is not set', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '')
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact__submit-error').exists()).toBe(true)
  })
})

describe('ContactForm — recovery copy', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('names the public email address when the form is not configured', async () => {
    vi.useFakeTimers()
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '')
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.contact__submit-error').text()).toContain('hello@seanjones.io')
  })

  it('shows the email address and LinkedIn beside the form', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('a[href="mailto:hello@seanjones.io"]').exists()).toBe(true)
    expect(wrapper.find('.contact__linkedin').attributes('href')).toContain('linkedin.com')
  })

  it('does not use the owner name as a placeholder', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('#cf-name').attributes('placeholder')).toBeUndefined()
  })
})

describe('ContactForm — hardening', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('caps field lengths and tells people the message limit', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.find('#cf-name').attributes('maxlength')).toBe('100')
    expect(wrapper.find('#cf-email').attributes('maxlength')).toBe('254')
    expect(wrapper.find('#cf-message').attributes('maxlength')).toBe('5000')
    expect(wrapper.find('#cf-message-hint').text()).toBe('Up to 5,000 characters.')
  })

  it('gives up on a hung request and shows the network message with the email', async () => {
    vi.useFakeTimers()
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', 'https://formspree.io/f/test')
    vi.spyOn(globalThis, 'fetch').mockImplementation((_url, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
      }),
    )
    const wrapper = mount(ContactForm)
    vi.advanceTimersByTime(3000)
    await fillValidFields(wrapper)
    await wrapper.find('form').trigger('submit')
    vi.advanceTimersByTime(15000)
    await flushPromises()
    expect(wrapper.find('.contact__submit-error').text()).toContain("Your message didn't send. Check your connection")
    expect(wrapper.find('.contact__submit-error').text()).toContain('hello@seanjones.io')
    expect((wrapper.find('button[type="submit"]').element as HTMLButtonElement).disabled).toBe(false)
  })
})

describe('ContactForm — availability', () => {
  it('states location and reply time beside the form', () => {
    const wrapper = mount(ContactForm)
    const facts = wrapper.find('.contact__facts').text()
    expect(facts).toContain('Remote, or hybrid in the Denver area.')
    expect(facts).toContain('I usually reply within a day.')
  })
})

describe('ContactForm — positioning', () => {
  it('names the role level at the terminus', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.get('.contact__line').text()).toBe('Open to conversations about Staff, Principal and engineering-lead roles.')
  })
})
