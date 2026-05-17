import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'
import heroSectionSource from '../HeroSection.vue?raw'

describe('HeroSection', () => {
  it('renders an optimized hero image with descriptive alt text', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    expect(image.attributes('src')).toBe('/profile-440.webp')
    expect(image.attributes('srcset')).toContain('/profile-220.webp 220w')
    expect(image.attributes('srcset')).toContain('/profile-440.webp 440w')
    expect(image.attributes('sizes')).toBe('(min-width: 768px) 220px, 160px')
    expect(image.attributes('width')).toBe('220')
    expect(image.attributes('height')).toBe('220')
    expect(image.attributes('fetchpriority')).toBe('high')
    expect(image.attributes('alt')).toBe('Portrait of Sean Jones')
  })

  it('uses avatar styling hooks and removes placeholder artwork', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    expect(image.classes()).toContain('hero__avatar')
    expect(wrapper.find('.hero__avatar-icon').exists()).toBe(false)
    expect(wrapper.find('.hero__avatar-label').exists()).toBe(false)
  })

  it('applies targeted opacity only to the avatar element in dark mode', () => {
    const wrapper = mount(HeroSection)
    const image = wrapper.get('img.hero__avatar')

    expect(Number(window.getComputedStyle(image.element).opacity)).toBe(1)
    expect(heroSectionSource).toMatch(/:global\(\[data-theme=["']dark["']\]\)\s+\.hero__avatar/)
    expect(heroSectionSource).not.toMatch(/:global\(\[data-theme=["']dark["']\]\)\s*\{\s*opacity:\s*0\.75;/)
  })

  it('keeps hero call-to-action links visible', () => {
    const wrapper = mount(HeroSection)
    const links = wrapper.findAll('.hero__cta a').map(node => node.attributes('href'))

    expect(links).toEqual(['#skills', '#projects', '#work', '#contact'])
  })
})
