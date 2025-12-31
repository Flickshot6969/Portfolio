'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useAnimationFrame } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 CINEMATIC MOTION LAYER
// Motion as infrastructure — Primary / Secondary / Tertiary hierarchy
// Every element has: ENTRY → IDLE → INTERACTION → EXIT behaviors
// ═══════════════════════════════════════════════════════════════════════════════

// TIMING CURVES - Cinematic, not generic
const TIMING = {
  // Dramatic entrance (slow start, quick middle, elegant settle)
  dramatic: [0.16, 1, 0.3, 1] as const,
  // Snappy interaction (immediate response, natural settle)
  snappy: [0.34, 1.56, 0.64, 1] as const,
  // Smooth continuous (butter, no stops)
  smooth: [0.4, 0, 0.2, 1] as const,
  // Elastic bounce (playful overshoot)
  elastic: [0.68, -0.6, 0.32, 1.6] as const,
  // Heavy settle (weight, gravity)
  heavy: [0.6, 0.05, 0.01, 0.9] as const,
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 OVER-ENGINEERED BUTTON
// States: dormant → approach → hover → press → ripple → release → settle
// ═══════════════════════════════════════════════════════════════════════════════

type ButtonState = 'dormant' | 'approach' | 'hover' | 'press' | 'ripple' | 'release' | 'settle'

interface CinematicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function CinematicButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false
}: CinematicButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [state, setState] = useState<ButtonState>('dormant')
  const [rippleOrigin, setRippleOrigin] = useState({ x: 50, y: 50 })
  const mousePos = useRef({ x: 0, y: 0 })
  
  // Multi-layer spring system
  const outerScale = useSpring(1, { stiffness: 400, damping: 25 })
  const innerScale = useSpring(1, { stiffness: 500, damping: 20 })
  const backgroundScale = useSpring(1, { stiffness: 300, damping: 30 })
  const glowIntensity = useSpring(0, { stiffness: 200, damping: 25 })
  const magnetX = useSpring(0, { stiffness: 150, damping: 15 })
  const magnetY = useSpring(0, { stiffness: 150, damping: 15 })
  const shimmerPos = useSpring(0, { stiffness: 100, damping: 30 })
  const depthShadow = useSpring(0, { stiffness: 300, damping: 25 })
  const borderGlow = useSpring(0, { stiffness: 250, damping: 20 })

  // Proximity detection for anticipatory response
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || disabled) return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      )
      
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // APPROACH STATE - Button awakens before hover
      if (distance < 150 && state === 'dormant') {
        setState('approach')
        outerScale.set(1.02)
        glowIntensity.set(0.2)
        borderGlow.set(0.3)
      } else if (distance >= 150 && state === 'approach') {
        setState('dormant')
        outerScale.set(1)
        glowIntensity.set(0)
        borderGlow.set(0)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [state, disabled, outerScale, glowIntensity, borderGlow])

  const handleMouseEnter = () => {
    if (disabled) return
    setState('hover')
    outerScale.set(1.04)
    innerScale.set(1.02)
    glowIntensity.set(0.5)
    shimmerPos.set(100)
    depthShadow.set(1)
    borderGlow.set(0.6)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2
    magnetX.set(x)
    magnetY.set(y)
  }

  const handleMouseLeave = () => {
    setState('dormant')
    outerScale.set(1)
    innerScale.set(1)
    glowIntensity.set(0)
    magnetX.set(0)
    magnetY.set(0)
    shimmerPos.set(0)
    depthShadow.set(0)
    borderGlow.set(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setRippleOrigin({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      })
    }
    
    setState('press')
    outerScale.set(0.96)
    innerScale.set(0.92)
    backgroundScale.set(1.1)
    depthShadow.set(0.3)
  }

  const handleMouseUp = () => {
    if (disabled) return
    setState('ripple')
    outerScale.set(1.08)
    innerScale.set(1.05)
    backgroundScale.set(1)
    
    // Ripple → Release → Settle sequence
    setTimeout(() => {
      setState('release')
      outerScale.set(1.02)
    }, 150)
    
    setTimeout(() => {
      setState('settle')
      outerScale.set(1.04)
      innerScale.set(1.02)
    }, 300)
    
    onClick?.()
  }

  // Size configurations
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }

  // Variant configurations
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600',
      text: 'text-white',
      glow: 'rgba(139, 92, 246, 0.5)',
      border: 'border-violet-500/30'
    },
    secondary: {
      bg: 'bg-slate-800/90',
      text: 'text-slate-100',
      glow: 'rgba(148, 163, 184, 0.3)',
      border: 'border-slate-600/50'
    },
    ghost: {
      bg: 'bg-transparent',
      text: 'text-slate-300',
      glow: 'rgba(255, 255, 255, 0.1)',
      border: 'border-slate-700/30'
    }
  }

  const v = variants[variant]

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      className={`
        relative overflow-hidden font-semibold
        ${sizes[size]} ${v.bg} ${v.text} ${v.border}
        border backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        scale: outerScale,
        x: magnetX,
        y: magnetY,
        boxShadow: useTransform(
          depthShadow,
          v => `0 ${4 + v * 20}px ${20 + v * 30}px -5px rgba(0, 0, 0, ${0.2 + v * 0.2}),
                0 0 ${v * 40}px -10px ${variants[variant].glow}`
        )
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-state={state}
    >
      {/* Background layer with scale animation */}
      <motion.div 
        className="absolute inset-0 rounded-inherit"
        style={{ scale: backgroundScale }}
      />
      
      {/* Shimmer sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
          transform: useTransform(shimmerPos, v => `translateX(${v - 100}%)`),
          opacity: useTransform(shimmerPos, v => v > 0 && v < 100 ? 1 : 0)
        }}
      />
      
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: glowIntensity,
          background: `radial-gradient(circle at ${rippleOrigin.x}% ${rippleOrigin.y}%, ${v.glow}, transparent 70%)`
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: borderGlow,
          boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.3)`
        }}
      />
      
      {/* Ripple effect */}
      <AnimatePresence>
        {state === 'ripple' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: TIMING.smooth }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: `${rippleOrigin.x}%`,
              top: `${rippleOrigin.y}%`,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Inner content with separate scale */}
      <motion.span 
        className="relative z-10 flex items-center justify-center gap-2"
        style={{ scale: innerScale }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🃏 OVER-ENGINEERED CARD
// States: dormant → visible → idle → hover → focus → interact → reset
// ═══════════════════════════════════════════════════════════════════════════════

type CardState = 'dormant' | 'awakening' | 'visible' | 'idle' | 'hover' | 'focus' | 'interact'

interface CinematicCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  delay?: number
  glowColor?: string
}

export function CinematicCard({ 
  children, 
  className = '',
  onClick,
  delay = 0,
  glowColor = 'rgba(139, 92, 246, 0.3)'
}: CinematicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CardState>('dormant')
  const [mouseInside, setMouseInside] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  
  // Entry springs (dormant → visible)
  const entryY = useSpring(60, { stiffness: 200, damping: 25, mass: 0.8 })
  const entryOpacity = useSpring(0, { stiffness: 150, damping: 20 })
  const entryScale = useSpring(0.9, { stiffness: 180, damping: 22 })
  const entryBlur = useSpring(15, { stiffness: 120, damping: 25 })
  
  // Hover springs
  const hoverY = useSpring(0, { stiffness: 400, damping: 30 })
  const hoverScale = useSpring(1, { stiffness: 350, damping: 25 })
  const hoverRotateX = useSpring(0, { stiffness: 300, damping: 20 })
  const hoverRotateY = useSpring(0, { stiffness: 300, damping: 20 })
  
  // Glow and depth
  const glowIntensity = useSpring(0, { stiffness: 200, damping: 25 })
  const depthShadow = useSpring(0, { stiffness: 250, damping: 30 })
  const innerGlow = useSpring(0, { stiffness: 180, damping: 25 })
  
  // Idle breathing animation
  const breatheScale = useMotionValue(1)
  
  // Entry animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === 'dormant') {
          setTimeout(() => {
            setState('awakening')
            
            // Awakening phase - slight anticipation
            entryY.set(40)
            entryOpacity.set(0.3)
            entryScale.set(0.94)
            entryBlur.set(8)
            
            // Full reveal
            setTimeout(() => {
              setState('visible')
              entryY.set(0)
              entryOpacity.set(1)
              entryScale.set(1)
              entryBlur.set(0)
              
              // Transition to idle
              setTimeout(() => setState('idle'), 600)
            }, 200)
          }, delay)
        }
      },
      { threshold: 0.2, rootMargin: '-10% 0px' }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [state, delay, entryY, entryOpacity, entryScale, entryBlur])

  // Idle breathing animation
  useAnimationFrame((time) => {
    if (state === 'idle' && !mouseInside) {
      const breathe = 1 + Math.sin(time / 2000) * 0.005
      breatheScale.set(breathe)
    }
  })

  const handleMouseEnter = () => {
    setMouseInside(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    
    setState('hover')
    hoverY.set(-8)
    hoverScale.set(1.02)
    glowIntensity.set(0.6)
    depthShadow.set(1)
    innerGlow.set(0.3)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    hoverRotateX.set(y * -10)
    hoverRotateY.set(x * 10)
  }

  const handleMouseLeave = () => {
    setMouseInside(false)
    
    hoverY.set(0)
    hoverScale.set(1)
    hoverRotateX.set(0)
    hoverRotateY.set(0)
    glowIntensity.set(0)
    depthShadow.set(0)
    innerGlow.set(0)
    
    // Return to idle after delay
    idleTimer.current = setTimeout(() => setState('idle'), 300)
  }

  const handleClick = () => {
    setState('interact')
    hoverScale.set(0.98)
    
    setTimeout(() => {
      hoverScale.set(1.02)
      setState('hover')
    }, 150)
    
    onClick?.()
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        y: useTransform([entryY, hoverY], ([e, h]) => (e as number) + (h as number)),
        opacity: entryOpacity,
        scale: useTransform([entryScale, hoverScale, breatheScale], 
          ([e, h, b]) => (e as number) * (h as number) * (b as number)
        ),
        rotateX: hoverRotateX,
        rotateY: hoverRotateY,
        filter: useTransform(entryBlur, v => `blur(${v}px)`),
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        boxShadow: useTransform(
          depthShadow,
          v => `0 ${10 + v * 30}px ${30 + v * 40}px -15px rgba(0, 0, 0, ${0.2 + v * 0.2}),
                0 0 ${v * 60}px -20px ${glowColor}`
        )
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-state={state}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute -inset-px rounded-inherit pointer-events-none"
        style={{
          opacity: glowIntensity,
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor}, transparent 70%)`
        }}
      />
      
      {/* Inner highlight */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: innerGlow,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📐 OVER-ENGINEERED SECTION
// Phases: dormant → awakening → rising → apex → anchored → departing
// Each phase has unique visual and motion characteristics
// ═══════════════════════════════════════════════════════════════════════════════

type SectionPhase = 'dormant' | 'awakening' | 'rising' | 'apex' | 'anchored' | 'departing'

interface CinematicSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'none' | 'mesh' | 'gradient' | 'aurora'
}

export function CinematicSection({ 
  children, 
  className = '',
  id,
  background = 'none'
}: CinematicSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<SectionPhase>('dormant')
  const [visibility, setVisibility] = useState(0)
  
  // Phase-based springs
  const sectionOpacity = useSpring(0.3, { stiffness: 100, damping: 25 })
  const sectionScale = useSpring(0.98, { stiffness: 150, damping: 20 })
  const backgroundIntensity = useSpring(0, { stiffness: 80, damping: 30 })
  const contentY = useSpring(30, { stiffness: 120, damping: 22 })
  
  // Scroll velocity tracking
  const lastScrollY = useRef(0)
  const scrollVelocity = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const velocity = Math.abs(window.scrollY - lastScrollY.current)
      scrollVelocity.current = velocity
      lastScrollY.current = window.scrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        setVisibility(ratio)
        
        // Phase state machine
        let newPhase: SectionPhase = phase
        
        if (ratio === 0) {
          newPhase = phase === 'departing' ? 'dormant' : 'dormant'
        } else if (ratio < 0.2) {
          newPhase = entry.boundingClientRect.top > 0 ? 'awakening' : 'departing'
        } else if (ratio < 0.5) {
          newPhase = 'rising'
        } else if (ratio < 0.8) {
          newPhase = 'apex'
        } else {
          newPhase = 'anchored'
        }
        
        if (newPhase !== phase) {
          setPhase(newPhase)
          
          // Phase-specific animations
          switch (newPhase) {
            case 'dormant':
              sectionOpacity.set(0.3)
              sectionScale.set(0.98)
              contentY.set(30)
              backgroundIntensity.set(0)
              break
            case 'awakening':
              sectionOpacity.set(0.5)
              sectionScale.set(0.99)
              contentY.set(20)
              backgroundIntensity.set(0.2)
              break
            case 'rising':
              sectionOpacity.set(0.8)
              sectionScale.set(1)
              contentY.set(10)
              backgroundIntensity.set(0.5)
              break
            case 'apex':
              sectionOpacity.set(0.95)
              sectionScale.set(1.01)
              contentY.set(0)
              backgroundIntensity.set(0.8)
              break
            case 'anchored':
              sectionOpacity.set(1)
              sectionScale.set(1)
              contentY.set(0)
              backgroundIntensity.set(1)
              break
            case 'departing':
              sectionOpacity.set(0.7)
              sectionScale.set(0.99)
              contentY.set(-15)
              backgroundIntensity.set(0.4)
              break
          }
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [phase, sectionOpacity, sectionScale, contentY, backgroundIntensity])

  // Background variants
  const backgrounds = {
    none: '',
    mesh: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    gradient: 'bg-gradient-to-b from-transparent via-violet-950/30 to-transparent',
    aurora: 'bg-gradient-to-tr from-cyan-950/30 via-purple-950/30 to-fuchsia-950/30'
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${backgrounds[background]} ${className}`}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale
      }}
      data-phase={phase}
      data-visibility={visibility.toFixed(2)}
    >
      {/* Animated background layer */}
      {background !== 'none' && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: backgroundIntensity,
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.1), transparent)'
          }}
        />
      )}
      
      {/* Content wrapper with Y offset */}
      <motion.div 
        className="relative z-10"
        style={{ y: contentY }}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ AMBIENT PARTICLES
// Background particles that respond to scroll velocity
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientParticlesProps {
  count?: number
  color?: string
  className?: string
}

export function AmbientParticles({ 
  count = 30, 
  color = 'rgba(139, 92, 246, 0.3)',
  className = ''
}: AmbientParticlesProps) {
  const [particles] = useState(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }))
  )

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌈 GRADIENT TEXT WITH VELOCITY
// Text that shifts gradient based on scroll velocity
// ═══════════════════════════════════════════════════════════════════════════════

interface VelocityGradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function VelocityGradientText({ 
  children, 
  className = '',
  from = '#818cf8',
  via = '#c084fc',
  to = '#f472b6'
}: VelocityGradientTextProps) {
  const gradientPos = useSpring(0, { stiffness: 100, damping: 30 })
  const skew = useSpring(0, { stiffness: 200, damping: 25 })
  
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const velocity = window.scrollY - lastScrollY
      const direction = velocity > 0 ? 1 : -1
      
      gradientPos.set(Math.min(Math.abs(velocity) * 2, 100) * direction)
      skew.set(velocity * 0.05)
      
      lastScrollY = window.scrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [gradientPos, skew])

  return (
    <motion.span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundImage: useTransform(
          gradientPos,
          v => `linear-gradient(${90 + v}deg, ${from}, ${via}, ${to})`
        ),
        skewX: skew
      }}
    >
      {children}
    </motion.span>
  )
}

export { type ButtonState, type CardState, type SectionPhase, TIMING }
