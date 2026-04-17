/**
 * Task 11.2 — i18n key parity test
 * Every key in PT must exist in EN and vice versa.
 */
import { describe, it, expect } from 'vitest'
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
