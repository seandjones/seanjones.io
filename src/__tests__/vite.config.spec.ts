import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const viteConfigSource = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8')

describe('Vite GitHub Pages config', () => {
  it('uses the GitHub Pages repo base at the top level for production builds', () => {
    expect(viteConfigSource).toMatch(/base:\s*mode\s*===\s*'production'\s*\?\s*'\/seanjones\.io\.ai\/'\s*:\s*'\/'/)
  })

  it('keeps the src alias configured and does not misuse base as an alias', () => {
    expect(viteConfigSource).toMatch(/alias:\s*\{[\s\S]*'@':\s*fileURLToPath\(new URL\('\.\/src', import\.meta\.url\)\)/)
    expect(viteConfigSource).not.toMatch(/alias:\s*\{[\s\S]*base:\s*['"]/)
  })
})
