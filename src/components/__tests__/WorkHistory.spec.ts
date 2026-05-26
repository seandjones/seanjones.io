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
