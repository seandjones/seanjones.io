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

  it('declares non-interactive overlay styles to avoid blocking clicks', async () => {
    const wrapper = mount(CursorFollower)
    await nextTick()

    const follower = wrapper.get('.cursor-follower')

    expect(follower.exists()).toBe(true)
    expect(cursorFollowerSource).toContain('pointer-events: none;')
    expect(cursorFollowerSource).toContain('z-index: 90;')
    expect(cursorFollowerSource).toContain('width: 24px;')
    expect(cursorFollowerSource).toContain('height: 24px;')
    expect(cursorFollowerSource).toContain('transform 0.16s cubic-bezier(0.19, 1, 0.22, 1)')

    const lightBlockMatch = cursorFollowerSource.match(/:global\(\[data-theme='light'\]\) \.cursor-follower\s*\{([\s\S]*?)\n\}/)
    const darkBlockMatch = cursorFollowerSource.match(/:global\(\[data-theme='dark'\]\) \.cursor-follower\s*\{([\s\S]*?)\n\}/)

    expect(lightBlockMatch).not.toBeNull()
    expect(darkBlockMatch).not.toBeNull()

    const lightBlock = lightBlockMatch?.[1] ?? ''
    const darkBlock = darkBlockMatch?.[1] ?? ''

    expect(lightBlock).toContain("background: color-mix(in srgb, var(--color-accent) 68%, transparent);")
    expect(lightBlock).toContain('0 0 30px')

    expect(darkBlock).toContain("background: color-mix(in srgb, var(--color-accent) 50%, transparent);")
    expect(darkBlock).toContain('0 0 26px')
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
})
