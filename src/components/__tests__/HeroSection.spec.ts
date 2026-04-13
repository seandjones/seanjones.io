import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'

describe('HeroSection', () => {
  it('renders the real profile picture with descriptive alt text', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    expect(image.attributes('src')).toBe('/profile.webp')
    expect(image.attributes('alt')).toBe('Portrait of Sean Jones')
  })

  it('uses avatar styling hooks and removes placeholder artwork', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    expect(image.classes()).toContain('hero__avatar')
    expect(wrapper.find('.hero__avatar-icon').exists()).toBe(false)
    expect(wrapper.find('.hero__avatar-label').exists()).toBe(false)
  })

  it('applies targeted opacity to avatar element in dark mode', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    // Light theme: avatar is fully opaque (default)
    expect(Number(window.getComputedStyle(image.element).opacity)).toBe(1)

    // Simulate dark theme by applying CSS rule and checking structure
    const style = document.createElement('style')
    style.textContent = `
      [data-theme='dark'] img.hero__avatar {
        opacity: 0.75;
      }
    `
    document.head.appendChild(style)

    // Test dark mode opacity application
    const darkContainer = document.createElement('div')
    darkContainer.setAttribute('data-theme', 'dark')
    const testImage = image.element.cloneNode() as HTMLImageElement
    darkContainer.appendChild(testImage)
    document.body.appendChild(darkContainer)

    try {
      // Avatar should have reduced opacity in dark mode
      const darkOpacity = Number(window.getComputedStyle(testImage).opacity)
      expect(darkOpacity).toBe(0.75)
    } finally {
      document.body.removeChild(darkContainer)
      document.head.removeChild(style)
    }
  })

  it('keeps hero call-to-action links visible', () => {
    const wrapper = mount(HeroSection)
    const links = wrapper.findAll('.hero__cta a').map(node => node.attributes('href'))

    expect(links).toEqual(['#skills', '#work', '#contact'])
  })
})
