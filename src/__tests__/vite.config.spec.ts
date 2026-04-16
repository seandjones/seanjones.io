import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const viteConfigSource = readFileSync(join(process.cwd(), 'vite.config.ts'), 'utf8')

describe('Vite GitHub Pages config', () => {
  it('uses a top-level root base path and no longer misuses base as an alias', () => {
    expect(viteConfigSource).toMatch(/base:\s*'\/'/)
    expect(viteConfigSource).not.toMatch(/alias:\s*\{[\s\S]*base:\s*['"]/)
  })

  it('keeps the src alias configured and limits vue devtools to development', () => {
    expect(viteConfigSource).toMatch(/alias:\s*\{[\s\S]*'@':\s*fileURLToPath\(new URL\('\.\/src', import\.meta\.url\)\)/)
    expect(viteConfigSource).toMatch(/mode\s*===\s*'development'\s*\?\s*\[vueDevTools\(\)\]\s*:\s*\[\]/)
  })
})
