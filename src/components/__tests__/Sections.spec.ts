import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkSection from '../WorkSection.vue'
import ProjectsBranch from '../ProjectsBranch.vue'
import ExperienceLine from '../ExperienceLine.vue'

describe('WorkSection', () => {
  it('renders four employer and client case studies with their own anchors', () => {
    const wrapper = mount(WorkSection)
    const ids = wrapper.findAll('article.study').map((a) => a.attributes('id'))
    expect(ids).toEqual(['work-price-platform', 'work-ai-price', 'work-starbucks', 'work-pg'])
  })

  it('uses only approved, captured screenshots', () => {
    const wrapper = mount(WorkSection)
    const srcs = wrapper.findAll('img').map((i) => i.attributes('src'))
    expect(srcs).toEqual(['/work/price-1200.webp', '/work/ai-price-1200.webp', '/work/starbucks-1200.webp'])
    for (const img of wrapper.findAll('img')) expect(img.attributes('alt')?.length).toBeGreaterThan(20)
  })

  it('labels each case study part', () => {
    const wrapper = mount(WorkSection)
    const labels = wrapper.find('#work-price-platform').findAll('.part__label').map((h) => h.text())
    expect(labels).toEqual(['Result', 'Problem', 'What I did'])
  })
})

describe('ProjectsBranch', () => {
  it('links all four independent projects to their live sites', () => {
    const wrapper = mount(ProjectsBranch)
    const hrefs = wrapper.findAll('a.branch__visit').map((a) => a.attributes('href'))
    expect(hrefs).toEqual([
      'https://taskriver.ai/',
      'https://whatcontractorspay.com/',
      'https://thefamilyshortlist.com/',
      'https://fsmaradar.com/',
    ])
  })
})

describe('ExperienceLine', () => {
  it('renders five roles in order with the current role marked', () => {
    const wrapper = mount(ExperienceLine)
    const stops = wrapper.findAll('.career__stop')
    expect(stops).toHaveLength(5)
    expect(stops[0]!.find('h3').text()).toBe('Director of Engineering')
    expect(stops[0]!.find('.career__now').text()).toBe('Now')
    expect(stops[0]!.findAll('.career__list li')).toHaveLength(1)
  })

  it('points to the case studies instead of repeating them', () => {
    const wrapper = mount(ExperienceLine)
    const director = wrapper.find('#exp-director .career__see').findAll('a').map((a) => a.attributes('href'))
    expect(director).toEqual(['#work-price-platform', '#work-ai-price'])
    const senior = wrapper.find('#exp-senior .career__see').findAll('a').map((a) => a.attributes('href'))
    expect(senior).toEqual(['#work-starbucks', '#work-pg'])
    expect(wrapper.text()).not.toContain('SSH into EC2')
    expect(wrapper.text()).toContain('10,000+ users')
  })

  it('marks the second Price.com role as joined to the first', () => {
    const wrapper = mount(ExperienceLine)
    expect(wrapper.find('#exp-lead').classes()).toContain('career__stop--joined')
  })

  it('shows the stack as a single line', () => {
    const wrapper = mount(ExperienceLine)
    expect(wrapper.find('.stack__line').text()).toContain('Django')
    expect(wrapper.find('.stack__line').text()).not.toContain('IIS')
  })
})

describe('Polish: live links, results and labels', () => {
  it('links the Price.com and ai.price.com case studies to the live products', () => {
    const wrapper = mount(WorkSection)
    const live = wrapper.findAll('.study__live a').map((a) => [a.attributes('href'), a.text()])
    expect(live).toEqual([
      ['https://www.price.com/', 'Visit price.com (opens in a new tab)'],
      ['https://ai.price.com/', 'Visit ai.price.com (opens in a new tab)'],
    ])
  })

  it('gives every case study a result', () => {
    const wrapper = mount(WorkSection)
    for (const study of wrapper.findAll('article.study')) {
      expect(study.findAll('.part__label').map((h) => h.text())).toContain('Result')
    }
  })

  it('uses the same name for the projects section as the nav', () => {
    const wrapper = mount(ProjectsBranch)
    expect(wrapper.get('#projects-heading').text()).toBe('Projects')
  })
})

describe('WorkSection scannability', () => {
  it('leads each case study with its result and keeps the detail behind a disclosure', () => {
    const wrapper = mount(WorkSection)
    for (const study of wrapper.findAll('article.study')) {
      const body = study.get('.study__body')
      expect(body.element.firstElementChild?.classList.contains('part--result')).toBe(true)
      const details = body.get('details.study__more')
      expect(details.attributes('open')).toBeUndefined()
      expect(details.get('summary').text()).toBe('Full case study')
    }
  })

  it('groups 2012–2016 client work under Earlier work', () => {
    const wrapper = mount(WorkSection)
    expect(wrapper.get('#work-earlier-heading').text()).toBe('Earlier work, 2012–2016')
    const earlier = wrapper.findAll('article.study--earlier').map((a) => a.attributes('id'))
    expect(earlier).toEqual(['work-starbucks', 'work-pg'])
  })

  it('offers one icon copy-link control per case study with a clear name', () => {
    const wrapper = mount(WorkSection)
    const buttons = wrapper.findAll('.study__copy')
    expect(buttons).toHaveLength(4)
    expect(buttons[0]!.attributes('aria-label')).toBe('Copy link to Price.com web application and extension platform')
    expect(buttons[0]!.find('svg').exists()).toBe(true)
  })
})

describe('ExperienceLine interchange note', () => {
  it('tells screen readers when a role is at the same company as the one above', () => {
    const wrapper = mount(ExperienceLine)
    expect(wrapper.get('#exp-lead').text()).toContain('Same company as the role above.')
    expect(wrapper.get('#exp-director').text()).not.toContain('Same company as the role above.')
  })
})
