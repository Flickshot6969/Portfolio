'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useAnimationFrame } from 'framer-motion'
import { useScrollPhase, PhaseElement, HesitationAware } from '@/lib/ScrollPhaseEngine'
import { 
  GestureReactiveSection, 
  MobileReveal, 
  PressureButton, 
  TapRipple,
  InertiaScroll 
} from '@/lib/TouchGestureSystem'
import { CinematicButton, CinematicCard, CinematicSection } from '@/lib/CinematicMotion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 SHOWCASE COMPONENTS
// Over-engineered implementations with full state lifecycles
// Entry → Idle → Interaction → Exit behaviors defined
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ULTRA BUTTON - Full lifecycle showcase
// ═══════════════════════════════════════════════════════════════════════════════

type UltraButtonState = 
  | 'dormant'      // Not in view
  | 'awakening'    // Entering viewport
  | 'ready'        // Visible, waiting
  | 'approach'     // Cursor approaching (100-200px)
  | 'proximity'    // Cursor near (50-100px)
  | 'hover'        // Cursor on button
  | 'press'        // Mouse down
  | 'release'      // Mouse up, ripple
  | 'cooldown'     // Post-click settle

interface UltraButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export function UltraButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: UltraButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [state, setState] = useState<UltraButtonState>('dormant')
  const [isInView, setIsInView] = useState(false)
  const [clickPoint, setClickPoint] = useState({ x: 50, y: 50 })
  const cooldownRef = useRef<NodeJS.Timeout | null>(null)

  // ENTRY: Multi-stage springs for different lifecycle phases
  const entryScale = useSpring(0.8, { stiffness: 200, damping: 20 })
  const entryOpacity = useSpring(0, { stiffness: 150, damping: 25 })
  const entryY = useSpring(30, { stiffness: 180, damping: 22 })
  const entryBlur = useSpring(10, { stiffness: 120, damping: 30 })

  // INTERACTION: High-frequency springs for responsiveness
  const interactScale = useSpring(1, { stiffness: 500, damping: 25 })
  const interactX = useSpring(0, { stiffness: 200, damping: 15 }) // magnetic
  const interactY = useSpring(0, { stiffness: 200, damping: 15 })
  
  // VISUAL: Glow, depth, shimmer
  const glowIntensity = useSpring(0, { stiffness: 300, damping: 25 })
  const depthShadow = useSpring(0, { stiffness: 250, damping: 20 })
  const shimmerX = useSpring(0, { stiffness: 100, damping: 40 })
  const innerScale = useSpring(1, { stiffness: 400, damping: 20 })
  const borderGlow = useSpring(0, { stiffness: 200, damping: 25 })

  // ENTRY BEHAVIOR: Observe viewport intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          setState('awakening')
          
          // Phase 1: Awakening (200ms)
          entryScale.set(0.9)
          entryOpacity.set(0.5)
          entryY.set(15)
          entryBlur.set(5)
          
          // Phase 2: Rising (400ms)
          setTimeout(() => {
            entryScale.set(0.98)
            entryOpacity.set(0.85)
            entryY.set(5)
            entryBlur.set(2)
          }, 200)
          
          // Phase 3: Ready (600ms)
          setTimeout(() => {
            setState('ready')
            entryScale.set(1)
            entryOpacity.set(1)
            entryY.set(0)
            entryBlur.set(0)
          }, 500)
        }
      },
      { threshold: 0.3 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isInView, entryScale, entryOpacity, entryY, entryBlur])

  // IDLE BEHAVIOR: Subtle breathing when ready
  const breatheScale = useMotionValue(1)
  useAnimationFrame((time) => {
    if (state === 'ready') {
      breatheScale.set(1 + Math.sin(time / 3000) * 0.008)
    }
  })

  // APPROACH DETECTION: Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || state === 'dormant' || state === 'awakening') return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      )
      
      // State transitions based on distance
      if (distance < 50 && state !== 'hover' && state !== 'press' && state !== 'release') {
        setState('proximity')
        interactScale.set(1.03)
        glowIntensity.set(0.4)
        borderGlow.set(0.5)
        
        // Magnetic pull
        const pullX = (e.clientX - centerX) * 0.15
        const pullY = (e.clientY - centerY) * 0.15
        interactX.set(pullX)
        interactY.set(pullY)
        
      } else if (distance >= 50 && distance < 150 && state === 'ready') {
        setState('approach')
        interactScale.set(1.015)
        glowIntensity.set(0.15)
        borderGlow.set(0.2)
        
      } else if (distance >= 150 && (state === 'approach' || state === 'proximity')) {
        setState('ready')
        interactScale.set(1)
        glowIntensity.set(0)
        interactX.set(0)
        interactY.set(0)
        borderGlow.set(0)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [state, interactScale, glowIntensity, interactX, interactY, borderGlow])

  // INTERACTION HANDLERS
  const handleMouseEnter = () => {
    if (state === 'press' || state === 'release') return
    setState('hover')
    interactScale.set(1.05)
    glowIntensity.set(0.6)
    depthShadow.set(1)
    shimmerX.set(100)
    borderGlow.set(0.7)
  }

  const handleMouseLeave = () => {
    if (state === 'press' || state === 'release') return
    setState('ready')
    interactScale.set(1)
    glowIntensity.set(0)
    depthShadow.set(0)
    interactX.set(0)
    interactY.set(0)
    shimmerX.set(0)
    borderGlow.set(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setClickPoint({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      })
    }
    
    setState('press')
    interactScale.set(0.95)
    innerScale.set(0.9)
    depthShadow.set(0.3)
    glowIntensity.set(1)
  }

  const handleMouseUp = () => {
    setState('release')
    interactScale.set(1.08)
    innerScale.set(1.05)
    
    // Release → Cooldown → Ready
    setTimeout(() => {
      setState('cooldown')
      interactScale.set(1.02)
      innerScale.set(1)
    }, 150)
    
    cooldownRef.current = setTimeout(() => {
      setState('hover')
      interactScale.set(1.05)
    }, 400)
    
    onClick?.()
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearTimeout(cooldownRef.current)
    }
  }, [])

  const variantStyles = {
    primary: {
      bg: 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600',
      glow: 'rgba(139, 92, 246, 0.5)',
      text: 'text-white'
    },
    secondary: {
      bg: 'bg-slate-900/90 border border-slate-700/50',
      glow: 'rgba(148, 163, 184, 0.3)',
      text: 'text-slate-100'
    }
  }

  const v = variantStyles[variant]

  return (
    <motion.button
      ref={ref}
      disabled={state === 'dormant' || state === 'awakening'}
      className={`
        relative overflow-hidden px-8 py-4 rounded-2xl font-semibold
        ${v.bg} ${v.text} ${className}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={{
        scale: useTransform([entryScale, interactScale, breatheScale], 
          ([e, i, b]) => (e as number) * (i as number) * (b as number)
        ),
        opacity: entryOpacity,
        y: useTransform([entryY, interactY], ([e, i]) => (e as number) + (i as number)),
        x: interactX,
        filter: useTransform(entryBlur, v => `blur(${v}px)`),
        boxShadow: useTransform(
          depthShadow,
          d => `0 ${4 + d * 20}px ${15 + d * 30}px rgba(0, 0, 0, ${0.2 + d * 0.2}),
                0 0 ${d * 50}px -10px ${v.glow}`
        )
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-state={state}
    >
      {/* Shimmer layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transform: useTransform(shimmerX, v => `translateX(${v - 100}%)`),
          opacity: useTransform(shimmerX, v => v > 0 && v < 100 ? 1 : 0)
        }}
      />
      
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: glowIntensity,
          background: `radial-gradient(circle at ${clickPoint.x}% ${clickPoint.y}%, ${v.glow}, transparent 70%)`
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: borderGlow,
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)'
        }}
      />
      
      {/* Ripple on release */}
      <AnimatePresence>
        {state === 'release' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: `${clickPoint.x}%`,
              top: `${clickPoint.y}%`,
              width: 50,
              height: 50,
              marginLeft: -25,
              marginTop: -25
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
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
// 🃏 ULTRA CARD - Full lifecycle showcase
// ═══════════════════════════════════════════════════════════════════════════════

type UltraCardState = 
  | 'dormant'
  | 'awakening'
  | 'visible'
  | 'idle'
  | 'hover'
  | 'pressed'
  | 'focus'

interface UltraCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  delay?: number
  glowColor?: string
}

export function UltraCard({ 
  children, 
  className = '',
  onClick,
  delay = 0,
  glowColor = 'rgba(139, 92, 246, 0.3)'
}: UltraCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<UltraCardState>('dormant')
  const [hasEntered, setHasEntered] = useState(false)
  const idleRef = useRef<NodeJS.Timeout | null>(null)

  // Entry springs
  const entryY = useSpring(80, { stiffness: 150, damping: 20, mass: 1 })
  const entryOpacity = useSpring(0, { stiffness: 120, damping: 25 })
  const entryScale = useSpring(0.85, { stiffness: 180, damping: 22 })
  const entryRotateX = useSpring(-10, { stiffness: 200, damping: 25 })
  const entryBlur = useSpring(20, { stiffness: 100, damping: 30 })

  // Hover springs
  const hoverY = useSpring(0, { stiffness: 400, damping: 30 })
  const hoverScale = useSpring(1, { stiffness: 350, damping: 25 })
  const hoverRotateX = useSpring(0, { stiffness: 250, damping: 20 })
  const hoverRotateY = useSpring(0, { stiffness: 250, damping: 20 })

  // Visual springs
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 })
  const shadowDepth = useSpring(0, { stiffness: 250, damping: 30 })
  const innerGlow = useSpring(0, { stiffness: 180, damping: 25 })
  const borderOpacity = useSpring(0, { stiffness: 300, damping: 25 })

  // ENTRY BEHAVIOR
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true)
          
          setTimeout(() => {
            // Awakening
            setState('awakening')
            entryY.set(50)
            entryOpacity.set(0.3)
            entryScale.set(0.9)
            entryRotateX.set(-5)
            entryBlur.set(10)
            
            // Visible
            setTimeout(() => {
              setState('visible')
              entryY.set(15)
              entryOpacity.set(0.7)
              entryScale.set(0.97)
              entryRotateX.set(-2)
              entryBlur.set(3)
            }, 200)
            
            // Idle
            setTimeout(() => {
              setState('idle')
              entryY.set(0)
              entryOpacity.set(1)
              entryScale.set(1)
              entryRotateX.set(0)
              entryBlur.set(0)
            }, 450)
          }, delay)
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px' }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasEntered, delay, entryY, entryOpacity, entryScale, entryRotateX, entryBlur])

  // IDLE BREATHING
  const breatheScale = useMotionValue(1)
  const breatheY = useMotionValue(0)
  
  useAnimationFrame((time) => {
    if (state === 'idle') {
      breatheScale.set(1 + Math.sin(time / 4000) * 0.005)
      breatheY.set(Math.sin(time / 3000) * 2)
    }
  })

  // INTERACTION HANDLERS
  const handleMouseEnter = () => {
    if (idleRef.current) clearTimeout(idleRef.current)
    setState('hover')
    hoverY.set(-12)
    hoverScale.set(1.02)
    glowOpacity.set(0.7)
    shadowDepth.set(1)
    innerGlow.set(0.4)
    borderOpacity.set(0.6)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || state !== 'hover') return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    hoverRotateX.set(y * -12)
    hoverRotateY.set(x * 12)
  }

  const handleMouseLeave = () => {
    hoverY.set(0)
    hoverScale.set(1)
    hoverRotateX.set(0)
    hoverRotateY.set(0)
    glowOpacity.set(0)
    shadowDepth.set(0)
    innerGlow.set(0)
    borderOpacity.set(0)
    
    idleRef.current = setTimeout(() => setState('idle'), 300)
  }

  const handleMouseDown = () => {
    setState('pressed')
    hoverScale.set(0.98)
    shadowDepth.set(0.3)
  }

  const handleMouseUp = () => {
    setState('hover')
    hoverScale.set(1.02)
    shadowDepth.set(1)
    onClick?.()
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        y: useTransform([entryY, hoverY, breatheY], 
          ([e, h, b]) => (e as number) + (h as number) + (b as number)
        ),
        opacity: entryOpacity,
        scale: useTransform([entryScale, hoverScale, breatheScale],
          ([e, h, b]) => (e as number) * (h as number) * (b as number)
        ),
        rotateX: useTransform([entryRotateX, hoverRotateX], 
          ([e, h]) => (e as number) + (h as number)
        ),
        rotateY: hoverRotateY,
        filter: useTransform(entryBlur, v => `blur(${v}px)`),
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        boxShadow: useTransform(
          shadowDepth,
          d => `0 ${15 + d * 30}px ${40 + d * 40}px -15px rgba(0, 0, 0, ${0.25 + d * 0.2}),
                0 0 ${d * 60}px -20px ${glowColor}`
        )
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-state={state}
    >
      {/* Top glow */}
      <motion.div
        className="absolute -inset-px rounded-inherit pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${glowColor}, transparent 60%)`
        }}
      />
      
      {/* Inner highlight */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: innerGlow,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)'
        }}
      />
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity: borderOpacity,
          boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.15)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📐 ULTRA SECTION - Full lifecycle showcase  
// ═══════════════════════════════════════════════════════════════════════════════

type UltraSectionPhase = 
  | 'dormant'
  | 'awakening'  
  | 'rising'
  | 'apex'
  | 'anchored'
  | 'departing'

interface UltraSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function UltraSection({ children, className = '', id }: UltraSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<UltraSectionPhase>('dormant')
  const lastScrollY = useRef(0)
  const scrollVelocity = useRef(0)
  const pauseStart = useRef<number | null>(null)

  // Phase springs
  const sectionOpacity = useSpring(0.2, { stiffness: 80, damping: 25 })
  const sectionScale = useSpring(0.97, { stiffness: 120, damping: 20 })
  const contentY = useSpring(40, { stiffness: 100, damping: 22 })
  const backgroundOpacity = useSpring(0, { stiffness: 60, damping: 30 })

  // Track scroll velocity
  useEffect(() => {
    let lastTime = Date.now()
    
    const handleScroll = () => {
      const now = Date.now()
      const dt = now - lastTime
      const dy = Math.abs(window.scrollY - lastScrollY.current)
      
      scrollVelocity.current = dy / dt
      lastScrollY.current = window.scrollY
      lastTime = now
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Phase detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        const velocity = scrollVelocity.current
        const isPaused = velocity < 0.1
        
        // Track pause duration
        if (isPaused) {
          if (!pauseStart.current) pauseStart.current = Date.now()
        } else {
          pauseStart.current = null
        }
        
        const pauseDuration = pauseStart.current 
          ? Date.now() - pauseStart.current 
          : 0
        
        // PHASE STATE MACHINE
        let newPhase: UltraSectionPhase = phase
        
        if (ratio === 0) {
          newPhase = 'dormant'
        } else if (ratio < 0.15) {
          newPhase = entry.boundingClientRect.top > 0 ? 'awakening' : 'departing'
        } else if (ratio < 0.4) {
          newPhase = 'rising'
        } else if (ratio < 0.7) {
          newPhase = 'apex'
        } else {
          newPhase = isPaused && pauseDuration > 300 ? 'anchored' : 'apex'
        }
        
        if (newPhase !== phase) {
          setPhase(newPhase)
          
          // PHASE-SPECIFIC ANIMATIONS
          switch (newPhase) {
            case 'dormant':
              sectionOpacity.set(0.2)
              sectionScale.set(0.97)
              contentY.set(40)
              backgroundOpacity.set(0)
              break
              
            case 'awakening':
              sectionOpacity.set(0.4)
              sectionScale.set(0.98)
              contentY.set(25)
              backgroundOpacity.set(0.2)
              break
              
            case 'rising':
              sectionOpacity.set(0.75)
              sectionScale.set(0.99)
              contentY.set(10)
              backgroundOpacity.set(0.5)
              break
              
            case 'apex':
              sectionOpacity.set(0.95)
              sectionScale.set(1.005)
              contentY.set(0)
              backgroundOpacity.set(0.8)
              break
              
            case 'anchored':
              sectionOpacity.set(1)
              sectionScale.set(1)
              contentY.set(0)
              backgroundOpacity.set(1)
              break
              
            case 'departing':
              sectionOpacity.set(0.6)
              sectionScale.set(0.98)
              contentY.set(-20)
              backgroundOpacity.set(0.3)
              break
          }
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [phase, sectionOpacity, sectionScale, contentY, backgroundOpacity])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: sectionOpacity,
        scale: sectionScale
      }}
      data-phase={phase}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: backgroundOpacity,
          background: 'radial-gradient(ellipse 100% 70% at 50% 30%, rgba(139, 92, 246, 0.08), transparent)'
        }}
      />
      
      {/* Content with Y offset */}
      <motion.div className="relative z-10" style={{ y: contentY }}>
        {children}
      </motion.div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 MOBILE-FIRST ULTRA COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

export function MobileUltraButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: UltraButtonProps) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 && 'ontouchstart' in window)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 && 'ontouchstart' in window)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <TapRipple className="inline-block">
        <PressureButton onClick={onClick} variant={variant} className={className}>
          {children}
        </PressureButton>
      </TapRipple>
    )
  }

  return (
    <UltraButton onClick={onClick} variant={variant} className={className}>
      {children}
    </UltraButton>
  )
}

export { GestureReactiveSection, MobileReveal, InertiaScroll }
