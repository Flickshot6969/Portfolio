'use client'

import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 SCROLL DRAMA ENGINE
// Scroll storytelling - every pixel scrolled advances the narrative
// Parallax depth, velocity effects, choreographed reveals, section awareness
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 📊 SCROLL CONTEXT - Global scroll state for all components
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollContextValue {
  scrollY: MotionValue<number>
  scrollYProgress: MotionValue<number>
  velocity: MotionValue<number>
  direction: 'up' | 'down' | 'idle'
  isScrolling: boolean
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function useScrollDrama() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScrollDrama must be used within ScrollDramaProvider')
  }
  return context
}

export function ScrollDramaProvider({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll()
  const velocity = useMotionValue(0)
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle')
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const delta = latest - lastScrollY.current
      velocity.set(delta)
      
      if (delta > 0) setDirection('down')
      else if (delta < 0) setDirection('up')
      
      setIsScrolling(true)
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        setDirection('idle')
        velocity.set(0)
      }, 150)
      
      lastScrollY.current = latest
    })
  }, [scrollY, velocity])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollYProgress, velocity, direction, isScrolling }}>
      {children}
    </ScrollContext.Provider>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌊 PARALLAX LAYER - Elements that move at different speeds
// ───────────────────────────────────────────────────────────────────────────────

interface ParallaxLayerProps {
  children: React.ReactNode
  speed?: number // 0 = static, 1 = scroll speed, >1 = faster, <1 = slower
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = '' 
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const range = [-100 * speed, 100 * speed]
  const transform = useTransform(scrollYProgress, [0, 1], range)
  const smoothTransform = useSpring(transform, { stiffness: 100, damping: 30 })

  const style = direction === 'vertical' 
    ? { y: smoothTransform }
    : { x: smoothTransform }

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎭 SCROLL REVEAL - Elements that reveal based on scroll position
// ───────────────────────────────────────────────────────────────────────────────

type RevealVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'blur'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  once = true,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, threshold])

  const variants = {
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -60, filter: 'blur(10px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 60, filter: 'blur(10px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
    },
    'rotate': {
      hidden: { opacity: 0, rotate: -10, y: 30 },
      visible: { opacity: 1, rotate: 0, y: 0 }
    },
    'blur': {
      hidden: { opacity: 0, filter: 'blur(20px)' },
      visible: { opacity: 1, filter: 'blur(0px)' }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📜 SCROLL PROGRESS SECTION - Animated based on scroll through section
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollProgressSectionProps {
  children: (progress: MotionValue<number>) => React.ReactNode
  className?: string
  offset?: ['start' | 'end' | 'center', 'start' | 'end' | 'center'][]
}

export function ScrollProgressSection({
  children,
  className = '',
  offset = [['start', 'end'], ['end', 'start']]
}: ScrollProgressSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset.map(o => o.join(' ')) as any
  })

  return (
    <div ref={ref} className={className}>
      {children(scrollYProgress)}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎬 CINEMATIC SCROLL SECTION - Full storytelling section
// ───────────────────────────────────────────────────────────────────────────────

interface CinematicScrollSectionProps {
  children: React.ReactNode
  className?: string
  bgColor?: string
  parallaxIntensity?: number
}

export function CinematicScrollSection({
  children,
  className = '',
  bgColor,
  parallaxIntensity = 0.5
}: CinematicScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Create multiple transform effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  const y = useTransform(scrollYProgress, [0, 1], [100 * parallaxIntensity, -100 * parallaxIntensity])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10])

  // Smooth springs
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.section
      ref={ref}
      className={`relative ${className}`}
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY,
        backgroundColor: bgColor
      }}
    >
      {children}
    </motion.section>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ⚡ VELOCITY BLUR - Elements blur based on scroll speed
// ───────────────────────────────────────────────────────────────────────────────

interface VelocityBlurProps {
  children: React.ReactNode
  maxBlur?: number
  className?: string
}

export function VelocityBlur({ children, maxBlur = 5, className = '' }: VelocityBlurProps) {
  const [blur, setBlur] = useState(0)
  const blurSpring = useSpring(0, { stiffness: 100, damping: 20 })
  
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const velocity = Math.abs(window.scrollY - lastScrollY)
          const blurAmount = Math.min(velocity * 0.1, maxBlur)
          blurSpring.set(blurAmount)
          lastScrollY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxBlur, blurSpring])

  return (
    <motion.div 
      className={className}
      style={{ filter: useTransform(blurSpring, v => `blur(${v}px)`) }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎪 STAGGERED REVEAL - Children reveal one by one as section scrolls in
// ───────────────────────────────────────────────────────────────────────────────

interface StaggeredRevealProps {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
  childClassName?: string
}

export function StaggeredReveal({
  children,
  staggerDelay = 0.1,
  className = '',
  childClassName = ''
}: StaggeredRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          className={childClassName}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            delay: i * staggerDelay,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌌 DEPTH LAYERS - Multiple background layers with parallax
// ───────────────────────────────────────────────────────────────────────────────

interface DepthLayer {
  content: React.ReactNode
  speed: number
  opacity?: number
  zIndex?: number
}

interface DepthLayersProps {
  layers: DepthLayer[]
  children: React.ReactNode
  className?: string
}

export function DepthLayers({ layers, children, className = '' }: DepthLayersProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Background layers */}
      {layers.map((layer, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -200 * layer.speed])
        const smoothY = useSpring(y, { stiffness: 50, damping: 30 })
        
        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              y: smoothY,
              opacity: layer.opacity ?? 1,
              zIndex: layer.zIndex ?? i
            }}
          >
            {layer.content}
          </motion.div>
        )
      })}
      
      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📖 SCROLL TIMELINE - Execute callbacks at specific scroll positions
// ───────────────────────────────────────────────────────────────────────────────

interface TimelineEvent {
  progress: number // 0-1
  onEnter?: () => void
  onLeave?: () => void
}

interface ScrollTimelineProps {
  children: React.ReactNode
  events: TimelineEvent[]
  className?: string
}

export function ScrollTimeline({ children, events, className = '' }: ScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const triggeredEvents = useRef<Set<number>>(new Set())

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      events.forEach((event, i) => {
        const wasTriggered = triggeredEvents.current.has(i)
        const shouldTrigger = latest >= event.progress

        if (shouldTrigger && !wasTriggered) {
          event.onEnter?.()
          triggeredEvents.current.add(i)
        } else if (!shouldTrigger && wasTriggered) {
          event.onLeave?.()
          triggeredEvents.current.delete(i)
        }
      })
    })
  }, [scrollYProgress, events])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎯 SCROLL SNAP SECTION - Sections that snap into view
// ───────────────────────────────────────────────────────────────────────────────

export function ScrollSnapContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div 
      className={`snap-y snap-mandatory overflow-y-auto h-screen ${className}`}
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {children}
    </div>
  )
}

export function ScrollSnapSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div 
      className={`snap-start min-h-screen ${className}`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {children}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌀 SCROLL MORPH - Element properties morph based on scroll
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollMorphProps {
  children: React.ReactNode
  from: { [key: string]: any }
  to: { [key: string]: any }
  className?: string
}

export function ScrollMorph({ children, from, to, className = '' }: ScrollMorphProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const style: { [key: string]: MotionValue<any> } = {}
  
  Object.keys(from).forEach(key => {
    if (to[key] !== undefined) {
      style[key] = useTransform(scrollYProgress, [0, 1], [from[key], to[key]])
    }
  })

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  )
}

export default {
  ScrollDramaProvider,
  useScrollDrama,
  ParallaxLayer,
  ScrollReveal,
  ScrollProgressSection,
  CinematicScrollSection,
  VelocityBlur,
  StaggeredReveal,
  DepthLayers,
  ScrollTimeline,
  ScrollSnapContainer,
  ScrollSnapSection,
  ScrollMorph
}
