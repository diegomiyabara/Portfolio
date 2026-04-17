/**
 * Task 11.9 — PBT Property 7: theme color pairs meet contrast ratio requirements
 *
 * Validates: Requirements — design token color pairs meet WCAG contrast ratios
 *
 * Color tokens from src/index.css:
 *   background: #0d0d0d
 *   surface:    #141414
 *   primary:    #00d4ff
 *   text:       #e2e8f0
 *   muted:      #64748b
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// WCAG relative luminance & contrast ratio helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  return [r, g, b]
}

function linearize(channel: number): number {
  const c = channel / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ---------------------------------------------------------------------------
// Design token color pairs
// ---------------------------------------------------------------------------
const BACKGROUND = '#0d0d0d'
const TEXT = '#e2e8f0'
const PRIMARY = '#00d4ff'
const MUTED = '#64748b'

// Pairs: [foreground, background, minRatio, description]
const normalTextPairs: Array<[string, string, number, string]> = [
  [TEXT, BACKGROUND, 4.5, 'text on background (normal text)'],
  [PRIMARY, BACKGROUND, 4.5, 'primary on background (normal text)'],
]

const largeTextPairs: Array<[string, string, number, string]> = [
  [MUTED, BACKGROUND, 3.0, 'muted on background (large text / UI component)'],
]

describe('PBT Property 7: theme color pairs meet WCAG contrast ratios', () => {
  it('normal text pairs meet 4.5:1 contrast ratio', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...normalTextPairs),
        ([fg, bg, minRatio, desc]) => {
          const ratio = contrastRatio(fg, bg)
          expect(ratio, `${desc}: ratio ${ratio.toFixed(2)} < ${minRatio}`).toBeGreaterThanOrEqual(minRatio)
          return ratio >= minRatio
        }
      ),
      { numRuns: normalTextPairs.length }
    )
  })

  it('large text / UI component pairs meet 3:1 contrast ratio', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...largeTextPairs),
        ([fg, bg, minRatio, desc]) => {
          const ratio = contrastRatio(fg, bg)
          expect(ratio, `${desc}: ratio ${ratio.toFixed(2)} < ${minRatio}`).toBeGreaterThanOrEqual(minRatio)
          return ratio >= minRatio
        }
      ),
      { numRuns: largeTextPairs.length }
    )
  })

  it('contrast ratio helper is correct for known values', () => {
    // Black on white = 21:1
    const ratio = contrastRatio('#000000', '#ffffff')
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('text on background has high contrast (spot check)', () => {
    const ratio = contrastRatio(TEXT, BACKGROUND)
    expect(ratio).toBeGreaterThan(10)
  })
})
