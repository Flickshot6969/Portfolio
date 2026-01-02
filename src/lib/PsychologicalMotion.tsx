'use client'

import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react'
import { motion, useSpring, useMotionValue, useTransform, useAnimationFrame, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 PSYCHOLOGICAL MOTION SYSTEM
// "Visitors freeze. They don't know why, but they can't look away."
// Motion that triggers emotional responses, not just visual interest
// ═══════════════════════════════════════════════════════════════════════════════

// PSYCHOLOGICAL TIMING CURVES
// Based on human attention and emotional response patterns
const PSY_CURVES = {
  // Builds anticipation, delivers satisfaction
  anticipation: [0.32, 0, 0.67, 0] as const,
  // Quick response, elegant settle (dopamine hit)
  satisfaction: [0.34, 1.56, 0.64, 1] as const,
  // Smooth, calming, trustworthy
  trust: [0.4, 0, 0.2, 1] as const,
  // Energetic, exciting, attention-grabbing
  excitement: [0.68, -0.6, 0.32, 1.6] as const,
  // Slow build, dramatic payoff
  dramatic: [0.16, 1, 0.3, 1] as const,
  // Organic, human-like
  organic: [0.25, 0.1, 0.25, 1] as const,
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎭 EMOTIONAL STATE CONTEXT
// Track user's emotional journey through the site
// ───────────────────────────────────────────────────────────────────────────────

type EmotionalState = 'curious' | 'engaged' | 'impressed' | 'delighted' | 'convinced'

interface EmotionalContextValue {
  state: EmotionalState
  intensity: number
  timeOnSite: number
  interactionCount: number
  scrollDepth: number
  triggerDelight: () => void
  triggerImpression: () => void
}

const EmotionalContext = createContext<EmotionalContextValue | null>(null)

export function useEmotionalState() {
  const context = useContext(EmotionalContext)
  return context
}

export function EmotionalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EmotionalState>('curious')
  const [intensity, setIntensity] = useState(0.5)
  const [timeOnSite, setTimeOnSite] = useState(0)
  const [interactionCount, setInteractionCount] = useState(0)
  const [scrollDepth, setScrollDepth] = useState(0)

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnSite(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScrollDepth(Math.min(depth, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track interactions
  useEffect(() => {
    const handleInteraction = () => {
      setInteractionCount(prev => prev + 1)
    }
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  // Evolve emotional state based on behavior
  useEffect(() => {
    if (timeOnSite > 5 && state === 'curious') {
      setState('engaged')
      setIntensity(0.6)
    }
    if (interactionCount > 3 && state === 'engaged') {
      setState('impressed')
      setIntensity(0.75)
    }
    if (scrollDepth > 0.5 && state === 'impressed') {
      setState('delighted')
      setIntensity(0.85)
    }
    if (timeOnSite > 60 && scrollDepth > 0.8) {
      setState('convinced')
      setIntensity(1)
    }
  }, [timeOnSite, interactionCount, scrollDepth, state])

  const triggerDelight = useCallback(() => {
    setState('delighted')
    setIntensity(prev => Math.min(prev + 0.1, 1))
  }, [])

  const triggerImpression = useCallback(() => {
    if (state === 'curious' || state === 'engaged') {
      setState('impressed')
    }
    setIntensity(prev => Math.min(prev + 0.15, 1))
  }, [state])

  return (
    <EmotionalContext.Provider value={{
      state,
      intensity,
      timeOnSite,
      interactionCount,
      scrollDepth,
      triggerDelight,
      triggerImpression
    }}>
      {children}
    </EmotionalContext.Provider>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ✨ AWE REVEAL - Elements that trigger "wow" moments
// ───────────────────────────────────────────────────────────────────────────────

interface AweRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  intensity?: 'subtle' | 'moderate' | 'dramatic' | 'explosive'
}

export function AweReveal({ 
  children, 
  className = '', 
  delay = 0,
  intensity = 'moderate'
}: AweRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const emotional = useEmotionalState()

  // Intensity-based configurations
  const configs = {
    subtle: {
      initial: { opacity: 0, y: 30, scale: 0.98 },
      duration: 0.6,
      glow: false
    },
    moderate: {
      initial: { opacity: 0, y: 50, scale: 0.95, rotateX: 10 },
      duration: 0.8,
      glow: true
    },
    dramatic: {
      initial: { opacity: 0, y: 80, scale: 0.9, rotateX: 20, filter: 'blur(10px)' },
      duration: 1,
      glow: true
    },
    explosive: {
      initial: { opacity: 0, y: 120, scale: 0.8, rotateX: 30, filter: 'blur(20px)' },
      duration: 1.2,
      glow: true
    }
  }

  const config = configs[intensity]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          setIsInView(true)
          setHasRevealed(true)
          emotional?.triggerImpression()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasRevealed, emotional])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        initial={config.initial}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotateX: 0,
          filter: 'blur(0px)'
        } : config.initial}
        transition={{
          duration: config.duration,
          delay,
          ease: PSY_CURVES.dramatic
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
      
      {/* Glow burst on reveal */}
      {config.glow && (
        <AnimatePresence>
          {isInView && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, delay: delay + 0.2 }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3), transparent 70%)',
                filter: 'blur(40px)'
              }}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 💓 HEARTBEAT ELEMENT - Pulsing that syncs with emotional state
// Disabled on mobile for clean look
// ───────────────────────────────────────────────────────────────────────────────

interface HeartbeatElementProps {
  children: React.ReactNode
  className?: string
  baseScale?: number
  pulseScale?: number
  intensity?: number // 0-1, higher = more dramatic pulse
}

export function HeartbeatElement({ 
  children, 
  className = '',
  baseScale = 1,
  pulseScale = 1.02,
  intensity = 0.5
}: HeartbeatElementProps) {
  const [isMobile, setIsMobile] = useState(false)
  const emotional = useEmotionalState()
  const scale = useSpring(baseScale, { stiffness: 300, damping: 20 })
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  
  // Apply intensity to pulse scale
  const effectivePulseScale = baseScale + ((pulseScale - baseScale) * (1 + intensity))
  
  // Pulse rate based on emotional intensity - disabled on mobile
  useEffect(() => {
    if (isMobile) return // No pulsing on mobile
    
    const emotionalIntensity = emotional?.intensity ?? 0.5
    const combinedIntensity = (emotionalIntensity + intensity) / 2
    const interval = 2000 - (combinedIntensity * 1000) // Faster when more engaged
    
    const pulse = setInterval(() => {
      scale.set(effectivePulseScale)
      setTimeout(() => scale.set(baseScale), 200)
    }, interval)
    
    return () => clearInterval(pulse)
  }, [emotional?.intensity, scale, baseScale, effectivePulseScale, intensity, isMobile])

  // On mobile, just return children without animation
  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} style={{ scale }}>
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌊 BREATHING CONTAINER - Organic, alive-feeling container
// ───────────────────────────────────────────────────────────────────────────────

interface BreathingContainerProps {
  children: React.ReactNode
  className?: string
  breathIntensity?: number
}

export function BreathingContainer({ 
  children, 
  className = '',
  breathIntensity = 0.01
}: BreathingContainerProps) {
  const scale = useMotionValue(1)
  const time = useRef(0)

  useAnimationFrame((t) => {
    time.current = t
    // Natural breathing rhythm (inhale 4s, exhale 6s pattern)
    const breath = Math.sin(t / 2500) * breathIntensity
    scale.set(1 + breath)
  })

  return (
    <motion.div className={className} style={{ scale }}>
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ⚡ DOPAMINE HIT - Instant gratification animation
// ───────────────────────────────────────────────────────────────────────────────

interface DopamineHitProps {
  children: React.ReactNode
  className?: string
  onTrigger?: () => void
  trigger?: boolean // External trigger control
}

export function DopamineHit({ children, className = '', onTrigger, trigger: externalTrigger }: DopamineHitProps) {
  const [isTriggered, setIsTriggered] = useState(false)
  const scale = useSpring(1, { stiffness: 600, damping: 15 })
  const rotate = useSpring(0, { stiffness: 400, damping: 20 })
  const emotional = useEmotionalState()

  const performTrigger = useCallback(() => {
    if (isTriggered) return
    setIsTriggered(true)
    scale.set(1.15)
    rotate.set(3)
    
    setTimeout(() => {
      scale.set(0.95)
      rotate.set(-2)
    }, 100)
    
    setTimeout(() => {
      scale.set(1)
      rotate.set(0)
      setIsTriggered(false)
    }, 250)
    
    emotional?.triggerDelight()
    onTrigger?.()
  }, [scale, rotate, emotional, onTrigger, isTriggered])

  // React to external trigger
  useEffect(() => {
    if (externalTrigger) {
      performTrigger()
    }
  }, [externalTrigger, performTrigger])

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      style={{ scale, rotate }}
      onClick={performTrigger}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      {/* Burst particles on trigger */}
      <AnimatePresence>
        {isTriggered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary-400"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [1, 0],
                  x: Math.cos((i / 8) * Math.PI * 2) * 60,
                  y: Math.sin((i / 8) * Math.PI * 2) * 60,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎯 FOCUS PULL - Draws attention to important elements
// ───────────────────────────────────────────────────────────────────────────────

interface FocusPullProps {
  children: React.ReactNode
  className?: string
  isActive?: boolean
  intensity?: number
}

export function FocusPull({ 
  children, 
  className = '', 
  isActive = false,
  intensity = 1
}: FocusPullProps) {
  const scale = useSpring(1, { stiffness: 200, damping: 20 })
  const glow = useSpring(0, { stiffness: 150, damping: 25 })

  useEffect(() => {
    if (isActive) {
      scale.set(1 + (0.05 * intensity))
      glow.set(intensity)
    } else {
      scale.set(1)
      glow.set(0)
    }
  }, [isActive, intensity, scale, glow])

  const glowOpacity = useTransform(glow, [0, 1], [0, 0.6])
  const glowBlur = useTransform(glow, [0, 1], [0, 30])

  return (
    <motion.div className={`relative ${className}`} style={{ scale }}>
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: glowOpacity,
          filter: useTransform(glowBlur, v => `blur(${v}px)`),
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent 70%)',
          transform: 'scale(1.5)',
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌀 HYPNOTIC LOOP - Mesmerizing continuous animation
// ───────────────────────────────────────────────────────────────────────────────

interface HypnoticLoopProps {
  children: React.ReactNode
  className?: string
  type?: 'float' | 'rotate' | 'pulse' | 'wave'
}

export function HypnoticLoop({ 
  children, 
  className = '',
  type = 'float'
}: HypnoticLoopProps) {
  const animations = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 20, repeat: Infinity, ease: 'linear' }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    wave: {
      y: [0, -5, 0, 5, 0],
      x: [0, 5, 0, -5, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <motion.div
      className={className}
      animate={animations[type]}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎪 GRAND ENTRANCE - Multi-stage dramatic entrance
// ───────────────────────────────────────────────────────────────────────────────

interface GrandEntranceProps {
  children: React.ReactNode
  className?: string
  stages?: number
  staggerDelay?: number
  delay?: number // Initial delay before animation starts
}

export function GrandEntrance({ 
  children, 
  className = '',
  stages = 3,
  staggerDelay = 0.15,
  delay = 0
}: GrandEntranceProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [delayComplete, setDelayComplete] = useState(delay === 0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentStage === 0) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [currentStage])

  // Handle initial delay before starting animation
  useEffect(() => {
    if (!isInView || delayComplete) return
    
    const delayTimer = setTimeout(() => {
      setDelayComplete(true)
    }, delay * 1000)

    return () => clearTimeout(delayTimer)
  }, [isInView, delay, delayComplete])

  useEffect(() => {
    if (!isInView || !delayComplete) return
    
    const advanceStage = () => {
      setCurrentStage(prev => {
        if (prev < stages) return prev + 1
        return prev
      })
    }

    const timers: NodeJS.Timeout[] = []
    for (let i = 0; i < stages; i++) {
      timers.push(setTimeout(advanceStage, i * staggerDelay * 1000))
    }

    return () => timers.forEach(clearTimeout)
  }, [isInView, stages, staggerDelay, delayComplete])

  const stageStyles = {
    0: { opacity: 0, y: 100, scale: 0.8, filter: 'blur(20px)' },
    1: { opacity: 0.5, y: 50, scale: 0.9, filter: 'blur(10px)' },
    2: { opacity: 0.8, y: 20, scale: 0.95, filter: 'blur(5px)' },
    3: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={stageStyles[Math.min(currentStage, 3) as keyof typeof stageStyles]}
      transition={{
        duration: 0.4,
        ease: PSY_CURVES.dramatic
      }}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌟 PRESENCE INDICATOR - Shows element importance through motion
// ───────────────────────────────────────────────────────────────────────────────

interface PresenceIndicatorProps {
  children: React.ReactNode
  className?: string
  importance: 'low' | 'medium' | 'high' | 'critical'
}

export function PresenceIndicator({ 
  children, 
  className = '',
  importance
}: PresenceIndicatorProps) {
  const configs = {
    low: { glow: false, pulse: false, float: false },
    medium: { glow: true, pulse: false, float: false },
    high: { glow: true, pulse: true, float: false },
    critical: { glow: true, pulse: true, float: true }
  }

  const config = configs[importance]

  return (
    <div className={`relative ${className}`}>
      {/* Glow ring */}
      {config.glow && (
        <motion.div
          className="absolute inset-0 rounded-inherit"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(139, 92, 246, 0)',
              '0 0 20px 5px rgba(139, 92, 246, 0.3)',
              '0 0 0 0 rgba(139, 92, 246, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <motion.div
        animate={config.float ? { y: [0, -5, 0] } : {}}
        transition={config.float ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        <motion.div
          animate={config.pulse ? { scale: [1, 1.02, 1] } : {}}
          transition={config.pulse ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default {
  EmotionalProvider,
  useEmotionalState,
  AweReveal,
  HeartbeatElement,
  BreathingContainer,
  DopamineHit,
  FocusPull,
  HypnoticLoop,
  GrandEntrance,
  PresenceIndicator,
  PSY_CURVES
}
