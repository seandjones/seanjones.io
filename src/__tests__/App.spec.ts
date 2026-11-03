import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../App.vue'

enableAutoUnmount(afterEach)

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme')
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({
    matches: false,
    media: '',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })))
})

describe('App shell', () => {
  it('mounts every section in reading order', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    const ids = wrapper.findAll('main > section').map((s) => s.attributes('id') ?? s.classes()[0])
    expect(ids).toEqual(['hero', 'work', 'experience', 'projects', 'contact'])
    expect(wrapper.find('.skip-link').attributes('href')).toBe('#main-content')
    expect(wrapper.find('.skip-link').attributes('aria-label')).toBeUndefined()
    wrapper.unmount()
  })

  it('points every nav link at a section that exists', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    for (const link of wrapper.findAll('#site-nav a')) {
      expect(document.querySelector(link.attributes('href')!)).not.toBeNull()
    }
    wrapper.unmount()
  })

  it('toggles the mobile navigation', async () => {
    const wrapper = mount(App)
    const button = wrapper.get('.masthead__menu')
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('#site-nav').classes()).toContain('masthead__nav--open')
  })

  it('sets the theme on <html> so top-layer UI follows it', async () => {
    const wrapper = mount(App)
    await nextTick()
    expect(document.documentElement.dataset.theme).toBe('light')
    await wrapper.get('.theme-toggle').trigger('click')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

describe('App hardening', () => {
  beforeEach(() => {
    localStorage.clear()
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('lets visitors turn single-key shortcuts off, and remembers it (WCAG 2.1.4)', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    const scroll = Element.prototype.scrollIntoView as ReturnType<typeof vi.fn>

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }))
    expect(scroll).toHaveBeenCalledTimes(1)

    await wrapper.get('.help__check').setValue(false)
    expect(localStorage.getItem('sj-shortcuts')).toBe('off')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }))
    expect(scroll).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('opens shortcut settings from a footer button, without needing a key', () => {
    const wrapper = mount(App)
    expect(wrapper.get('.footer__shortcuts').text()).toBe('Keyboard shortcuts')
  })

  it('scrolls to a shared deep link once the page has rendered', async () => {
    window.history.replaceState(null, '', '#work-ai-price')
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    await nextTick()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    window.history.replaceState(null, '', window.location.pathname)
    wrapper.unmount()
  })
})

describe('App keyboard path', () => {
  beforeEach(() => {
    localStorage.clear()
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('offers a second skip link straight to the work', () => {
    const wrapper = mount(App)
    const skips = wrapper.findAll('.skip-link').map((a) => [a.attributes('href'), a.text()])
    expect(skips).toEqual([
      ['#main-content', 'Skip to main content'],
      ['#work', 'Skip to the work'],
    ])
  })

  it('runs shortcuts while a link has focus, but not while typing', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    const link = wrapper.get('#site-nav a').element as HTMLAnchorElement
    link.focus()
    link.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1)

    const input = wrapper.get('#cf-name').element as HTMLInputElement
    input.focus()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1)
  })
})

describe('App deep links into disclosures', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('opens the closed "Full case study" a station link points into', async () => {
    const wrapper = mount(App, { attachTo: document.body })
    await nextTick()
    const details = document.querySelector('#price-frontend')!.closest('details')!
    expect(details.open).toBe(false)
    window.history.replaceState(null, '', '#price-frontend')
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    expect(details.open).toBe(true)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    window.history.replaceState(null, '', window.location.pathname)
    wrapper.unmount()
  })
})
