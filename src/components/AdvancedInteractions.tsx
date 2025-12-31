'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
import { useInteraction } from '@/lib/InteractionIntelligence'

// ═══════════════════════════════════════════════════════════════════════════════
// 🔮 ANTICIPATORY UI SYSTEM
// UI responds BEFORE user completes an action
// ═══════════════════════════════════════════════════════════════════════════════

// ANTICIPATORY BUTTON - Begins animation before click completes
interface AnticipatoryCTAProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function AnticipatoryCTA({ children, onClick, className = '', variant = 'primary' }: AnticipatoryCTAProps) {
  const { state, registerElement, unregisterElement, getProximity } = useInteraction()
  const ref = useRef<HTMLButtonElement>(null)
  const [phase, setPhase] = useState<'idle' | 'approach' | 'hover' | 'press' | 'release'>('idle')
  const [approachAngle, setApproachAngle] = useState(0)
  const id = useRef(`cta-${Math.random().toString(36).substr(2, 9)}`).current

  const scale = useSpring(1, { stiffness: 400, damping: 25 })
  const glow = useSpring(0, { stiffness: 300, damping: 30 })
  const innerScale = useSpring(1, { stiffness: 500, damping: 20 })
  const magnetX = useSpring(0, { stiffness: 150, damping: 15 })
  const magnetY = useSpring(0, { stiffness: 150, damping: 15 })

  useEffect(() => {
    if (ref.current) registerElement(id, ref.current)
    return () => unregisterElement(id)
  }, [id, registerElement, unregisterElement])

  // Anticipatory response - react to proximity
  useEffect(() => {
    const proximity = getProximity(id)
    
    if (proximity < 100 && phase === 'idle') {
      setPhase('approach')
      scale.set(1.02)
      glow.set(0.3)
    } else if (proximity >= 100 && phase === 'approach') {
      setPhase('idle')
      scale.set(1)
      glow.set(0)
    }
  }, [state.cursor.x, state.cursor.y, phase, id, getProximity, scale, glow])

  // Calculate magnetic pull towards cursor
  useEffect(() => {
    if (ref.current && phase === 'hover') {
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (state.cursor.x - centerX) * 0.15
      const deltaY = (state.cursor.y - centerY) * 0.15
      
      magnetX.set(deltaX)
      magnetY.set(deltaY)
      
      setApproachAngle(Math.atan2(state.cursor.y - centerY, state.cursor.x - centerX) * (180 / Math.PI))
    }
  }, [state.cursor.x, state.cursor.y, phase, magnetX, magnetY])

  const handleMouseEnter = () => {
    setPhase('hover')
    scale.set(1.05)
    glow.set(0.6)
  }

  const handleMouseLeave = () => {
    setPhase('idle')
    scale.set(1)
    glow.set(0)
    magnetX.set(0)
    magnetY.set(0)
  }

  const handleMouseDown = () => {
    setPhase('press')
    scale.set(0.95)
    innerScale.set(0.9)
    glow.set(1)
  }

  const handleMouseUp = () => {
    setPhase('release')
    scale.set(1.1)
    innerScale.set(1.1)
    
    setTimeout(() => {
      if (phase === 'release') {
        scale.set(1.05)
        innerScale.set(1)
        setPhase('hover')
      }
    }, 150)
    
    onClick?.()
  }

  const baseClasses = {
    primary: 'bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-primary/20',
    ghost: 'bg-transparent text-foreground border border-foreground/20'
  }

  return (
    <motion.button
      ref={ref}
      className={`relative px-8 py-4 rounded-xl font-medium overflow-hidden ${baseClasses[variant]} ${className}`}
      style={{ 
        scale,
        x: magnetX,
        y: magnetY
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Anticipatory glow layer */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          opacity: glow,
          background: `radial-gradient(circle at ${50 + Math.cos(approachAngle * Math.PI / 180) * 30}% ${50 + Math.sin(approachAngle * Math.PI / 180) * 30}%, rgba(168, 85, 247, 0.4), transparent 70%)`
        }}
      />
      
      {/* Multi-phase ripple */}
      <AnimatePresence>
        {phase === 'press' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white rounded-xl"
            style={{ transformOrigin: `${state.cursor.x}px ${state.cursor.y}px` }}
          />
        )}
      </AnimatePresence>
      
      {/* Inner content with separate scale */}
      <motion.span 
        className="relative z-10 flex items-center gap-2"
        style={{ scale: innerScale }}
      >
        {children}
      </motion.span>
      
      {/* Edge glow based on approach direction */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          opacity: glow,
          boxShadow: `inset ${Math.cos(approachAngle * Math.PI / 180) * -4}px ${Math.sin(approachAngle * Math.PI / 180) * -4}px 12px rgba(168, 85, 247, 0.3)`
        }}
      />
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌊 SCROLL-REACTIVE SECTION
// Section behavior changes based on scroll state
// ═══════════════════════════════════════════════════════════════════════════════

interface ScrollReactiveSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ScrollReactiveSection({ children, className = '', id }: ScrollReactiveSectionProps) {
  const { state } = useInteraction()
  const sectionRef = useRef<HTMLElement>(null)
  const [visibility, setVisibility] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)

  const y = useSpring(0, { stiffness: 100, damping: 20 })
  const blur = useSpring(0, { stiffness: 100, damping: 30 })
  const opacity = useSpring(0, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.intersectionRatio)
        if (entry.intersectionRatio > 0.1 && !hasEntered) {
          setHasEntered(true)
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasEntered])

  // React to scroll velocity and direction
  useEffect(() => {
    if (!hasEntered) {
      opacity.set(0)
      y.set(50)
      blur.set(10)
      return
    }

    const velocityOffset = state.scroll.velocity * (state.scroll.direction === 'down' ? -20 : 20)
    y.set(Math.max(-30, Math.min(30, velocityOffset)))
    
    // Blur on fast scroll
    blur.set(state.scroll.velocity > 1 ? Math.min(state.scroll.velocity * 2, 5) : 0)
    
    opacity.set(1)
  }, [state.scroll.velocity, state.scroll.direction, hasEntered, y, blur, opacity])

  // Hesitation detection - user paused, draw attention
  useEffect(() => {
    if (state.scroll.hesitation && visibility > 0.5) {
      // Subtle "hello" animation
      y.set(-5)
      setTimeout(() => y.set(0), 200)
    }
  }, [state.scroll.hesitation, visibility, y])

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{ 
        y,
        opacity,
        filter: useTransform(blur, v => `blur(${v}px)`)
      }}
    >
      {children}
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 MULTI-PHASE CARD
// Four distinct interaction phases with memory
// ═══════════════════════════════════════════════════════════════════════════════

interface MultiPhaseCardProps {
  children: React.ReactNode
  className?: string
  onPhaseChange?: (phase: string) => void
}

export function MultiPhaseCard({ children, className = '', onPhaseChange }: MultiPhaseCardProps) {
  const { state, registerElement, unregisterElement, getProximity } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const id = useRef(`card-${Math.random().toString(36).substr(2, 9)}`).current
  const [phase, setPhase] = useState<'idle' | 'approach' | 'engage' | 'commit' | 'release'>('idle')
  const [dwellTime, setDwellTime] = useState(0)
  const dwellInterval = useRef<NodeJS.Timeout | null>(null)
  const [exitVelocity, setExitVelocity] = useState({ x: 0, y: 0 })

  // Spring animations for each phase
  const scale = useSpring(1, { stiffness: 300, damping: 25 })
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const glowIntensity = useSpring(0, { stiffness: 200, damping: 30 })
  const borderOpacity = useSpring(0, { stiffness: 300, damping: 25 })
  const shadowBlur = useSpring(10, { stiffness: 200, damping: 25 })
  const innerY = useSpring(0, { stiffness: 400, damping: 30 })

  useEffect(() => {
    if (ref.current) registerElement(id, ref.current)
    return () => unregisterElement(id)
  }, [id, registerElement, unregisterElement])

  // Phase: APPROACH (proximity detection)
  useEffect(() => {
    const proximity = getProximity(id)
    
    if (proximity < 150 && phase === 'idle') {
      setPhase('approach')
      onPhaseChange?.('approach')
      scale.set(1.01)
      glowIntensity.set(0.2)
      borderOpacity.set(0.3)
    } else if (proximity >= 150 && phase === 'approach') {
      setPhase('idle')
      onPhaseChange?.('idle')
      scale.set(1)
      glowIntensity.set(0)
      borderOpacity.set(0)
    }
  }, [state.cursor.x, state.cursor.y, phase, id, getProximity, scale, glowIntensity, borderOpacity, onPhaseChange])

  // Phase: ENGAGE (hover start)
  const handleMouseEnter = () => {
    setPhase('engage')
    onPhaseChange?.('engage')
    scale.set(1.03)
    glowIntensity.set(0.5)
    borderOpacity.set(0.6)
    shadowBlur.set(25)
    
    // Start dwell timer
    dwellInterval.current = setInterval(() => {
      setDwellTime(prev => prev + 100)
    }, 100)
  }

  // Phase: COMMIT (sustained hover > 1s)
  useEffect(() => {
    if (dwellTime > 1000 && phase === 'engage') {
      setPhase('commit')
      onPhaseChange?.('commit')
      scale.set(1.05)
      glowIntensity.set(0.8)
      borderOpacity.set(1)
      shadowBlur.set(35)
      innerY.set(-3)
    }
  }, [dwellTime, phase, scale, glowIntensity, borderOpacity, shadowBlur, innerY, onPhaseChange])

  // Phase: RELEASE (exit with memory)
  const handleMouseLeave = () => {
    if (dwellInterval.current) {
      clearInterval(dwellInterval.current)
    }
    
    setExitVelocity({
      x: state.cursor.velocity.x,
      y: state.cursor.velocity.y
    })
    
    setPhase('release')
    onPhaseChange?.('release')
    
    // Animate based on exit velocity
    const exitMagnitude = Math.sqrt(exitVelocity.x ** 2 + exitVelocity.y ** 2)
    const exitDuration = Math.max(300, 800 - exitMagnitude * 100)
    
    scale.set(1)
    glowIntensity.set(0)
    borderOpacity.set(0)
    shadowBlur.set(10)
    innerY.set(0)
    
    setTimeout(() => {
      setPhase('idle')
      onPhaseChange?.('idle')
      setDwellTime(0)
    }, exitDuration)
  }

  // 3D tilt effect during engage/commit
  const handleMouseMove = (e: React.MouseEvent) => {
    if (phase !== 'engage' && phase !== 'commit') return
    
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    rotateY.set((x - 0.5) * 10)
    rotateX.set((0.5 - y) * 10)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        scale,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: borderOpacity,
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.5))',
          padding: '1px'
        }}
      >
        <div className="w-full h-full rounded-2xl bg-card" />
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl pointer-events-none"
        style={{
          opacity: glowIntensity,
          background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), transparent 70%)',
          filter: useTransform(shadowBlur, v => `blur(${v}px)`)
        }}
      />
      
      {/* Inner content with lift */}
      <motion.div 
        className="relative z-10"
        style={{ y: innerY }}
      >
        {children}
      </motion.div>
      
      {/* Phase indicator (debug, remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 text-xs opacity-30 font-mono">
          {phase} {dwellTime > 0 && `(${dwellTime}ms)`}
        </div>
      )}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 TOUCH-INTELLIGENT COMPONENT
// Sophisticated touch handling with gesture prediction
// ═══════════════════════════════════════════════════════════════════════════════

interface TouchIntelligentProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onLongPress?: () => void
}

export function TouchIntelligent({ 
  children, 
  className = '',
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress
}: TouchIntelligentProps) {
  const { state } = useInteraction()
  const [touchState, setTouchState] = useState<'idle' | 'touching' | 'swiping' | 'longpress'>('idle')
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  
  const x = useSpring(0, { stiffness: 300, damping: 25 })
  const y = useSpring(0, { stiffness: 300, damping: 25 })
  const scale = useSpring(1, { stiffness: 400, damping: 30 })
  const rotation = useSpring(0, { stiffness: 300, damping: 20 })

  // Track swipe intent
  useEffect(() => {
    if (state.touch.gesturePhase === 'move' && touchState === 'touching') {
      setTouchState('swiping')
      
      // Visual feedback based on swipe intent
      const intent = state.touch.swipeIntent
      const direction = state.touch.touchDirection
      
      if (direction === 'left' || direction === 'right') {
        x.set(direction === 'right' ? intent * 30 : -intent * 30)
        rotation.set(direction === 'right' ? intent * 3 : -intent * 3)
      } else if (direction === 'up' || direction === 'down') {
        y.set(direction === 'down' ? intent * 20 : -intent * 20)
      }
      
      scale.set(1 - intent * 0.05)
    }
  }, [state.touch.swipeIntent, state.touch.touchDirection, state.touch.gesturePhase, touchState, x, y, scale, rotation])

  // Handle gesture completion
  useEffect(() => {
    if (state.touch.gesturePhase === 'end' && touchState === 'swiping') {
      const intent = state.touch.swipeIntent
      const direction = state.touch.touchDirection
      
      if (intent > 0.5) {
        // Complete swipe
        if (direction === 'left') onSwipeLeft?.()
        if (direction === 'right') onSwipeRight?.()
        if (direction === 'up') onSwipeUp?.()
        if (direction === 'down') onSwipeDown?.()
      }
      
      // Reset
      x.set(0)
      y.set(0)
      scale.set(1)
      rotation.set(0)
      setTouchState('idle')
    }
  }, [state.touch.gesturePhase, touchState, state.touch.swipeIntent, state.touch.touchDirection, x, y, scale, rotation, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  const handleTouchStart = () => {
    setTouchState('touching')
    scale.set(0.98)
    
    // Long press detection
    longPressTimer.current = setTimeout(() => {
      setTouchState('longpress')
      scale.set(0.95)
      onLongPress?.()
    }, 500)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    
    if (touchState === 'touching') {
      // Quick tap
      scale.set(1)
    }
    
    setTouchState('idle')
  }

  return (
    <motion.div
      className={`touch-none ${className}`}
      style={{ x, y, scale, rotate: rotation }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌟 AMBIENT MOTION LAYER
// Subtle background motion that responds to interaction intensity
// ═══════════════════════════════════════════════════════════════════════════════

interface AmbientMotionProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function AmbientMotion({ children, className = '', intensity = 'medium' }: AmbientMotionProps) {
  const { state, getInteractionIntensity } = useInteraction()
  const [ambientPhase, setAmbientPhase] = useState(0)
  
  const floatY = useSpring(0, { stiffness: 50, damping: 10 })
  const floatX = useSpring(0, { stiffness: 50, damping: 10 })
  const floatRotate = useSpring(0, { stiffness: 30, damping: 8 })

  const intensityMultiplier = { low: 0.3, medium: 0.6, high: 1 }[intensity]

  // Ambient floating animation
  useEffect(() => {
    const animate = () => {
      setAmbientPhase(prev => prev + 0.01)
    }
    
    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  // React to interaction intensity
  useEffect(() => {
    const interactionIntensity = getInteractionIntensity()
    
    // Reduce ambient motion during high interaction
    const dampening = 1 - interactionIntensity * 0.7
    
    floatY.set(Math.sin(ambientPhase) * 5 * intensityMultiplier * dampening)
    floatX.set(Math.cos(ambientPhase * 0.7) * 3 * intensityMultiplier * dampening)
    floatRotate.set(Math.sin(ambientPhase * 0.5) * 1 * intensityMultiplier * dampening)
  }, [ambientPhase, getInteractionIntensity, intensityMultiplier, floatY, floatX, floatRotate])

  // Pause animation when idle for too long (performance)
  useEffect(() => {
    if (state.idleTime > 10) {
      floatY.set(0)
      floatX.set(0)
      floatRotate.set(0)
    }
  }, [state.idleTime, floatY, floatX, floatRotate])

  return (
    <motion.div
      className={className}
      style={{
        y: floatY,
        x: floatX,
        rotate: floatRotate
      }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ SPARKLE ON IDLE
// Shows subtle sparkles when user is idle (rewards attention)
// ═══════════════════════════════════════════════════════════════════════════════

export function SparkleOnIdle({ className = '' }: { className?: string }) {
  const { state } = useInteraction()
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (state.isIdle && state.idleTime > 2 && state.idleTime < 30) {
      const interval = setInterval(() => {
        setSparkles(prev => [
          ...prev.slice(-5),
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100
          }
        ])
      }, 1500)

      return () => clearInterval(interval)
    } else {
      setSparkles([])
    }
  }, [state.isIdle, state.idleTime])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.5)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
