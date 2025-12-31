'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
import { useInteraction } from '@/lib/InteractionIntelligence'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 MOTION HIERARCHY SYSTEM
// Primary (Attention) → Secondary (Feedback) → Tertiary (Ambient)
// ═══════════════════════════════════════════════════════════════════════════════

// LAYER CONFIG
const MOTION_CONFIG = {
  primary: {
    // Attention-grabbing, fast, decisive
    stiffness: 400,
    damping: 25,
    mass: 0.5
  },
  secondary: {
    // Feedback, responsive, confirming
    stiffness: 300,
    damping: 30,
    mass: 0.8
  },
  tertiary: {
    // Ambient, slow, atmospheric
    stiffness: 100,
    damping: 20,
    mass: 1.2
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👁️ ATTENTION MAGNET
// Primary motion - draws and holds visual attention
// ═══════════════════════════════════════════════════════════════════════════════

interface AttentionMagnetProps {
  children: React.ReactNode
  className?: string
  priority?: 'critical' | 'high' | 'normal'
  pulseOnIdle?: boolean
}

export function AttentionMagnet({ 
  children, 
  className = '', 
  priority = 'normal',
  pulseOnIdle = false
}: AttentionMagnetProps) {
  const { state } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const scale = useSpring(1, MOTION_CONFIG.primary)
  const glow = useSpring(0, MOTION_CONFIG.primary)
  const y = useSpring(0, MOTION_CONFIG.primary)

  const priorityScale = { critical: 1.05, high: 1.03, normal: 1.02 }
  const priorityGlow = { critical: 0.8, high: 0.5, normal: 0.3 }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Entrance animation
  useEffect(() => {
    if (isInView) {
      scale.set(priorityScale[priority])
      glow.set(priorityGlow[priority])
      
      setTimeout(() => {
        scale.set(1)
        glow.set(0)
      }, 600)
    }
  }, [isInView, priority, scale, glow])

  // Idle pulse
  useEffect(() => {
    if (pulseOnIdle && state.isIdle && state.idleTime > 3 && isInView) {
      const pulse = () => {
        scale.set(1.02)
        glow.set(0.3)
        setTimeout(() => {
          scale.set(1)
          glow.set(0)
        }, 300)
      }
      
      const interval = setInterval(pulse, 4000)
      return () => clearInterval(interval)
    }
  }, [pulseOnIdle, state.isIdle, state.idleTime, isInView, scale, glow])

  // React to scroll hesitation
  useEffect(() => {
    if (state.scroll.hesitation && isInView) {
      y.set(-5)
      glow.set(0.4)
      setTimeout(() => {
        y.set(0)
        glow.set(0)
      }, 400)
    }
  }, [state.scroll.hesitation, isInView, y, glow])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ scale, y }}
    >
      <motion.div
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          opacity: glow,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)',
          filter: 'blur(20px)'
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 💬 FEEDBACK RIPPLE
// Secondary motion - confirms user actions
// ═══════════════════════════════════════════════════════════════════════════════

interface FeedbackRippleProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function FeedbackRipple({ children, className = '', color = 'rgba(168, 85, 247, 0.3)' }: FeedbackRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setRipples(prev => [...prev, { id: Date.now(), x, y }])
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id))
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              marginLeft: -25,
              marginTop: -25,
              background: color
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌊 AMBIENT WAVE
// Tertiary motion - atmospheric background movement
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientWaveProps {
  className?: string
  color?: string
  intensity?: number
}

export function AmbientWave({ className = '', color = 'rgba(168, 85, 247, 0.03)', intensity = 1 }: AmbientWaveProps) {
  const { state, getInteractionIntensity } = useInteraction()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let animationFrame: number
    let lastTime = 0

    const animate = (time: number) => {
      if (time - lastTime > 50) {
        const interactionIntensity = getInteractionIntensity()
        // Slow down during interaction, speed up during idle
        const speed = state.isIdle ? 0.015 : 0.005 / (1 + interactionIntensity)
        setPhase(prev => prev + speed * intensity)
        lastTime = time
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [state.isIdle, getInteractionIntensity, intensity])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Wave layers */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${50 + Math.sin(phase + i * 2) * 20}% ${50 + Math.cos(phase * 0.7 + i) * 15}%, ${color}, transparent 50%)`,
            opacity: 0.5 - i * 0.15
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DIRECTIONAL REVEAL
// Content reveals based on scroll/approach direction
// ═══════════════════════════════════════════════════════════════════════════════

interface DirectionalRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'auto' | 'up' | 'down' | 'left' | 'right'
}

export function DirectionalReveal({ 
  children, 
  className = '', 
  direction = 'auto' 
}: DirectionalRevealProps) {
  const { state } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [revealDirection, setRevealDirection] = useState<'up' | 'down' | 'left' | 'right'>('up')

  const x = useSpring(0, MOTION_CONFIG.secondary)
  const y = useSpring(0, MOTION_CONFIG.secondary)
  const opacity = useSpring(0, MOTION_CONFIG.secondary)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          // Determine direction based on scroll or specified
          const dir = direction === 'auto' 
            ? (state.scroll.direction === 'down' ? 'up' : 'down')
            : direction
          
          setRevealDirection(dir)
          setHasRevealed(true)

          // Set initial position based on direction
          const offset = 40
          switch (dir) {
            case 'up': y.set(offset); break
            case 'down': y.set(-offset); break
            case 'left': x.set(offset); break
            case 'right': x.set(-offset); break
          }

          // Animate to final position
          requestAnimationFrame(() => {
            x.set(0)
            y.set(0)
            opacity.set(1)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasRevealed, direction, state.scroll.direction, x, y, opacity])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, opacity }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 VELOCITY-AWARE TEXT
// Text animation speed matches scroll velocity
// ═══════════════════════════════════════════════════════════════════════════════

interface VelocityTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function VelocityText({ text, className = '', as: Component = 'p' }: VelocityTextProps) {
  const { state } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [revealProgress, setRevealProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Reveal speed based on scroll velocity
  useEffect(() => {
    if (isInView && revealProgress < 1) {
      const baseSpeed = 0.02
      const velocityBoost = Math.min(state.scroll.velocity * 0.5, 0.3)
      const speed = baseSpeed + velocityBoost
      
      const interval = setInterval(() => {
        setRevealProgress(prev => Math.min(prev + speed, 1))
      }, 16)
      
      return () => clearInterval(interval)
    }
  }, [isInView, revealProgress, state.scroll.velocity])

  const visibleChars = Math.floor(text.length * revealProgress)

  return (
    <div ref={ref} className={className}>
      <Component className="relative">
        {/* Visible text */}
        <span>{text.slice(0, visibleChars)}</span>
        {/* Hidden text for layout */}
        <span className="opacity-0">{text.slice(visibleChars)}</span>
        {/* Cursor */}
        {revealProgress < 1 && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-[1em] bg-primary ml-0.5"
          />
        )}
      </Component>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🧲 CURSOR-FOLLOWING GRADIENT
// Background gradient that subtly follows cursor
// ═══════════════════════════════════════════════════════════════════════════════

interface CursorGradientProps {
  className?: string
  color?: string
  intensity?: number
}

export function CursorGradient({ 
  className = '', 
  color = 'rgba(168, 85, 247, 0.15)',
  intensity = 1
}: CursorGradientProps) {
  const { state } = useInteraction()
  
  const gradientX = useSpring(50, { stiffness: 50, damping: 30 })
  const gradientY = useSpring(50, { stiffness: 50, damping: 30 })
  const gradientSize = useSpring(30, { stiffness: 100, damping: 20 })

  // Follow cursor with lag
  useEffect(() => {
    if (state.device.isMobile) return // Skip on mobile
    
    const xPercent = (state.cursor.x / state.device.viewportWidth) * 100
    const yPercent = (state.cursor.y / state.device.viewportHeight) * 100
    
    gradientX.set(xPercent)
    gradientY.set(yPercent)
    
    // Size based on interaction
    const moving = state.cursor.isMoving
    gradientSize.set(moving ? 35 * intensity : 25 * intensity)
  }, [state.cursor.x, state.cursor.y, state.cursor.isMoving, state.device, gradientX, gradientY, gradientSize, intensity])

  // Don't render on mobile
  if (state.device.isMobile) return null

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: useTransform(
          [gradientX, gradientY, gradientSize],
          ([x, y, size]) => `radial-gradient(circle at ${x}% ${y}%, ${color}, transparent ${size}%)`
        )
      }}
    />
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎪 STAGGER CHILDREN WITH VELOCITY
// Child stagger timing based on scroll velocity
// ═══════════════════════════════════════════════════════════════════════════════

interface VelocityStaggerProps {
  children: React.ReactNode
  className?: string
  baseDelay?: number
}

export function VelocityStagger({ children, className = '', baseDelay = 0.1 }: VelocityStaggerProps) {
  const { state } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Faster stagger when scrolling fast
  const velocityMultiplier = Math.max(0.3, 1 - state.scroll.velocity * 0.5)
  const delay = baseDelay * velocityMultiplier

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: index * delay,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌀 MOMENTUM CARRY
// Elements that carry scroll momentum visually
// ═══════════════════════════════════════════════════════════════════════════════

interface MomentumCarryProps {
  children: React.ReactNode
  className?: string
  sensitivity?: number
}

export function MomentumCarry({ children, className = '', sensitivity = 1 }: MomentumCarryProps) {
  const { state } = useInteraction()
  
  const y = useSpring(0, MOTION_CONFIG.tertiary)
  const rotate = useSpring(0, { stiffness: 80, damping: 15 })

  useEffect(() => {
    // Apply momentum
    const momentumY = state.scroll.momentum * 10 * sensitivity * 
      (state.scroll.direction === 'down' ? -1 : 1)
    
    y.set(momentumY)
    rotate.set(momentumY * 0.1)
    
    // Reset when scrolling stops
    if (!state.scroll.isScrolling) {
      y.set(0)
      rotate.set(0)
    }
  }, [state.scroll.momentum, state.scroll.direction, state.scroll.isScrolling, sensitivity, y, rotate])

  return (
    <motion.div className={className} style={{ y, rotateZ: rotate }}>
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 SECTION AWARENESS
// Section that knows its state in the viewport
// ═══════════════════════════════════════════════════════════════════════════════

interface SectionAwarenessProps {
  children: (props: {
    visibility: number
    isEntering: boolean
    isLeaving: boolean
    position: 'above' | 'in-view' | 'below'
  }) => React.ReactNode
  className?: string
}

export function SectionAwareness({ children, className = '' }: SectionAwarenessProps) {
  const { state } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [visibility, setVisibility] = useState(0)
  const [position, setPosition] = useState<'above' | 'in-view' | 'below'>('below')
  const lastVisibility = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.intersectionRatio)
        
        if (entry.intersectionRatio === 0) {
          const rect = entry.boundingClientRect
          setPosition(rect.top < 0 ? 'above' : 'below')
        } else {
          setPosition('in-view')
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isEntering = visibility > lastVisibility.current && visibility > 0
  const isLeaving = visibility < lastVisibility.current && visibility > 0

  useEffect(() => {
    lastVisibility.current = visibility
  }, [visibility])

  return (
    <div ref={ref} className={className}>
      {children({ visibility, isEntering, isLeaving, position })}
    </div>
  )
}
