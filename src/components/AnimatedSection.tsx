import { motion, useReducedMotion } from '../lib/motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  // When reduced motion is preferred, render without any animation.
  // Only opacity and transform (y) are used — both compositor-thread safe.
  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
