'use client'

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🔥 SCROLL PHASE ENGINE
// Scroll is NOT distance — scroll is PHASE TRANSITIONS
// Elements don't slide in. They MATERIALIZE through states.
// ═══════════════════════════════════════════════════════════════════════════════

type ScrollPhase = 'dormant' | 'awakening' | 'rising' | 'apex' | 'settling' | 'anchored' | 'departing' | 'gone'

interface PhaseTimings {
  dormantToAwakening: number  // viewport entry threshold
  awakeningToRising: number   // 0-1, time in awakening
  risingToApex: number        // velocity threshold  
  apexToSettling: number      // pause detection ms
  settlingToAnchored: number  // stabilization time
  anchoredToDeparting: number // exit threshold
}

interface ScrollPhaseState {
  phase: ScrollPhase
  progress: number           // 0-1 within current phase
  velocity: number           // px/ms
  acceleration: number       // change in velocity
  direction: 'up' | 'down' | 'stationary'
  isPaused: boolean
  pauseDuration: number
  entryEdge: 'top' | 'bottom'
  exitEdge: 'top' | 'bottom' | null
  viewportPosition: number   // 0=top, 1=bottom
  timeInView: number         // ms
  oscillations: number       // direction changes
}

interface ElementPhaseState {
  id: string
  phase: ScrollPhase
  localProgress: number
  globalInfluence: number    // how much this element affects others
  entryTime: number
  stateHistory: ScrollPhase[]
  isHero: boolean            // first element gets special treatment
  depth: number              // z-layer for parallax
}

const defaultTimings: PhaseTimings = {
  dormantToAwakening: 0.15,   // 15% into viewport
  awakeningToRising: 300,     // 300ms in awakening
  risingToApex: 0.3,          // velocity below 0.3px/ms
  apexToSettling: 150,        // 150ms pause
  settlingToAnchored: 400,    // 400ms to anchor
  anchoredToDeparting: 0.85,  // 85% exit
}

const PhaseContext = createContext<{
  globalPhase: ScrollPhaseState
  registerElement: (id: string, ref: HTMLElement, options?: Partial<ElementPhaseState>) => void
  unregisterElement: (id: string) => void
  getElementPhase: (id: string) => ElementPhaseState | null
  getPhaseSpring: (id: string) => { scale: MotionValue<number>; y: MotionValue<number>; opacity: MotionValue<number>; blur: MotionValue<number> }
  timings: PhaseTimings
} | null>(null)

export function ScrollPhaseProvider({ 
  children, 
  timings = defaultTimings 
}: { 
  children: React.ReactNode
  timings?: Partial<PhaseTimings>
}) {
  const mergedTimings = { ...defaultTimings, ...timings }
  
  const [globalPhase, setGlobalPhase] = useState<ScrollPhaseState>({
    phase: 'dormant',
    progress: 0,
    velocity: 0,
    acceleration: 0,
    direction: 'stationary',
    isPaused: true,
    pauseDuration: 0,
    entryEdge: 'top',
    exitEdge: null,
    viewportPosition: 0,
    timeInView: 0,
    oscillations: 0
  })

  const elements = useRef<Map<string, { 
    ref: HTMLElement
    state: ElementPhaseState
    observer: IntersectionObserver
  }>>(new Map())
  
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const lastDirection = useRef<'up' | 'down' | 'stationary'>('stationary')
  const pauseStartTime = useRef<number | null>(null)
  const oscillationCount = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const rafId = useRef<number | null>(null)

  // Phase springs for each element
  const phaseSpringConfigs = useRef<Map<string, {
    scale: MotionValue<number>
    y: MotionValue<number>
    opacity: MotionValue<number>
    blur: MotionValue<number>
  }>>(new Map())

  // SCROLL VELOCITY ENGINE
  useEffect(() => {
    let frameCount = 0
    
    const processScroll = () => {
      const now = Date.now()
      const currentY = window.scrollY
      const deltaY = currentY - lastScrollY.current
      const deltaTime = Math.max(now - lastScrollTime.current, 1)
      
      // Velocity (px/ms) with smoothing
      const instantVelocity = Math.abs(deltaY) / deltaTime
      const velocity = globalPhase.velocity * 0.7 + instantVelocity * 0.3
      
      // Acceleration
      const acceleration = (velocity - globalPhase.velocity) / deltaTime
      
      // Direction with oscillation tracking
      let direction: 'up' | 'down' | 'stationary' = 'stationary'
      if (Math.abs(deltaY) > 1) {
        direction = deltaY > 0 ? 'down' : 'up'
        if (direction !== lastDirection.current && lastDirection.current !== 'stationary') {
          oscillationCount.current++
        }
        lastDirection.current = direction
      }
      
      // Pause detection
      let isPaused = velocity < 0.05
      let pauseDuration = 0
      
      if (isPaused) {
        if (!pauseStartTime.current) {
          pauseStartTime.current = now
        }
        pauseDuration = now - pauseStartTime.current
      } else {
        pauseStartTime.current = null
      }
      
      // Viewport position
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const viewportPosition = maxScroll > 0 ? currentY / maxScroll : 0

      setGlobalPhase(prev => ({
        ...prev,
        velocity,
        acceleration,
        direction,
        isPaused,
        pauseDuration,
        viewportPosition,
        oscillations: oscillationCount.current,
        timeInView: prev.timeInView + deltaTime
      }))
      
      lastScrollY.current = currentY
      lastScrollTime.current = now
      frameCount++
    }

    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          processScroll()
          rafId.current = null
        })
      }
      
      scrollTimeout.current = setTimeout(() => {
        setGlobalPhase(prev => ({ ...prev, isPaused: true, direction: 'stationary' }))
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [globalPhase.velocity])

  // ELEMENT REGISTRATION WITH PHASE TRACKING
  const registerElement = useCallback((
    id: string, 
    ref: HTMLElement, 
    options?: Partial<ElementPhaseState>
  ) => {
    if (elements.current.has(id)) return

    const state: ElementPhaseState = {
      id,
      phase: 'dormant',
      localProgress: 0,
      globalInfluence: options?.globalInfluence ?? 0.1,
      entryTime: 0,
      stateHistory: ['dormant'],
      isHero: options?.isHero ?? false,
      depth: options?.depth ?? 1
    }

    // Multi-threshold observer for granular phase detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = elements.current.get(id)
          if (!element) return

          const ratio = entry.intersectionRatio
          const isEntering = entry.isIntersecting
          const bounds = entry.boundingClientRect
          const entryEdge = bounds.top > 0 ? 'bottom' : 'top'
          
          let newPhase: ScrollPhase = element.state.phase
          
          // PHASE STATE MACHINE
          if (!isEntering && ratio === 0) {
            newPhase = element.state.phase === 'departing' ? 'gone' : 'dormant'
          } else if (isEntering) {
            if (ratio < 0.15) {
              newPhase = 'awakening'
              if (element.state.phase === 'dormant') {
                element.state.entryTime = Date.now()
              }
            } else if (ratio < 0.5) {
              newPhase = 'rising'
            } else if (ratio < 0.85) {
              // Check velocity for apex
              if (globalPhase.velocity < 0.3 && globalPhase.isPaused) {
                newPhase = 'settling'
              } else {
                newPhase = 'apex'
              }
            } else {
              // Near full view
              if (globalPhase.isPaused && globalPhase.pauseDuration > 200) {
                newPhase = 'anchored'
              } else {
                newPhase = 'settling'
              }
            }
          }
          
          // Departing detection
          if (element.state.phase === 'anchored' && ratio < 0.5 && !isEntering) {
            newPhase = 'departing'
          }

          if (newPhase !== element.state.phase) {
            element.state.stateHistory.push(newPhase)
            element.state.phase = newPhase
            element.state.localProgress = 0
          } else {
            element.state.localProgress = Math.min(1, element.state.localProgress + 0.05)
          }
        })
      },
      { 
        threshold: [0, 0.1, 0.15, 0.25, 0.5, 0.65, 0.75, 0.85, 0.95, 1],
        rootMargin: '-5% 0px -5% 0px'
      }
    )

    observer.observe(ref)
    elements.current.set(id, { ref, state, observer })
  }, [globalPhase.velocity, globalPhase.isPaused, globalPhase.pauseDuration])

  const unregisterElement = useCallback((id: string) => {
    const element = elements.current.get(id)
    if (element) {
      element.observer.disconnect()
      elements.current.delete(id)
      phaseSpringConfigs.current.delete(id)
    }
  }, [])

  const getElementPhase = useCallback((id: string): ElementPhaseState | null => {
    return elements.current.get(id)?.state ?? null
  }, [])

  const getPhaseSpring = useCallback((id: string) => {
    if (!phaseSpringConfigs.current.has(id)) {
      // These will be controlled externally
      phaseSpringConfigs.current.set(id, {
        scale: useMotionValue(1),
        y: useMotionValue(0),
        opacity: useMotionValue(0),
        blur: useMotionValue(10)
      })
    }
    return phaseSpringConfigs.current.get(id)!
  }, [])

  return (
    <PhaseContext.Provider value={{
      globalPhase,
      registerElement,
      unregisterElement,
      getElementPhase,
      getPhaseSpring,
      timings: mergedTimings
    }}>
      {children}
    </PhaseContext.Provider>
  )
}

export function useScrollPhase() {
  const context = useContext(PhaseContext)
  if (!context) {
    throw new Error('useScrollPhase must be used within ScrollPhaseProvider')
  }
  return context
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 PHASE-AWARE COMPONENT WRAPPER
// Elements pass through visual states as scroll phases change
// ═══════════════════════════════════════════════════════════════════════════════

interface PhaseElementProps {
  children: React.ReactNode
  id: string
  className?: string
  isHero?: boolean
  depth?: number
  onPhaseChange?: (phase: ScrollPhase) => void
}

export function PhaseElement({ 
  children, 
  id, 
  className = '',
  isHero = false,
  depth = 1,
  onPhaseChange
}: PhaseElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { registerElement, unregisterElement, getElementPhase, globalPhase } = useScrollPhase()
  const [currentPhase, setCurrentPhase] = useState<ScrollPhase>('dormant')
  const [phaseProgress, setPhaseProgress] = useState(0)
  
  // Phase-specific springs with different physics
  const scale = useSpring(isHero ? 1 : 0.85, {
    stiffness: currentPhase === 'apex' ? 600 : 200,
    damping: currentPhase === 'settling' ? 40 : 25,
    mass: currentPhase === 'awakening' ? 0.3 : 0.8
  })
  
  const y = useSpring(isHero ? 0 : 80, {
    stiffness: currentPhase === 'rising' ? 300 : 150,
    damping: 30
  })
  
  const opacity = useSpring(isHero ? 1 : 0, {
    stiffness: currentPhase === 'awakening' ? 400 : 200,
    damping: currentPhase === 'departing' ? 15 : 30
  })
  
  const blur = useSpring(isHero ? 0 : 12, {
    stiffness: 150,
    damping: 25
  })
  
  const rotateX = useSpring(isHero ? 0 : -8, {
    stiffness: 180,
    damping: 20
  })

  useEffect(() => {
    if (ref.current) {
      registerElement(id, ref.current, { isHero, depth })
    }
    return () => unregisterElement(id)
  }, [id, isHero, depth, registerElement, unregisterElement])

  // PHASE-DRIVEN ANIMATION STATES
  useEffect(() => {
    const elementPhase = getElementPhase(id)
    if (!elementPhase) return
    
    const phase = elementPhase.phase
    if (phase !== currentPhase) {
      setCurrentPhase(phase)
      onPhaseChange?.(phase)
    }
    
    setPhaseProgress(elementPhase.localProgress)

    // PHASE VISUAL RULES
    switch (phase) {
      case 'dormant':
        scale.set(0.85)
        y.set(80)
        opacity.set(0)
        blur.set(12)
        rotateX.set(-8)
        break
        
      case 'awakening':
        // First sign of life - slight pulse
        scale.set(0.92)
        y.set(50)
        opacity.set(0.4)
        blur.set(8)
        rotateX.set(-4)
        break
        
      case 'rising':
        // Climbing up with momentum
        const risingMomentum = Math.min(globalPhase.velocity * 2, 1)
        scale.set(0.96 + risingMomentum * 0.04)
        y.set(25 - risingMomentum * 10)
        opacity.set(0.7 + risingMomentum * 0.2)
        blur.set(4 - risingMomentum * 2)
        rotateX.set(-2 + risingMomentum)
        break
        
      case 'apex':
        // Peak visibility, velocity-reactive
        scale.set(1.02)
        y.set(5)
        opacity.set(0.95)
        blur.set(1)
        rotateX.set(0)
        break
        
      case 'settling':
        // Coming to rest, slight overshoot
        scale.set(1.01)
        y.set(-2)
        opacity.set(1)
        blur.set(0)
        rotateX.set(0.5)
        break
        
      case 'anchored':
        // Fully stable, ready for interaction
        scale.set(1)
        y.set(0)
        opacity.set(1)
        blur.set(0)
        rotateX.set(0)
        break
        
      case 'departing':
        // Leaving with grace
        scale.set(0.98)
        y.set(-20)
        opacity.set(0.6)
        blur.set(4)
        rotateX.set(2)
        break
        
      case 'gone':
        scale.set(0.9)
        y.set(-60)
        opacity.set(0)
        blur.set(10)
        rotateX.set(4)
        break
    }
  }, [id, getElementPhase, currentPhase, globalPhase.velocity, scale, y, opacity, blur, rotateX, onPhaseChange])

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        scale,
        y,
        opacity,
        filter: useTransform(blur, v => `blur(${v}px)`),
        rotateX,
        transformPerspective: 1200,
        transformOrigin: 'center bottom',
        willChange: 'transform, opacity, filter'
      }}
      data-phase={currentPhase}
      data-progress={phaseProgress.toFixed(2)}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ⚡ VELOCITY-REACTIVE TYPOGRAPHY
// Text responds to scroll speed with visual weight changes
// ═══════════════════════════════════════════════════════════════════════════════

interface VelocityTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function VelocityText({ children, className = '', as: Tag = 'span' }: VelocityTextProps) {
  const { globalPhase } = useScrollPhase()
  
  const letterSpacing = useSpring(0, { stiffness: 300, damping: 30 })
  const skewX = useSpring(0, { stiffness: 200, damping: 25 })
  const textBlur = useSpring(0, { stiffness: 400, damping: 35 })

  useEffect(() => {
    const velocity = globalPhase.velocity
    
    // Fast scroll = stretched, blurred text
    if (velocity > 1) {
      letterSpacing.set(velocity * 2)
      skewX.set(globalPhase.direction === 'down' ? -velocity * 2 : velocity * 2)
      textBlur.set(Math.min(velocity * 0.5, 2))
    } else {
      letterSpacing.set(0)
      skewX.set(0)
      textBlur.set(0)
    }
  }, [globalPhase.velocity, globalPhase.direction, letterSpacing, skewX, textBlur])

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        letterSpacing: useTransform(letterSpacing, v => `${v}px`),
        skewX,
        filter: useTransform(textBlur, v => `blur(${v}px)`)
      }}
    >
      {Tag === 'span' ? children : <Tag>{children}</Tag>}
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌊 MOMENTUM PARALLAX
// Depth-aware parallax that responds to scroll momentum, not just position
// ═══════════════════════════════════════════════════════════════════════════════

interface MomentumParallaxProps {
  children: React.ReactNode
  depth?: number // 0 = no parallax, 1 = full parallax
  className?: string
}

export function MomentumParallax({ children, depth = 0.5, className = '' }: MomentumParallaxProps) {
  const { globalPhase } = useScrollPhase()
  const ref = useRef<HTMLDivElement>(null)
  
  const y = useSpring(0, { 
    stiffness: 80 + (1 - depth) * 120, // Deeper = slower response
    damping: 20 + depth * 10 
  })
  
  const scale = useSpring(1, { stiffness: 200, damping: 30 })
  
  useEffect(() => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const viewportCenter = window.innerHeight / 2
    const elementCenter = rect.top + rect.height / 2
    const offset = (elementCenter - viewportCenter) * depth * 0.3
    
    // Add momentum influence
    const directionMultiplier = globalPhase.direction === 'down' ? 1 : -1
    const momentum = globalPhase.velocity * directionMultiplier
    const momentumOffset = momentum * depth * 30
    
    y.set(offset + momentumOffset)
    
    // Scale based on depth during fast scroll
    if (globalPhase.velocity > 0.5) {
      scale.set(1 + (depth * 0.02 * globalPhase.velocity))
    } else {
      scale.set(1)
    }
  }, [globalPhase.viewportPosition, globalPhase.velocity, globalPhase.direction, depth, y, scale])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, scale }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 SCROLL HESITATION DETECTOR
// Triggers special states when user pauses to look
// ═══════════════════════════════════════════════════════════════════════════════

interface HesitationAwareProps {
  children: (state: { isHesitating: boolean; hesitationDuration: number; lookingAt: boolean }) => React.ReactNode
  className?: string
}

export function HesitationAware({ children, className = '' }: HesitationAwareProps) {
  const { globalPhase } = useScrollPhase()
  const ref = useRef<HTMLDivElement>(null)
  const [isLookingAt, setIsLookingAt] = useState(false)
  
  useEffect(() => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    
    // Check if element is in "looking zone" (center 60% of viewport)
    const lookingZoneTop = viewportHeight * 0.2
    const lookingZoneBottom = viewportHeight * 0.8
    
    const elementTop = rect.top
    const elementBottom = rect.bottom
    
    setIsLookingAt(
      elementTop < lookingZoneBottom && 
      elementBottom > lookingZoneTop
    )
  }, [globalPhase.viewportPosition])

  const isHesitating = globalPhase.isPaused && globalPhase.pauseDuration > 200
  const lookingAt = isHesitating && isLookingAt

  return (
    <div ref={ref} className={className}>
      {children({ 
        isHesitating, 
        hesitationDuration: globalPhase.pauseDuration,
        lookingAt 
      })}
    </div>
  )
}

export { type ScrollPhase, type ScrollPhaseState, type ElementPhaseState }
