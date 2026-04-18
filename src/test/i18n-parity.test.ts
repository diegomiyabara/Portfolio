/**
 * Task 11.2 — i18n key parity test
 * Every key in PT must exist in EN and vice versa.
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import enJSON from '../i18n/locales/en.json'
import ptJSON from '../i18n/locales/pt.json'

function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      return collectKeys(value as Record<string, unknown>, fullKey)
    }
    return [fullKey]
  })
}

describe('i18n key parity', () => {
  const enKeys = collectKeys(enJSON as unknown as Record<string, unknown>)
  const ptKeys = collectKeys(ptJSON as unknown as Record<string, unknown>)

  it('every PT key exists in EN', () => {
    const missing = ptKeys.filter((k) => !enKeys.includes(k))
    expect(missing).toEqual([])
  })

  it('every EN key exists in PT', () => {
    const missing = enKeys.filter((k) => !ptKeys.includes(k))
    expect(missing).toEqual([])
  })

  it('both locales have the same number of keys', () => {
    expect(enKeys.length).toBe(ptKeys.length)
  })
})

// Feature: portfolio-visual-content, Property 8: Paridade i18n dos campos de projeto
describe('Property 8: Paridade i18n dos campos de projeto', () => {
  // **Validates: Requirements 4.2**
  type ProjectItem = Record<string, unknown>

  const ptProjects = (ptJSON as { projects: { items: ProjectItem[] } }).projects.items
  const enProjects = (enJSON as { projects: { items: ProjectItem[] } }).projects.items

  function collectProjectKeys(item: ProjectItem): string[] {
    return Object.entries(item).flatMap(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        // For arrays of objects (e.g. links), collect keys from each element
        const nestedKeys = (value as ProjectItem[]).flatMap((el) =>
          Object.keys(el).map((k) => `${key}[].${k}`)
        )
        return [key, ...nestedKeys]
      }
      return [key]
    })
  }

  it('pt and en have the same number of project items', () => {
    expect(enProjects.length).toBe(ptProjects.length)
  })

  it('for any project index, pt and en project items have the same field keys', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: ptProjects.length - 1 }),
        (index) => {
          const ptItem = ptProjects[index]
          const enItem = enProjects[index]

          const ptKeys = collectProjectKeys(ptItem).sort()
          const enKeys = collectProjectKeys(enItem).sort()

          expect(ptKeys).toEqual(enKeys)
        }
      ),
      { numRuns: 100 }
    )
  })
})
