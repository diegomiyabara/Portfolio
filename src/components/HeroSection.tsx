import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion'
import heroImg from '../assets/hero.png'

const btnPrimaryVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 0.92 },
  tap: { scale: 0.97 },
}

const btnOutlineVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.05, opacity: 0.85 },
  tap: { scale: 0.97 },
}

export default function HeroSection() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const bgX = useTransform(mouseX, [0, 1], [-24, 24])
  const bgY = useTransform(mouseY, [0, 1], [-16, 16])
  const accentX = useTransform(mouseX, [0, 1], [18, -18])
  const accentY = useTransform(mouseY, [0, 1], [-12, 12])

  const handlePointerMove = (event: any) => {
    if (shouldReduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    mouseX.set(x)
    mouseY.set(y)
  }

  const textVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  const photoVariants = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex h-full min-h-full w-full items-center justify-center overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 w-screen left-1/2 -translate-x-1/2"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          filter: 'blur(40px) brightness(0.45)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.16),transparent_30%)]" />

      <motion.div
        className="pointer-events-none absolute left-8 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        style={shouldReduceMotion ? undefined : { x: bgX, y: bgY }}
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-secondary/15 blur-3xl"
        style={shouldReduceMotion ? undefined : { x: accentX, y: accentY }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-0">
        <motion.div
          className="flex-1 text-center md:text-left"
          onPointerMove={handlePointerMove}
          variants={textVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            {t('hero.badge')}
          </div>

          <p className="text-muted text-lg mb-2">{t('hero.greeting')}</p>
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl md:text-6xl">
            {t('hero.name')}
          </h1>
          <p className="text-primary font-semibold text-xl md:text-2xl mb-4">
            {t('hero.title')}
          </p>
          <p className="text-muted text-sm font-mono mb-8 tracking-widest uppercase">
            {t('hero.subtitle')}
          </p>
          <p className="mx-auto max-w-2xl text-muted text-base leading-relaxed md:mx-0 md:text-lg">
            {t('hero.tagline')}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-primary/20 bg-background/70 p-4 text-left shadow-xl shadow-primary/5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/80">Impacto</p>
              <p className="mt-2 text-lg font-semibold text-text">5 anos</p>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-background/70 p-4 text-left shadow-xl shadow-primary/5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/80">Tech stack</p>
              <p className="mt-2 text-lg font-semibold text-text">React · TypeScript</p>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-background/70 p-4 text-left shadow-xl shadow-primary/5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/80">Foco</p>
              <p className="mt-2 text-lg font-semibold text-text">E-commerce & Web</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-start">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-background transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              variants={shouldReduceMotion ? undefined : btnPrimaryVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.15 }}
            >
              {t('hero.ctaContact')}
            </motion.a>
            <motion.a
              href="https://github.com/diegomiyabara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-background/80 px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              variants={shouldReduceMotion ? undefined : btnOutlineVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.15 }}
            >
              {t('hero.ctaGithub')}
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          variants={photoVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface/90 p-6 shadow-2xl shadow-primary/10 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border-2 border-primary/30 bg-surface/80 shadow-xl shadow-black/20">
              <img
                src={heroImg}
                alt={t('hero.photoAlt')}
                className="h-72 w-72 rounded-full object-cover"
              />
            </div>
            <div className="relative mt-8 space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70">Perfil</p>
              <p className="text-lg font-semibold text-text">{t('hero.title')}</p>
              <p className="mx-auto max-w-xs text-muted text-sm leading-relaxed">{t('hero.subtitle')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
