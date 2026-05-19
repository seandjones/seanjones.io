import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../App.vue'
import appSource from '../App.vue?raw'

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
  it('renders favicon as the navbar brand mark image and mounts all sections', async () => {
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
    expect(wrapper.find('section.hero').exists()).toBe(true)
    expect(wrapper.find('section#skills').exists()).toBe(true)
    expect(wrapper.find('section#projects').exists()).toBe(true)
    expect(wrapper.find('section#work').exists()).toBe(true)
    expect(wrapper.find('section#contact').exists()).toBe(true)
    expect(wrapper.find('.skip-link').attributes('href')).toBe('#main-content')
  })

  it('toggles mobile navigation open state from hamburger control', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          ThemeToggle: true,
        },
      },
    })

    const menuButton = wrapper.get('.navbar__hamburger')
    const nav = wrapper.get('#site-nav')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
    expect(nav.classes()).not.toContain('navbar__nav--open')

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')
    expect(nav.classes()).toContain('navbar__nav--open')

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('false')
    expect(nav.classes()).not.toContain('navbar__nav--open')
  })

  it('does not reintroduce global z-index override on app children', () => {
    expect(appSource).not.toContain('.app > :not(.skip-link)')
  })
})
