import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SystemMap from '../SystemMap.vue'
import { caseStudies, mapInterchanges, mapLines, roles } from '../../content/site'

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
})

/** Every id a map station may point at: case studies, their parts, and roles. */
function knownAnchors(): Set<string> {
  const ids = new Set<string>()
  for (const s of caseStudies) {
    ids.add(s.id)
    for (const p of [...s.problem, ...s.did, ...s.result]) if (p.id) ids.add(p.id)
  }
  for (const r of roles) ids.add(r.id)
  return ids
}

describe('SystemMap', () => {
  it('renders the name as the only h1 with both actions', () => {
    const wrapper = mount(SystemMap)
    const h1s = wrapper.findAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0]!.text()).toBe('Sean Jones')
    expect(wrapper.find('a[href="#contact"]').text()).toBe('Get in touch')
    expect(wrapper.find('a[href="#work"]').text()).toBe('See the work')
  })

  it('draws all five lines', () => {
    const wrapper = mount(SystemMap)
    const lines = wrapper.findAll('.map__line').map((g) => g.attributes('data-line'))
    expect(lines).toEqual(['ai', 'platform', 'frontend', 'extensions', 'leadership'])
  })

  it('links every station and interchange to an anchor that exists on the page', () => {
    const anchors = knownAnchors()
    const hrefs = [
      ...mapLines.flatMap((l) => l.stations.map((s) => s.href)),
      ...mapInterchanges.map((i) => i.href),
    ]
    for (const href of hrefs) {
      expect(anchors.has(href.slice(1)), `${href} has no target`).toBe(true)
    }
  })

  it('gives every station an accessible name that includes its line', () => {
    const wrapper = mount(SystemMap)
    const stations = wrapper.findAll('svg a.map__station')
    expect(stations.length).toBe(mapLines.reduce((n, l) => n + l.stations.length, 0) + mapInterchanges.length)
    for (const s of stations) expect(s.attributes('aria-label')).toMatch(/line/)
  })

  it('lists the three verified results in the legend with their lines', () => {
    const wrapper = mount(SystemMap)
    const figures = wrapper.findAll('.legend__number').map((d) => d.text())
    expect(figures).toEqual(['−20%', '−25%', '+15%'])
    // Each figure names its line, so readers don't have to match colours.
    const lines = wrapper.findAll('.legend__line').map((d) => d.text())
    expect(lines).toEqual(['Frontend', 'Platform', 'AI'])
  })
})

describe('SystemMap keyboard path', () => {
  function press(el: Element, key: string) {
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  }

  it('gives each line a single tab stop instead of one per station', () => {
    const wrapper = mount(SystemMap, { attachTo: document.body })
    const stops = wrapper.findAll('svg [data-key]').filter((a) => a.attributes('tabindex') === '0')
    expect(stops).toHaveLength(mapLines.length)
    wrapper.unmount()
  })

  it('moves along a line with the arrow keys and keeps one tab stop for it', async () => {
    const wrapper = mount(SystemMap, { attachTo: document.body })
    const first = wrapper.get('svg [data-key="platform-0"]').element as SVGElement
    first.focus()
    press(first, 'ArrowRight')
    await wrapper.vm.$nextTick()
    expect((document.activeElement as SVGElement).dataset.key).toBe('platform-1')
    expect(wrapper.get('svg [data-key="platform-1"]').attributes('tabindex')).toBe('0')
    expect(wrapper.get('svg [data-key="platform-0"]').attributes('tabindex')).toBe('-1')

    press(document.activeElement!, 'ArrowRight')
    await wrapper.vm.$nextTick()
    // The Redesign interchange sits between Django and the pytest station.
    expect((document.activeElement as SVGElement).dataset.key).toBe('ix-0')
    wrapper.unmount()
  })

  it('jumps to the nearest station on the next line with ArrowDown', async () => {
    const wrapper = mount(SystemMap, { attachTo: document.body })
    const ai = wrapper.get('svg [data-key="ai-0"]').element as SVGElement // x 360
    ai.focus()
    press(ai, 'ArrowDown')
    await wrapper.vm.$nextTick()
    // AI's first station is at x 360; Platform's nearest stations (250 and 460) are equally far, so the first wins.
    expect((document.activeElement as SVGElement).dataset.line).toBe('platform')
    wrapper.unmount()
  })

  it('moves inside a phone strip with ArrowDown', async () => {
    const wrapper = mount(SystemMap, { attachTo: document.body })
    const strip = wrapper.findAll('.strip__stations')[0]!
    const links = strip.findAll('a')
    expect(links.filter((a) => a.attributes('tabindex') === '0')).toHaveLength(1)
    ;(links[0]!.element as HTMLElement).focus()
    press(links[0]!.element, 'ArrowDown')
    await wrapper.vm.$nextTick()
    expect(document.activeElement).toBe(links[1]!.element)
    wrapper.unmount()
  })

  it('explains the keys to people using the map from the keyboard', () => {
    const wrapper = mount(SystemMap)
    expect(wrapper.get('#map-hint').text()).toBe('Tab moves between lines. Arrow keys move between stations.')
    expect(wrapper.get('svg').attributes('aria-describedby')).toBe('map-hint')
  })
})

describe('SystemMap positioning', () => {
  it('says what roles and where on the first screen', () => {
    const wrapper = mount(SystemMap)
    expect(wrapper.get('.sign__open').text()).toBe('Open to Staff, Principal and engineering-lead roles. Remote, or hybrid in the Denver area.')
  })

  it('tells readers the stations link to evidence', () => {
    const wrapper = mount(SystemMap)
    expect(wrapper.get('#map-caption').text()).toContain('each station links to the result behind it')
  })
})

describe('SystemMap interchanges and the keyboard', () => {
  function press(el: Element, key: string) {
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  }

  it('switches to the other line on an interchange without moving focus', async () => {
    const wrapper = mount(SystemMap, { attachTo: document.body })
    const start = wrapper.get('svg [data-key="extensions-1"]').element as SVGElement
    start.focus()
    press(start, 'ArrowRight') // Extensions -> the Extension releases interchange
    await wrapper.vm.$nextTick()
    const ix = document.activeElement as SVGElement
    expect(ix.dataset.key).toBe('ix-1')

    press(ix, 'ArrowDown') // change to Leadership, stay on the interchange
    await wrapper.vm.$nextTick()
    expect((document.activeElement as SVGElement).dataset.key).toBe('ix-1')
    expect(wrapper.get('figure.map').attributes('data-active')).toBe('leadership')

    press(document.activeElement!, 'ArrowRight') // now travels the Leadership line
    await wrapper.vm.$nextTick()
    expect((document.activeElement as SVGElement).dataset.key).toBe('leadership-2')
    wrapper.unmount()
  })
})
