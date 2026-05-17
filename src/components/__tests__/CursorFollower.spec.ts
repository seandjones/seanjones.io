import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CursorFollower from '../CursorFollower.vue'
import cursorFollowerSource from '../CursorFollower.vue?raw'

beforeEach(() => {
  vi.restoreAllMocks()

  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
})

describe('CursorFollower', () => {
  it('renders follower element for fine pointers', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    expect(wrapper.find('.cursor-follower').exists()).toBe(true)
  })

  it('renders 10 trail segments in an SVG when enabled', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    expect(wrapper.find('.cursor-trail-svg').exists()).toBe(true)
    expect(wrapper.findAll('.cursor-trail-segment').length).toBe(10)
  })

  it('declares non-interactive overlay styles to avoid blocking clicks', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    const follower = wrapper.get('.cursor-follower')

    expect(follower.exists()).toBe(true)
    expect(cursorFollowerSource).toContain('pointer-events: none;')
    expect(cursorFollowerSource).toContain('z-index: 0;')
    expect(cursorFollowerSource).toContain('opacity: 0.64;')
    expect(cursorFollowerSource).toContain('width: 24px;')
    expect(cursorFollowerSource).toContain('height: 24px;')
    expect(cursorFollowerSource).toContain('transform 0.16s cubic-bezier(0.19, 1, 0.22, 1)')

    const lightBlockMatch = cursorFollowerSource.match(/:global\(\[data-theme='light'\]\) \.cursor-follower\s*\{([\s\S]*?)\n\}/)
    const darkBlockMatch = cursorFollowerSource.match(/:global\(\[data-theme='dark'\]\) \.cursor-follower\s*\{([\s\S]*?)\n\}/)

    expect(lightBlockMatch).not.toBeNull()
    expect(darkBlockMatch).not.toBeNull()

    const lightBlock = lightBlockMatch?.[1] ?? ''
    const darkBlock = darkBlockMatch?.[1] ?? ''

    expect(lightBlock).toContain("background: color-mix(in srgb, var(--color-accent) 60%, transparent);")
    expect(lightBlock).toContain('0 0 14px')

    expect(darkBlock).toContain("background: color-mix(in srgb, var(--color-accent) 42%, transparent);")
    expect(darkBlock).toContain('0 0 12px')
  })

  it('updates transform style on pointer movement', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    const follower = wrapper.get('.cursor-follower')

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 80 }))
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect((follower.element as HTMLElement).style.transform).toContain('120px')
    expect((follower.element as HTMLElement).style.transform).toContain('80px')
  })

  it('does not render follower for reduced-motion users', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const wrapper = mount(CursorFollower)
    expect(wrapper.find('.cursor-follower').exists()).toBe(false)
  })

  it('does not render follower for coarse pointers', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })))

    const wrapper = mount(CursorFollower)
    expect(wrapper.find('.cursor-follower').exists()).toBe(false)
  })

  it('trail segments have decreasing opacity and stroke-width toward the tail', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    const segments = wrapper.findAll('.cursor-trail-segment')
    const first = segments[0].element as HTMLElement
    const last = segments[9].element as HTMLElement

    const firstOpacity = parseFloat(first.style.opacity)
    const lastOpacity = parseFloat(last.style.opacity)
    expect(firstOpacity).toBeGreaterThan(0.5)
    expect(lastOpacity).toBeLessThan(0.1)
    expect(firstOpacity).toBeGreaterThan(lastOpacity)
  })

  it('trail segments connect sequential cursor positions', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 50 }))
    await new Promise(resolve => requestAnimationFrame(resolve))

    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 100 }))
    await new Promise(resolve => requestAnimationFrame(resolve))

    const firstSegment = wrapper.findAll('.cursor-trail-segment')[0].element
    expect(firstSegment.getAttribute('x1')).toBe('200')
    expect(firstSegment.getAttribute('y1')).toBe('100')
    expect(firstSegment.getAttribute('x2')).toBe('100')
    expect(firstSegment.getAttribute('y2')).toBe('50')
  })

  it('adjacent trail segments share endpoints forming a connected stroke', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    for (let x = 0; x < 14; x++) {
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: x * 10, clientY: x * 5 }))
      await new Promise(resolve => requestAnimationFrame(resolve))
    }

    const segments = wrapper.findAll('.cursor-trail-segment')
    for (let i = 0; i < segments.length - 1; i++) {
      const curr = segments[i].element
      const next = segments[i + 1].element
      expect(curr.getAttribute('x2')).toBe(next.getAttribute('x1'))
      expect(curr.getAttribute('y2')).toBe(next.getAttribute('y1'))
    }
  })

  it('cursor-trail-svg is non-interactive and trail segments have no CSS transition', () => {
    const svgBlockMatch = cursorFollowerSource.match(/\.cursor-trail-svg\s*\{([\s\S]*?)\n\s*\}/)
    expect(svgBlockMatch).not.toBeNull()
    const svgBlock = svgBlockMatch?.[1] ?? ''
    expect(svgBlock).toContain('pointer-events: none;')

    const segmentBlockMatch = cursorFollowerSource.match(/\.cursor-trail-segment\s*\{([\s\S]*?)\n\s*\}/)
    expect(segmentBlockMatch).not.toBeNull()
    const segmentBlock = segmentBlockMatch?.[1] ?? ''
    expect(segmentBlock).not.toContain('transition:')
  })
})
