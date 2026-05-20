import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ProjectsSection from '../ProjectsSection.vue'
import projectsSectionSource from '../ProjectsSection.vue?raw'

describe('ProjectsSection', () => {
  it('renders case study tiles with image, title, description, and modal trigger button', () => {
    const wrapper = mount(ProjectsSection)
    const tiles = wrapper.findAll('.project-tile')
    const buttons = wrapper.findAll('.project-tile__button')

    expect(wrapper.find('section#projects').exists()).toBe(true)
    expect(wrapper.get('#projects-heading').text()).toBe('Case Studies')
    expect(wrapper.get('.projects__subheading').text()).toContain('End-to-end product')
    expect(wrapper.get('section#projects').attributes('aria-labelledby')).toBe('projects-heading')
    expect(tiles.length).toBe(4)
    expect(buttons.length).toBe(tiles.length)

    for (const tile of tiles) {
      const image = tile.get('.project-tile__image')
      expect(image.attributes('src')).toContain('/project-')
      expect(image.attributes('alt')).not.toContain('placeholder')
      expect(image.attributes('alt').length).toBeGreaterThan(12)
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

    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog!.getAttribute('aria-modal')).toBe('true')
    expect(document.body.querySelector('.project-modal__title')!.textContent?.trim()).toBe('Smart Shopping Assistant: ai.price.com')
    expect(document.body.querySelector('.project-modal__description')!.textContent).toContain('LLM-powered')
    expect(document.body.querySelectorAll('.project-modal__detail')).toHaveLength(3)
    expect(document.body.querySelectorAll('.project-modal__detail')[0].textContent).toContain('Challenge:')

    const closeBtn = document.body.querySelector('.project-modal__close') as HTMLButtonElement
    closeBtn.click()
    await flushPromises()
    expect(document.body.querySelector('.project-modal__panel')).toBeNull()
  })

  it('manages keyboard focus when opening, tabbing inside, and closing modal', async () => {
    const wrapper = mount(ProjectsSection, { attachTo: document.body })
    const trigger = wrapper.findAll('.project-tile__button')[0]

    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    const closeButton = document.body.querySelector('.project-modal__close') as HTMLButtonElement
    expect(document.activeElement).toBe(closeButton)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    await wrapper.vm.$nextTick()
    expect(document.activeElement).toBe(closeButton)

    closeButton.click()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(document.activeElement).toBe(trigger.element)

    wrapper.unmount()
  })

  it('closes modal on overlay click and Escape key', async () => {
    const wrapper = mount(ProjectsSection)
    await wrapper.get('.project-tile__button').trigger('click')

    const overlay = document.body.querySelector('.project-modal') as HTMLElement
    overlay.click()
    await flushPromises()
    expect(document.body.querySelector('.project-modal__panel')).toBeNull()

    await wrapper.get('.project-tile__button').trigger('click')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await flushPromises()
    expect(document.body.querySelector('.project-modal__panel')).toBeNull()
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
    expect(projectsSectionSource).toContain('transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;')
  })
})
