import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../App.vue'

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({
    matches: false,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
})

describe('App navbar branding', () => {
  it('renders favicon as the navbar brand mark image and mounts cursor follower', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          ThemeToggle: true,
        },
      },
    })
    await nextTick()

    const brandMark = wrapper.get('.navbar__brand-mark')
    expect(brandMark.element.tagName).toBe('IMG')
    expect(brandMark.attributes('src')).toBe('/favicon.png')
    expect(brandMark.attributes('aria-hidden')).toBe('true')
    expect(brandMark.attributes('alt')).toBe('')
    expect(wrapper.find('.cursor-follower').exists()).toBe(true)
    expect(wrapper.find('section.hero').exists()).toBe(true)
    expect(wrapper.find('section#skills').exists()).toBe(true)
    expect(wrapper.find('section#work').exists()).toBe(true)
    expect(wrapper.find('section#contact').exists()).toBe(true)
  })
})
