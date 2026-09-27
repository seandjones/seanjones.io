import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkHistory from '../WorkHistory.vue'

describe('WorkHistory', () => {
  it('renders the current role in a dedicated featured block', () => {
    const wrapper = mount(WorkHistory)

    const featured = wrapper.get('.featured-role')
    expect(featured.get('.featured-role__role').text()).toBe('Director of Engineering')
    expect(featured.get('.featured-role__badge').text()).toBe('Current Role')
    expect(featured.get('.featured-role__company-link').attributes('href')).toBe('https://price.com')
  })

  it('renders every concurrent current role as its own featured block', () => {
    const wrapper = mount(WorkHistory)

    const featured = wrapper.findAll('.featured-role')
    expect(featured).toHaveLength(2)

    const roles = featured.map(card => card.get('.featured-role__role').text())
    const companies = featured.map(card => card.get('.featured-role__company').text())

    expect(roles).toEqual(['Director of Engineering', 'Founder'])
    expect(companies).toEqual(['Price.com', 'TaskRiver.ai'])

    for (const card of featured) {
      expect(card.get('.featured-role__badge').text()).toBe('Current Role')
    }
  })

  it('renders the TaskRiver current role with its ventures and an external link', () => {
    const wrapper = mount(WorkHistory)

    const taskRiver = wrapper
      .findAll('.featured-role')
      .find(card => card.get('.featured-role__company').text() === 'TaskRiver.ai')

    expect(taskRiver).toBeDefined()
    if (!taskRiver) {
      return
    }

    const link = taskRiver.get('.featured-role__company-link')
    expect(link.attributes('href')).toBe('https://taskriver.ai')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(taskRiver.get('.featured-role__period').text()).toBe('2026 – Present')

    const contributions = taskRiver
      .findAll('.featured-role__contribution')
      .map(node => node.text())
      .join(' ')

    expect(contributions).toContain('WhatContractorsPay.com')
    expect(contributions).toContain('The Family Shortlist')
    expect(contributions).toContain('FSMA Radar')
  })

  it('renders the Director contributions from the résumé', () => {
    const wrapper = mount(WorkHistory)

    const contributions = wrapper
      .get('.featured-role')
      .findAll('.featured-role__contribution')
      .map(node => node.text())

    expect(contributions).toHaveLength(4)
    expect(contributions[0]).toContain('Built the frontend for ai.price.com')
    expect(contributions.join(' ')).not.toContain('LLM-powered')
  })

  it('names both Marlin companies with their dates under Senior Web Developer', () => {
    const wrapper = mount(WorkHistory)

    const marlin = wrapper
      .findAll('.timeline__card')
      .find(card => card.get('.timeline__role').text() === 'Senior Web Developer')

    expect(marlin).toBeDefined()
    if (!marlin) {
      return
    }

    expect(marlin.get('.timeline__company').text()).toBe(
      'Marlinco and The Alchemedia Project (now part of Marlin Connections)',
    )
    expect(marlin.get('.timeline__period').text()).toBe('Aug 2012 – Nov 2016')
    expect(marlin.get('.timeline__description').text()).toBe(
      'Marlinco, Aug 2012 – Feb 2015; The Alchemedia Project, Feb 2015 – Nov 2016.',
    )
  })

  it('renders only previous roles in the timeline without current-role labeling', () => {
    const wrapper = mount(WorkHistory)

    const timelineRoles = wrapper.findAll('.timeline__role').map(node => node.text())
    const timelineLinks = wrapper.findAll('.timeline__company-link').map(node => node.attributes('href'))
    const timelineContributionItems = wrapper.findAll('.timeline__contribution')

    expect(timelineRoles).toEqual([
      'Lead Software Engineer',
      'Senior Web Developer',
      'IT Programmer',
      'Web Developer Intern',
    ])

    expect(timelineRoles).not.toContain('Director of Engineering')
    expect(wrapper.find('.timeline__badge').exists()).toBe(false)
    expect(timelineLinks).toEqual([
      'https://price.com',
      'https://www.marlinconnections.net/',
      'https://www.srcreman.com/',
      'https://www.marlinconnections.net/',
    ])
    expect(timelineContributionItems).toHaveLength(9)
  })
})
