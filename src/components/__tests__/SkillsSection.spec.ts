import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillsSection from '../SkillsSection.vue'

describe('SkillsSection', () => {
  it('renders all expected skill group cards', () => {
    const wrapper = mount(SkillsSection)
    const titles = wrapper.findAll('.skill-card__title').map(node => node.text())

    expect(titles).toEqual([
      'Application Management',
      'Frontend Engineering',
      'Extension Development',
      'Backend & APIs',
      'AI Engineering',
    ])
  })

  it('renders an AI Engineering skill tile in the grid', () => {
    const wrapper = mount(SkillsSection)
    const titles = wrapper.findAll('.skill-card__title').map(node => node.text())

    expect(titles).toContain('AI Engineering')
  })

  it('renders AI Engineering skills and icon content', () => {
    const wrapper = mount(SkillsSection)
    const cards = wrapper.findAll('.skill-card')
    const aiCard = cards.find(card => card.find('.skill-card__title').text() === 'AI Engineering')

    expect(aiCard).toBeDefined()
    if (!aiCard) {
      return
    }

    const pills = aiCard.findAll('.skill-pill').map(node => node.text())

    expect(pills).toEqual([
      'Prompt Engineering',
      'Harness Engineering',
      'AI Product Strategy',
      'Agentic Workflows',
    ])

  })

  it('keeps the existing card/grid structure and accessibility labels', () => {
    const wrapper = mount(SkillsSection)

    expect(wrapper.find('.skills__grid').exists()).toBe(true)

    const cards = wrapper.findAll('.skill-card')
    expect(cards).toHaveLength(5)

    for (const card of cards) {
      expect(card.find('.skill-card__title').exists()).toBe(true)

      const list = card.find('.skill-card__list')
      expect(list.exists()).toBe(true)
      expect(list.attributes('aria-label')).toMatch(/skills$/)
      expect(card.findAll('.skill-pill').length).toBeGreaterThan(0)
    }
  })
})
