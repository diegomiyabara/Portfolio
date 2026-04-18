import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactNode } from 'react'
import * as FramerMotion from 'framer-motion'

type GenericMotionProps = Record<string, unknown> & {
  children?: ReactNode
}

type MotionValueLike<T> = {
  get: () => T
  set: (value: T) => void
}

const fallbackMotionComponents = new Map<string, ReturnType<typeof forwardRef<Element, GenericMotionProps>>>()

function stripMotionProps(props: GenericMotionProps) {
  const {
    animate,
    exit,
    initial,
    layout,
    layoutId,
    transition,
    variants,
    viewport,
    whileHover,
    whileInView,
    whileTap,
    ...rest
  } = props

  void animate
  void exit
  void initial
  void layout
  void layoutId
  void transition
  void variants
  void viewport
  void whileHover
  void whileInView
  void whileTap

  return rest
}

function getFallbackMotionComponent(tag: string) {
  const cached = fallbackMotionComponents.get(tag)
  if (cached) return cached

  const component = forwardRef(function MotionFallback(
    { children, ...props }: GenericMotionProps,
    ref: ForwardedRef<Element>
  ) {
    const safeProps = stripMotionProps(props)
    return createElement(tag as ElementType, { ...safeProps, ref }, children)
  })

  fallbackMotionComponents.set(tag, component)
  return component
}

const baseMotion =
  'motion' in FramerMotion
    ? ((FramerMotion as unknown as { motion: Record<string, unknown> }).motion ?? {})
    : {}

export const motion = new Proxy(baseMotion, {
  get(target, property, receiver) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property, receiver)
    }

    if (typeof property === 'string') {
      return getFallbackMotionComponent(property)
    }

    return undefined
  },
}) as unknown as typeof FramerMotion.motion

export const AnimatePresence =
  ('AnimatePresence' in FramerMotion ? FramerMotion.AnimatePresence : undefined) ??
  function AnimatePresenceFallback({ children }: { children: ReactNode }) {
    return <>{children}</>
  }

export const useReducedMotion =
  ('useReducedMotion' in FramerMotion ? FramerMotion.useReducedMotion : undefined) ??
  function useReducedMotionFallback() {
    return false
  }

export function useMotionValue<T>(initial: T) {
  const hook =
    'useMotionValue' in FramerMotion
      ? (FramerMotion as unknown as { useMotionValue: (value: T) => unknown }).useMotionValue
      : undefined

  if (hook) {
    return hook(initial)
  }

  let current = initial
  return {
    get: () => current,
    set: (value: T) => {
      current = value
    },
  } satisfies MotionValueLike<T>
}

export function useTransform(
  value: unknown,
  inputRange: number[],
  outputRange: number[]
) {
  const hook =
    'useTransform' in FramerMotion
      ? (FramerMotion as unknown as {
          useTransform: (source: unknown, input: number[], output: number[]) => unknown
        }).useTransform
      : undefined

  if (hook) {
    return hook(value, inputRange, outputRange)
  }

  return outputRange[0] ?? 0
}

export function useScroll(options?: unknown) {
  const hook =
    'useScroll' in FramerMotion
      ? (FramerMotion as unknown as {
          useScroll: (config?: unknown) => { scrollYProgress: unknown }
        }).useScroll
      : undefined

  if (hook) {
    return hook(options)
  }

  return { scrollYProgress: 0 }
}
