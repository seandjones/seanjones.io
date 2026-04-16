import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8')
const robotsTxt = readFileSync(join(process.cwd(), 'public/robots.txt'), 'utf8')
const sitemapXml = readFileSync(join(process.cwd(), 'public/sitemap.xml'), 'utf8')

describe('Site metadata and crawler files', () => {
  it('defines canonical and social metadata for SEO quality', () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://seanjones.io/">')
    expect(indexHtml).toContain('<meta name="robots" content="index, follow">')
    expect(indexHtml).toContain('<meta property="og:url" content="https://seanjones.io/">')
    expect(indexHtml).toContain('<meta property="og:image" content="https://seanjones.io/profile-440.webp">')
    expect(indexHtml).toContain('<meta name="twitter:card" content="summary_large_image">')
    expect(indexHtml).toContain('<meta name="twitter:image" content="https://seanjones.io/profile-440.webp">')
    expect(indexHtml).not.toContain('seanjones.io.ai')
  })

  it('provides valid crawler discovery files', () => {
    expect(robotsTxt).toContain('User-agent: *')
    expect(robotsTxt).toContain('Allow: /')
    expect(robotsTxt).toContain('Sitemap: https://seanjones.io/sitemap.xml')
    expect(robotsTxt).not.toContain('seanjones.io.ai')
    expect(sitemapXml).toContain('<loc>https://seanjones.io/</loc>')
    expect(sitemapXml).not.toContain('seanjones.io.ai')
  })
})
