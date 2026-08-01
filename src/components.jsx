import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import {
  FiMenu, FiX, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin,
  FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiExternalLink,
  FiCode, FiLayout, FiServer, FiDatabase, FiCpu, FiTool, FiBook,
} from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { profile, navLinks } from './data.js'

/* ---------------------------------------------------------
   Scroll progress bar
--------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-500"
    />
  )
}

/* ---------------------------------------------------------
   Mouse glow — follows cursor, ambient only
--------------------------------------------------------- */
export function MouseGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  const background = useTransform([x, y], ([lx, ly]) =>
    `radial-gradient(600px circle at ${lx}px ${ly}px, rgba(52,216,198,0.07), transparent 65%)`
  )

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{ background }}
    />
  )
}

/* ---------------------------------------------------------
   Ambient background: grid overlay + blobs + scanline
--------------------------------------------------------- */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base-900">
      <div className="absolute inset-0 grid-overlay opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute -top-40 -left-32 w-[32rem] h-[32rem] bg-teal-500/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-amber-500/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '8s' }} />
      <div className="absolute inset-0 noise mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-900" />
    </div>
  )
}

/* ---------------------------------------------------------
   Section wrapper — consistent reveal + spacing
--------------------------------------------------------- */
export function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 md:px-10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-14 md:mb-16"
          >
            {eyebrow && (
              <span className="font-mono text-xs tracking-widest text-teal-400 uppercase">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink-100 mt-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-ink-500 mt-4 max-w-2xl text-base md:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------
   Navbar
--------------------------------------------------------- */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <nav className={`max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/20' : ''} py-3`}>
        <a href="#hero" className="font-display font-semibold text-lg text-ink-100 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-base-950 font-mono text-sm font-bold">S</span>
          <span className="hidden sm:inline">Sithishwar<span className="text-teal-400">.</span></span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-300 hover:text-teal-400 transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={profile.resumeFile}
          download
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-2 text-sm font-medium hover:bg-teal-500/20 transition-colors"
        >
          <FiDownload size={15} /> Resume
        </a>

        <button
          className="md:hidden text-ink-100 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-300 hover:text-teal-400 py-2.5 px-2 text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={profile.resumeFile}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 px-4 py-2.5 text-sm font-medium"
              >
                <FiDownload size={15} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-10 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent animate-scan" />
      </div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.3fr,1fr] gap-14 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-teal-300 border border-teal-500/25 bg-teal-500/5 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            open to software engineering roles
          </motion.div>

          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.06] text-ink-100">
            {['I build systems that', 'find the signal'].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: 'easeOut' }}
              className="block text-gradient"
            >
              in the noise.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-ink-500 text-lg mt-7 max-w-xl leading-relaxed"
          >
            {profile.name} — Information Technology undergraduate at College of Engineering, Guindy,
            building full-stack, geospatial, and computer-vision systems from database to deployed UI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="flex flex-wrap gap-3 mt-9"
          >
            <a
              href={profile.resumeFile}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-base-950 font-semibold px-6 py-3 text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5"
            >
              <FiDownload size={16} /> Download Résumé
            </a>
            <a
              href={profile.github}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass text-ink-100 font-medium px-6 py-3 text-sm hover:border-teal-400/40 transition-all hover:-translate-y-0.5"
            >
              <FiGithub size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass text-ink-100 font-medium px-6 py-3 text-sm hover:border-teal-400/40 transition-all hover:-translate-y-0.5"
            >
              <FiLinkedin size={16} /> LinkedIn
            </a>
            <a
              href={profile.leetcode}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass text-ink-100 font-medium px-6 py-3 text-sm hover:border-teal-400/40 transition-all hover:-translate-y-0.5"
            >
              <SiLeetcode size={16} /> LeetCode
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="glass rounded-3xl p-6 font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/40 animate-float">
            <div className="flex gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400/60" />
            </div>
            <p className="text-ink-500">// currently building</p>
            <p className="mt-1"><span className="text-indigo-400">const</span> <span className="text-teal-300">engineer</span> = {'{'}</p>
            <p className="pl-4">stack: <span className="text-amber-400">['React','Node','PostgreSQL']</span>,</p>
            <p className="pl-4">focus: <span className="text-amber-400">'geo + vision systems'</span>,</p>
            <p className="pl-4">cgpa: <span className="text-teal-300">8.26</span>,</p>
            <p>{'}'}</p>
            <p className="mt-3 text-ink-500">// status</p>
            <p><span className="text-teal-400">✓</span> shipping projects that scale</p>
          </div>
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-5 py-4 shadow-xl animate-float-slow">
            <p className="font-mono text-2xl font-bold text-gradient">4+</p>
            <p className="text-xs text-ink-500 mt-0.5">systems shipped</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------
   About
--------------------------------------------------------- */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="Behind the code">
      <div className="grid md:grid-cols-[1fr,1fr] gap-12 items-start">
        <div className="space-y-5">
          {profile.about.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-ink-300 leading-relaxed text-[1.05rem]"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 space-y-4 font-mono text-sm"
        >
          <InfoRow icon={<FiMapPin size={16} />} label="Location" value={profile.location} />
          <InfoRow icon={<FiMail size={16} />} label="Email" value={profile.email} />
          <InfoRow icon={<FiPhone size={16} />} label="Phone" value={profile.phone} />
          <InfoRow icon={<FiCode size={16} />} label="Focus" value="Full-stack · Geo · CV" />
        </motion.div>
      </div>
    </Section>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-base-600 last:border-0 last:pb-0">
      <span className="text-teal-400">{icon}</span>
      <div>
        <p className="text-ink-700 text-[11px] uppercase tracking-wide">{label}</p>
        <p className="text-ink-100 mt-0.5">{value}</p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------
   Skills
--------------------------------------------------------- */
const skillIconMap = { code: FiCode, layout: FiLayout, server: FiServer, database: FiDatabase, cpu: FiCpu, tool: FiTool, book: FiBook }

export function Skills({ groups }) {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolkit" subtitle="The languages, frameworks, and systems I reach for most.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => {
          const Icon = skillIconMap[g.icon] || FiCode
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 group hover:border-teal-400/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:bg-teal-500/20 transition-colors">
                <Icon size={18} />
              </div>
              <h3 className="font-display font-semibold text-ink-100 mb-3">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="font-mono text-xs px-2.5 py-1 rounded-md bg-base-700/60 text-ink-300 border border-base-600">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Project Card w/ tilt
--------------------------------------------------------- */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 6)
    rx.set(-py * 6)
  }
  const handleLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-teal-500/40 via-base-600 to-indigo-500/30 h-full"
      >
        <div className="glass rounded-3xl p-7 md:p-8 h-full flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest text-teal-400 uppercase">{project.tag}</span>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-ink-100 mt-2">{project.title}</h3>
              <p className="font-mono text-xs text-ink-700 mt-1">{project.period}</p>
            </div>
          </div>

          <p className="text-ink-300 leading-relaxed mb-5">{project.description}</p>

          <div className="mb-5">
            <p className="text-ink-700 text-xs uppercase tracking-wide font-mono mb-2">Key Features</p>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-ink-300">
                  <span className="text-teal-400 mt-1.5 w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl bg-base-800/60 border border-base-600 p-3.5">
              <p className="text-ink-700 text-[11px] uppercase tracking-wide font-mono mb-1">What I built</p>
              <p className="text-ink-300 text-sm leading-relaxed">{project.builtWhat}</p>
            </div>
            <div className="rounded-xl bg-base-800/60 border border-base-600 p-3.5">
              <p className="text-ink-700 text-[11px] uppercase tracking-wide font-mono mb-1">Challenge</p>
              <p className="text-ink-300 text-sm leading-relaxed">{project.challenge}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-teal-500/8 text-teal-300 border border-teal-500/20">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-3 pt-2 border-t border-base-600">
            <a
              href={project.github}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 hover:text-teal-400 transition-colors pt-4"
            >
              <FiGithub size={15} /> Code <FiArrowUpRight size={13} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 hover:text-teal-400 transition-colors pt-4"
              >
                <FiExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects({ projects }) {
  return (
    <Section id="projects" eyebrow="Selected Work" title="Projects" subtitle="Four systems, four different problems — marketplaces, genomics, personal finance, and computer vision.">
      <div className="grid md:grid-cols-2 gap-7">
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   More Project Card w/ tilt (compact variant)
--------------------------------------------------------- */
function MoreProjectCard({ project, index }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 6)
    rx.set(-py * 6)
  }
  const handleLeave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-teal-500/40 via-base-600 to-indigo-500/30 h-full"
      >
        <div className="glass rounded-3xl p-7 md:p-8 h-full flex flex-col">
          <div className="mb-4">
            <span className="font-mono text-[11px] tracking-widest text-teal-400 uppercase">{project.tag}</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-ink-100 mt-2">{project.title}</h3>
          </div>

          <p className="text-ink-300 leading-relaxed mb-5">{project.description}</p>

          <div className="rounded-xl bg-base-800/60 border border-base-600 p-3.5 mb-5">
            <p className="text-ink-700 text-[11px] uppercase tracking-wide font-mono mb-1">What I built</p>
            <p className="text-ink-300 text-sm leading-relaxed">{project.builtWhat}</p>
          </div>

          <div className="mb-5">
            <p className="text-ink-700 text-xs uppercase tracking-wide font-mono mb-2">Key Highlights</p>
            <ul className="space-y-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-ink-300">
                  <span className="text-teal-400 mt-1.5 w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-teal-500/8 text-teal-300 border border-teal-500/20">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-3 pt-2 border-t border-base-600">
            <a
              href={project.github}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 hover:text-teal-400 transition-colors pt-4"
            >
              <FiGithub size={15} /> Code <FiArrowUpRight size={13} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-100 hover:text-teal-400 transition-colors pt-4"
              >
                <FiExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MoreProjects({ projects }) {
  return (
    <Section id="more-projects" eyebrow="Additional Work" title="More Projects" subtitle="Additional software engineering, operating systems, machine learning, and data structures projects demonstrating technical breadth.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((p, i) => <MoreProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Achievements — animated counters
--------------------------------------------------------- */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const isInView = useRef(false)

  useEffect(() => {
    const target = parseFloat(value)
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView.current) {
        isInView.current = true
        const controls = animate(0, target, {
          duration: 1.6,
          ease: 'easeOut',
          onUpdate: (v) => setDisplay(Number.isInteger(target) ? Math.round(v).toString() : v.toFixed(2)),
        })
        return () => controls.stop()
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{display}{suffix}</span>
}

export function Achievements({ items }) {
  return (
    <Section id="achievements" eyebrow="By the numbers" title="Achievements">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-7 text-center hover:border-teal-400/30 transition-colors"
          >
            <p className="font-display text-4xl md:text-5xl font-bold text-gradient font-mono">
              <Counter value={a.value} suffix={a.value.includes('.') ? '' : ''} />
              {a.label.includes('%') || a.value === '95.1' ? '%' : ''}
            </p>
            <p className="text-ink-100 font-medium mt-3">{a.label}</p>
            <p className="text-ink-700 text-xs mt-1">{a.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Leadership timeline
--------------------------------------------------------- */
export function Leadership({ items }) {
  return (
    <Section id="leadership" eyebrow="Beyond code" title="Leadership & Activities">
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/50 via-base-600 to-transparent" />
        <div className="space-y-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-8 md:-left-10 top-1.5 w-4 h-4 rounded-full bg-base-900 border-2 border-teal-400 shadow-[0_0_12px_rgba(52,216,198,0.5)]" />
              <div className="glass rounded-2xl p-5 md:p-6">
                <h3 className="font-display font-semibold text-ink-100 text-lg">{item.title}</h3>
                <p className="font-mono text-xs text-teal-400 mt-1">{item.org}</p>
                <p className="text-ink-500 text-sm mt-2.5 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Education
--------------------------------------------------------- */
export function Education({ items }) {
  return (
    <Section id="education" eyebrow="Foundation" title="Education">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-7 hover:border-teal-400/30 transition-colors"
          >
            <h3 className="font-display font-semibold text-lg text-ink-100">{e.degree}</h3>
            <p className="text-ink-500 mt-1.5">{e.institute}</p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-base-600">
              <span className="font-mono text-teal-400 font-semibold">{e.score}</span>
              {e.period && <span className="text-ink-700 text-xs">{e.period}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Coding profiles
--------------------------------------------------------- */
export function CodingProfiles({ profiles }) {
  return (
    <Section id="profiles" eyebrow="Find me online" title="Coding Profiles">
      <div className="grid sm:grid-cols-3 gap-5">
        {profiles.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-7 group hover:border-teal-400/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                  <Icon size={20} />
                </div>
                <FiArrowUpRight className="text-ink-700 group-hover:text-teal-400 group-hover:rotate-45 transition-all" size={18} />
              </div>
              <h3 className="font-display font-semibold text-ink-100 mt-4">{p.name}</h3>
              <p className="font-mono text-xs text-teal-400 mt-1">{p.handle}</p>
              <p className="text-ink-500 text-sm mt-3 leading-relaxed">{p.description}</p>
            </motion.a>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Resume download banner
--------------------------------------------------------- */
export function ResumeBanner() {
  return (
    <Section id="resume" className="!py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden glass p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10" />
        <div className="relative">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink-100">Want the full picture?</h3>
          <p className="text-ink-500 mt-2">Grab the complete résumé — one PDF, every detail.</p>
        </div>
        <a
          href={profile.resumeFile}
          download
          className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 text-base-950 font-semibold px-7 py-3.5 text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all hover:-translate-y-0.5 shrink-0"
        >
          <FiDownload size={16} /> Download Résumé (PDF)
        </a>
      </motion.div>
    </Section>
  )
}

/* ---------------------------------------------------------
   Contact
--------------------------------------------------------- */
export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Section id="contact" eyebrow="Get in touch" title="Let's build something" subtitle="Open to software engineering internships and full-time roles. Reach out directly or send a message below.">
      <div className="grid md:grid-cols-[1fr,1.2fr] gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <ContactLink icon={<FiMail size={17} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <ContactLink icon={<FiPhone size={17} />} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
          <ContactLink icon={<FiMapPin size={17} />} label="Location" value={profile.location} />
          <div className="flex gap-3 pt-2">
            {[
              { icon: FiGithub, href: profile.github },
              { icon: FiLinkedin, href: profile.linkedin },
              { icon: SiLeetcode, href: profile.leetcode },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl glass flex items-center justify-center text-ink-300 hover:text-teal-400 hover:border-teal-400/40 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 md:p-7 space-y-4"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <FiCheckCircle className="text-teal-400 mb-3" size={40} />
                <p className="text-ink-100 font-semibold text-lg">Message ready to send</p>
                <p className="text-ink-500 text-sm mt-1">Thanks for reaching out — I'll reply soon.</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="space-y-4">
                <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
                <div>
                  <label className="text-xs font-mono uppercase tracking-wide text-ink-700 mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the role or project..."
                    className="w-full rounded-xl bg-base-800/70 border border-base-600 px-4 py-3 text-ink-100 text-sm placeholder:text-ink-700 focus:border-teal-400/50 outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-base-950 font-semibold px-6 py-3.5 text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all"
                >
                  <FiSend size={15} /> Send Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </Section>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-wide text-ink-700 mb-1.5 block">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-base-800/70 border border-base-600 px-4 py-3 text-ink-100 text-sm placeholder:text-ink-700 focus:border-teal-400/50 outline-none transition-colors"
      />
    </div>
  )
}

function ContactLink({ icon, label, value, href }) {
  const content = (
    <div className="glass rounded-xl p-4 flex items-center gap-4 hover:border-teal-400/30 transition-colors">
      <span className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-ink-700 text-[11px] uppercase tracking-wide font-mono">{label}</p>
        <p className="text-ink-100 text-sm mt-0.5 truncate">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href} className="block">{content}</a> : content
}

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */
export function Footer() {
  return (
    <footer className="relative border-t border-base-600 px-6 md:px-10 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-ink-700 text-sm font-mono">
          Designed &amp; Built by <span className="text-teal-400">{profile.name}</span>
        </p>
        <p className="text-ink-700 text-xs">© {new Date().getFullYear()} · All rights reserved.</p>
      </div>
    </footer>
  )
}
