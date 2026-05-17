import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectsSection from '../ProjectsSection.vue'
import projectsSectionSource from '../ProjectsSection.vue?raw'

describe('ProjectsSection', () => {
  it('renders case study tiles with image, title, description, and modal trigger button', () => {
    const wrapper = mount(ProjectsSection)
    const tiles = wrapper.findAll('.project-tile')
    const buttons = wrapper.findAll('.project-tile__button')

    expect(wrapper.find('section#projects').exists()).toBe(true)
    expect(wrapper.get('#projects-heading').text()).toBe('Case Studies')
    expect(wrapper.get('.projects__eyebrow').text()).toBe('Selected work')
    expect(wrapper.get('.projects__subheading').text()).toContain('Placeholder projects')
    expect(wrapper.get('section#projects').attributes('aria-labelledby')).toBe('projects-heading')
    expect(tiles.length).toBe(4)
    expect(buttons.length).toBe(tiles.length)

    for (const tile of tiles) {
      const image = tile.get('.project-tile__image')
      expect(image.attributes('src')).toBe('/project-placeholder.svg')
      expect(image.attributes('alt')).toContain('placeholder')
      expect(tile.get('.project-tile__title').text()).not.toHaveLength(0)
      expect(tile.get('.project-tile__description').text()).not.toHaveLength(0)
      expect(tile.attributes('aria-label')).toContain('case study')
      expect(tile.get('.project-tile__button').text()).toBe('View Case Study')
    }

    expect(wrapper.findAll('.project-tile__detail')).toHaveLength(0)
  })

  it('opens a modal with full details for the selected project and closes from button', async () => {
    const wrapper = mount(ProjectsSection)
    const secondButton = wrapper.findAll('.project-tile__button')[1]

    await secondButton.trigger('click')

    const dialog = wrapper.get('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(wrapper.get('.project-modal__title').text()).toBe('Smart shopping assistant for ai.price.com')
    expect(wrapper.get('.project-modal__description').text()).toContain('LLM-powered')
    expect(wrapper.findAll('.project-modal__detail')).toHaveLength(3)
    expect(wrapper.findAll('.project-modal__detail')[0].text()).toContain('Challenge:')

    await wrapper.get('.project-modal__close').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes modal on overlay click and Escape key', async () => {
    const wrapper = mount(ProjectsSection)
    await wrapper.get('.project-tile__button').trigger('click')

    await wrapper.get('.project-modal').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)

    await wrapper.get('.project-tile__button').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('supports empty project input without rendering tiles', () => {
    const wrapper = mount(ProjectsSection, {
      props: {
        items: [],
      },
    })

    expect(wrapper.findAll('.project-tile')).toHaveLength(0)
    expect(wrapper.findAll('.project-tile__button')).toHaveLength(0)
    expect(wrapper.find('#projects-heading').exists()).toBe(true)
  })

  it('declares modal grow animation styles for open and close transitions', () => {
    expect(projectsSectionSource).toContain('.project-modal-enter-from .project-modal__panel')
    expect(projectsSectionSource).toContain('transform: scale(0.94);')
    expect(projectsSectionSource).toContain('.project-modal-enter-active .project-modal__panel')
    expect(projectsSectionSource).toContain('transition: transform 0.22s ease, opacity 0.22s ease;')
  })
})
