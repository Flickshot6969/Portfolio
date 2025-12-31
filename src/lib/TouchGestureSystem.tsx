'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🖐️ TOUCH GESTURE INTELLIGENCE
// Mobile interactions that feel impossible — swipe prediction, momentum curves
// ═══════════════════════════════════════════════════════════════════════════════

interface TouchVector {
  x: number
  y: number
  timestamp: number
  pressure?: number
}

interface GestureState {
  phase: 'idle' | 'touch' | 'drag' | 'swipe' | 'release' | 'settling'
  startPoint: TouchVector | null
  currentPoint: TouchVector | null
  velocity: { x: number; y: number }
  acceleration: { x: number; y: number }
  direction: 'up' | 'down' | 'left' | 'right' | 'none'
  swipeIntent: number // 0-1 prediction of swipe completion
  dragDistance: number
  dragAngle: number
  isMultiTouch: boolean
  touchCount: number
}

const defaultGesture: GestureState = {
  phase: 'idle',
  startPoint: null,
  currentPoint: null,
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  direction: 'none',
  swipeIntent: 0,
  dragDistance: 0,
  dragAngle: 0,
  isMultiTouch: false,
  touchCount: 0
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎮 GESTURE-REACTIVE SECTION
// Sections that respond to touch gestures with fluid, physics-based motion
// ═══════════════════════════════════════════════════════════════════════════════

interface GestureReactiveSectionProps {
  children: React.ReactNode
  className?: string
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void
  dragResistance?: number // 0-1, how much to resist dragging
}

export function GestureReactiveSection({ 
  children, 
  className = '',
  onSwipe,
  dragResistance = 0.3
}: GestureReactiveSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [gesture, setGesture] = useState<GestureState>(defaultGesture)
  const touchHistory = useRef<TouchVector[]>([])
  
  // Physics springs
  const x = useSpring(0, { stiffness: 400, damping: 40, mass: 0.5 })
  const y = useSpring(0, { stiffness: 400, damping: 40, mass: 0.5 })
  const scale = useSpring(1, { stiffness: 500, damping: 30 })
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 })

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const point: TouchVector = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      pressure: (touch as any).force || 0.5
    }
    
    touchHistory.current = [point]
    
    setGesture({
      ...defaultGesture,
      phase: 'touch',
      startPoint: point,
      currentPoint: point,
      isMultiTouch: e.touches.length > 1,
      touchCount: e.touches.length
    })
    
    scale.set(0.98)
  }, [scale])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (gesture.phase === 'idle') return
    
    const touch = e.touches[0]
    const point: TouchVector = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      pressure: (touch as any).force || 0.5
    }
    
    touchHistory.current.push(point)
    if (touchHistory.current.length > 10) {
      touchHistory.current.shift()
    }
    
    // Calculate velocity from recent history
    const recentPoints = touchHistory.current.slice(-3)
    let vx = 0, vy = 0
    if (recentPoints.length >= 2) {
      const dt = (recentPoints[recentPoints.length - 1].timestamp - recentPoints[0].timestamp) / 1000
      if (dt > 0) {
        vx = (recentPoints[recentPoints.length - 1].x - recentPoints[0].x) / dt
        vy = (recentPoints[recentPoints.length - 1].y - recentPoints[0].y) / dt
      }
    }
    
    // Drag distance and angle
    const dx = point.x - (gesture.startPoint?.x || 0)
    const dy = point.y - (gesture.startPoint?.y || 0)
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    
    // Determine primary direction
    let direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none'
    if (distance > 20) {
      const absAngle = Math.abs(angle)
      if (absAngle < 45) direction = 'right'
      else if (absAngle > 135) direction = 'left'
      else if (angle > 0) direction = 'down'
      else direction = 'up'
    }
    
    // Swipe intent prediction (0-1)
    const swipeThreshold = 100
    const velocityMagnitude = Math.sqrt(vx * vx + vy * vy)
    const swipeIntent = Math.min(1, (distance / swipeThreshold) * 0.5 + (velocityMagnitude / 500) * 0.5)
    
    setGesture(prev => ({
      ...prev,
      phase: distance > 10 ? 'drag' : 'touch',
      currentPoint: point,
      velocity: { x: vx, y: vy },
      direction,
      swipeIntent,
      dragDistance: distance,
      dragAngle: angle,
      isMultiTouch: e.touches.length > 1,
      touchCount: e.touches.length
    }))
    
    // Apply resistance to movement
    const resistedDx = dx * (1 - dragResistance)
    const resistedDy = dy * (1 - dragResistance)
    
    x.set(resistedDx * 0.3)
    y.set(resistedDy * 0.3)
    rotateX.set(resistedDy * -0.05)
    rotateY.set(resistedDx * 0.05)
  }, [gesture, dragResistance, x, y, rotateX, rotateY])

  const handleTouchEnd = useCallback(() => {
    const { velocity, direction, swipeIntent, dragDistance } = gesture
    const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)
    
    // Detect swipe
    if (swipeIntent > 0.6 || (dragDistance > 80 && velocityMagnitude > 300)) {
      setGesture(prev => ({ ...prev, phase: 'swipe' }))
      onSwipe?.(direction as any)
      
      // Momentum carry
      const momentumMultiplier = 0.15
      x.set(velocity.x * momentumMultiplier)
      y.set(velocity.y * momentumMultiplier)
    }
    
    // Reset with settling animation
    setGesture(prev => ({ ...prev, phase: 'settling' }))
    scale.set(1)
    
    setTimeout(() => {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
      setGesture(defaultGesture)
    }, 50)
    
    touchHistory.current = []
  }, [gesture, onSwipe, x, y, scale, rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      className={`touch-none ${className}`}
      style={{
        x,
        y,
        scale,
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-gesture-phase={gesture.phase}
      data-swipe-intent={gesture.swipeIntent.toFixed(2)}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 MOBILE-OPTIMIZED REVEAL
// Entry animations designed specifically for thumb-scroll behavior
// ═══════════════════════════════════════════════════════════════════════════════

interface MobileRevealProps {
  children: React.ReactNode
  className?: string
  variant?: 'rise' | 'slide' | 'morph' | 'snap'
  delay?: number
}

export function MobileReveal({ 
  children, 
  className = '',
  variant = 'rise',
  delay = 0
}: MobileRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Different spring configs for each variant
  const springConfigs = {
    rise: { stiffness: 200, damping: 25, mass: 0.8 },
    slide: { stiffness: 300, damping: 30, mass: 0.5 },
    morph: { stiffness: 150, damping: 20, mass: 1 },
    snap: { stiffness: 600, damping: 35, mass: 0.3 }
  }
  
  const config = springConfigs[variant]
  
  const y = useSpring(variant === 'slide' ? 0 : 60, config)
  const x = useSpring(variant === 'slide' ? -40 : 0, config)
  const opacity = useSpring(0, { stiffness: 200, damping: 30 })
  const scale = useSpring(variant === 'morph' ? 0.8 : variant === 'snap' ? 0.95 : 1, config)
  const blur = useSpring(variant === 'morph' ? 15 : 0, config)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      { threshold: 0.2, rootMargin: '-10% 0px' }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, hasAnimated])

  useEffect(() => {
    if (isVisible) {
      // Animate to final state
      y.set(0)
      x.set(0)
      opacity.set(1)
      scale.set(1)
      blur.set(0)
    }
  }, [isVisible, y, x, opacity, scale, blur])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        x,
        opacity,
        scale,
        filter: useTransform(blur, v => `blur(${v}px)`)
      }}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎚️ PRESSURE-SENSITIVE BUTTON
// Responds to touch pressure (3D Touch / Force Touch) with depth
// ═══════════════════════════════════════════════════════════════════════════════

interface PressureButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export function PressureButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}: PressureButtonProps) {
  const [pressure, setPressure] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  
  const scale = useSpring(1, { stiffness: 500, damping: 30 })
  const depth = useSpring(0, { stiffness: 400, damping: 25 })
  const glow = useSpring(0, { stiffness: 300, damping: 30 })
  const innerY = useSpring(0, { stiffness: 600, damping: 35 })

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPressed(true)
    const touch = e.touches[0] as any
    const force = touch.force || 0.5
    setPressure(force)
    
    scale.set(0.95 - force * 0.05)
    depth.set(force * 10)
    glow.set(force)
    innerY.set(force * 3)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPressed) return
    const touch = e.touches[0] as any
    const force = touch.force || pressure
    setPressure(force)
    
    scale.set(0.95 - force * 0.05)
    depth.set(force * 10)
    glow.set(force)
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
    scale.set(1)
    depth.set(0)
    glow.set(0)
    innerY.set(0)
    onClick?.()
  }

  const baseStyles = variant === 'primary' 
    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600'
    : 'bg-slate-800/80 border border-slate-700'

  return (
    <motion.button
      className={`relative px-8 py-4 rounded-2xl font-semibold overflow-hidden touch-none ${baseStyles} ${className}`}
      style={{
        scale,
        boxShadow: useTransform(
          depth, 
          v => `0 ${4 + v}px ${12 + v * 2}px rgba(0, 0, 0, ${0.3 + v * 0.03}), 
                inset 0 ${-v * 0.5}px ${v}px rgba(0, 0, 0, 0.2)`
        )
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => { scale.set(0.95); depth.set(5); glow.set(0.5) }}
      onMouseUp={() => { scale.set(1); depth.set(0); glow.set(0); onClick?.() }}
      onMouseLeave={() => { scale.set(1); depth.set(0); glow.set(0) }}
    >
      {/* Glow layer */}
      <motion.div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: glow,
          background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4), transparent 70%)'
        }}
      />
      
      {/* Inner content with pressure depth */}
      <motion.span 
        className="relative z-10 flex items-center justify-center gap-2 text-white"
        style={{ y: innerY }}
      >
        {children}
      </motion.span>
      
      {/* Pressure indicator ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: useTransform(glow, v => v * 0.5),
          border: '2px solid rgba(255, 255, 255, 0.3)',
          scale: useTransform(depth, v => 1 + v * 0.01)
        }}
      />
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌀 INERTIA SCROLL SECTION
// Custom inertia scrolling within a section (horizontal scroll, carousels)
// ═══════════════════════════════════════════════════════════════════════════════

interface InertiaScrollProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  snapPoints?: number[] // Positions to snap to
}

export function InertiaScroll({ 
  children, 
  className = '',
  direction = 'horizontal',
  snapPoints = []
}: InertiaScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const position = useSpring(0, { 
    stiffness: 100, 
    damping: 20,
    mass: 1
  })
  
  const dragStart = useRef<{ pos: number; scroll: number } | null>(null)
  const velocity = useRef(0)
  const lastPos = useRef(0)
  const lastTime = useRef(Date.now())

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    
    const pos = direction === 'horizontal' ? e.clientX : e.clientY
    dragStart.current = { pos, scroll: position.get() }
    lastPos.current = pos
    lastTime.current = Date.now()
    velocity.current = 0
    
    position.stop()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStart.current) return
    
    const pos = direction === 'horizontal' ? e.clientX : e.clientY
    const delta = pos - dragStart.current.pos
    const now = Date.now()
    const dt = now - lastTime.current
    
    if (dt > 0) {
      velocity.current = (pos - lastPos.current) / dt * 1000
    }
    
    lastPos.current = pos
    lastTime.current = now
    
    position.set(dragStart.current.scroll + delta)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Apply inertia
    const currentPos = position.get()
    const projectedPos = currentPos + velocity.current * 0.3
    
    // Find nearest snap point
    if (snapPoints.length > 0) {
      const nearestSnap = snapPoints.reduce((prev, curr) => 
        Math.abs(curr - projectedPos) < Math.abs(prev - projectedPos) ? curr : prev
      )
      position.set(nearestSnap)
    } else {
      position.set(projectedPos)
    }
    
    dragStart.current = null
    velocity.current = 0
  }

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden touch-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <motion.div
        ref={contentRef}
        className={direction === 'horizontal' ? 'flex' : 'flex flex-col'}
        style={{
          x: direction === 'horizontal' ? position : 0,
          y: direction === 'vertical' ? position : 0,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👆 TAP RIPPLE EFFECT
// iOS-style ripple that expands from touch point
// ═══════════════════════════════════════════════════════════════════════════════

interface TapRippleProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function TapRipple({ children, className = '', color = 'rgba(255, 255, 255, 0.3)' }: TapRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleTouch = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    setRipples(prev => [...prev, { id: Date.now(), x, y }])
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouch}
      onMouseDown={handleTouch}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
              background: color
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 THUMB ZONE AWARENESS
// Positions interactive elements within comfortable thumb reach on mobile
// ═══════════════════════════════════════════════════════════════════════════════

interface ThumbZoneProps {
  children: React.ReactNode
  className?: string
  zone?: 'easy' | 'stretch' | 'hard' // Areas of screen reachability
}

export function ThumbZone({ children, className = '', zone = 'easy' }: ThumbZoneProps) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 && 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Zone positioning for right-handed user
  const zoneStyles = {
    easy: 'md:static', // Bottom right corner on mobile
    stretch: 'md:static', // Middle areas
    hard: 'md:static' // Top left corner
  }

  const mobileStyles = isMobile ? {
    easy: 'fixed bottom-4 right-4 z-50',
    stretch: 'relative',
    hard: 'relative'
  }[zone] : ''

  return (
    <div className={`${zoneStyles[zone]} ${mobileStyles} ${className}`}>
      {children}
    </div>
  )
}

export { type GestureState, type TouchVector }
