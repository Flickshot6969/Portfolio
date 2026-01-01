'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 TACTILE FEEDBACK SYSTEM
// "It feels like I can TOUCH the interface"
// Ultra-premium haptic-like visual feedback that makes interactions feel physical
// ═══════════════════════════════════════════════════════════════════════════════

// Haptic-like spring configurations
const TACTILE_SPRINGS = {
  // Quick, snappy response - like a physical button
  button: { stiffness: 500, damping: 30, mass: 0.5 },
  // Elastic bounce - playful interactions
  bounce: { stiffness: 400, damping: 15, mass: 1 },
  // Heavy, deliberate - important actions
  heavy: { stiffness: 300, damping: 25, mass: 2 },
  // Light and responsive - subtle feedback
  light: { stiffness: 600, damping: 35, mass: 0.3 },
  // Magnetic snap - alignment feedback
  magnetic: { stiffness: 800, damping: 40, mass: 0.8 }
} as const

// ───────────────────────────────────────────────────────────────────────────────
// 🔘 TACTILE BUTTON
// Buttons that feel like real physical objects
// ───────────────────────────────────────────────────────────────────────────────

interface TactileButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'raised' | 'inset' | 'floating' | 'glass'
  haptic?: 'light' | 'medium' | 'heavy'
  disabled?: boolean
}

export function TactileButton({
  children,
  onClick,
  className = '',
  variant = 'raised',
  haptic = 'medium',
  disabled = false
}: TactileButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const scale = useSpring(1, TACTILE_SPRINGS.button)
  const y = useSpring(0, TACTILE_SPRINGS.button)
  const shadow = useSpring(15, TACTILE_SPRINGS.button)
  const brightness = useSpring(1, TACTILE_SPRINGS.light)

  // Haptic intensity affects animation magnitude
  const intensity = { light: 0.3, medium: 0.6, heavy: 1 }[haptic]

  useEffect(() => {
    if (disabled) return

    if (isPressed) {
      scale.set(1 - (0.04 * intensity))
      y.set(3 * intensity)
      shadow.set(5)
      brightness.set(0.9)
    } else if (isHovered) {
      scale.set(1 + (0.02 * intensity))
      y.set(-2 * intensity)
      shadow.set(25)
      brightness.set(1.05)
    } else {
      scale.set(1)
      y.set(0)
      shadow.set(15)
      brightness.set(1)
    }
  }, [isPressed, isHovered, disabled, intensity])

  const variantStyles = {
    raised: `
      bg-gradient-to-b from-white/10 to-transparent
      border-t border-white/20
      shadow-lg shadow-black/20
    `,
    inset: `
      bg-gradient-to-b from-black/20 to-transparent
      shadow-inner shadow-black/30
    `,
    floating: `
      bg-slate-900/80 backdrop-blur-md
      border border-white/10
    `,
    glass: `
      bg-white/5 backdrop-blur-xl
      border border-white/20
      shadow-lg shadow-purple-500/10
    `
  }

  return (
    <motion.button
      className={`
        relative px-6 py-3 rounded-xl font-medium
        transition-colors duration-150
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        scale,
        y,
        filter: useTransform(brightness, b => `brightness(${b})`),
        boxShadow: useTransform(shadow, s => 
          variant === 'raised' 
            ? `0 ${s}px ${s * 2}px rgba(0,0,0,0.2)`
            : variant === 'floating'
            ? `0 ${s}px ${s * 3}px rgba(139,92,246,0.15)`
            : 'none'
        )
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Surface highlight */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: useTransform(brightness, b => 
            `linear-gradient(135deg, rgba(255,255,255,${(b - 1) * 0.3}) 0%, transparent 50%)`
          )
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎚️ TACTILE CARD
// Cards that respond to touch/hover with depth
// ───────────────────────────────────────────────────────────────────────────────

interface TactileCardProps {
  children: React.ReactNode
  className?: string
  tiltIntensity?: number
  liftOnHover?: boolean
  glowColor?: string
}

export function TactileCard({
  children,
  className = '',
  tiltIntensity = 15,
  liftOnHover = true,
  glowColor = 'rgba(139, 92, 246, 0.3)'
}: TactileCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(0, TACTILE_SPRINGS.light)
  const rotateY = useSpring(0, TACTILE_SPRINGS.light)
  const z = useSpring(0, TACTILE_SPRINGS.bounce)
  const glowOpacity = useSpring(0, TACTILE_SPRINGS.light)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Center-based rotation
    const rotX = (y - 0.5) * -tiltIntensity
    const rotY = (x - 0.5) * tiltIntensity

    rotateX.set(rotX)
    rotateY.set(rotY)
    glowX.set(x * 100)
    glowY.set(y * 100)
  }, [tiltIntensity])

  useEffect(() => {
    if (isHovered) {
      if (liftOnHover) z.set(20)
      glowOpacity.set(1)
    } else {
      rotateX.set(0)
      rotateY.set(0)
      z.set(0)
      glowOpacity.set(0)
    }
  }, [isHovered, liftOnHover])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        z,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, transparent 60%)`
          )
        }}
      />

      {/* Card content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom shadow for depth */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          boxShadow: useTransform(z, z => 
            `0 ${z}px ${z * 2}px rgba(0,0,0,0.2), 0 ${z/2}px ${z}px rgba(0,0,0,0.1)`
          )
        }}
      />
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 💫 TACTILE RIPPLE
// Ripple effect that feels like touching water
// ───────────────────────────────────────────────────────────────────────────────

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface TactileRippleProps {
  children: React.ReactNode
  className?: string
  rippleColor?: string
  duration?: number
}

export function TactileRipple({
  children,
  className = '',
  rippleColor = 'rgba(139, 92, 246, 0.4)',
  duration = 600
}: TactileRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const createRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    let x: number, y: number

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    // Size based on container
    const size = Math.max(rect.width, rect.height) * 2

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, duration)
  }, [duration])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={createRipple}
      onTouchStart={createRipple}
    >
      {children}

      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background: rippleColor
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🧲 MAGNETIC ELEMENT
// Elements that magnetically attract to cursor
// ───────────────────────────────────────────────────────────────────────────────

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
}

export function MagneticElement({
  children,
  className = '',
  strength = 0.3,
  radius = 100
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, TACTILE_SPRINGS.magnetic)
  const y = useSpring(0, TACTILE_SPRINGS.magnetic)
  const scale = useSpring(1, TACTILE_SPRINGS.magnetic)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < radius) {
        const factor = 1 - (distance / radius)
        x.set(distX * strength * factor)
        y.set(distY * strength * factor)
        scale.set(1 + (0.1 * factor))
      } else {
        x.set(0)
        y.set(0)
        scale.set(1)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [strength, radius])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, scale }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📏 ELASTIC DRAG
// Draggable elements with elastic boundaries
// ───────────────────────────────────────────────────────────────────────────────

interface ElasticDragProps {
  children: React.ReactNode
  className?: string
  constraintRef?: React.RefObject<HTMLElement>
  elasticity?: number
}

export function ElasticDrag({
  children,
  className = '',
  constraintRef,
  elasticity = 0.3
}: ElasticDragProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useSpring(1, TACTILE_SPRINGS.bounce)
  const rotate = useSpring(0, TACTILE_SPRINGS.bounce)

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{ x, y, scale, rotate }}
      drag
      dragConstraints={constraintRef || { top: -50, bottom: 50, left: -50, right: 50 }}
      dragElastic={elasticity}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
      onDragStart={() => {
        scale.set(1.05)
        rotate.set(-3)
      }}
      onDragEnd={() => {
        scale.set(1)
        rotate.set(0)
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎹 PRESSURE SENSITIVE
// Element that responds to "pressure" (hold duration)
// ───────────────────────────────────────────────────────────────────────────────

interface PressureSensitiveProps {
  children: React.ReactNode
  className?: string
  onPressComplete?: () => void
  pressDuration?: number
}

export function PressureSensitive({
  children,
  className = '',
  onPressComplete,
  pressDuration = 1000
}: PressureSensitiveProps) {
  const [pressure, setPressure] = useState(0)
  const [isPressing, setIsPressing] = useState(false)
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const startTime = useRef<number>(0)

  const scale = useSpring(1, TACTILE_SPRINGS.heavy)
  const ringProgress = useSpring(0, { stiffness: 100, damping: 20 })

  const handlePressStart = () => {
    setIsPressing(true)
    startTime.current = Date.now()
    scale.set(0.95)

    const updatePressure = () => {
      const elapsed = Date.now() - startTime.current
      const newPressure = Math.min(elapsed / pressDuration, 1)
      setPressure(newPressure)
      ringProgress.set(newPressure)

      if (newPressure < 1) {
        pressTimer.current = setTimeout(updatePressure, 16)
      } else {
        onPressComplete?.()
      }
    }

    pressTimer.current = setTimeout(updatePressure, 16)
  }

  const handlePressEnd = () => {
    setIsPressing(false)
    if (pressTimer.current) clearTimeout(pressTimer.current)
    setPressure(0)
    scale.set(1)
    ringProgress.set(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ scale }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {/* Pressure ring indicator */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="rgba(139, 92, 246, 0.6)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            pathLength: ringProgress,
            opacity: useTransform(ringProgress, [0, 0.1], [0, 1])
          }}
        />
      </svg>

      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🔊 PHYSICAL FEEDBACK
// Comprehensive physical feedback wrapper
// ───────────────────────────────────────────────────────────────────────────────

interface PhysicalFeedbackProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  feedbackType?: 'tap' | 'press' | 'drag' | 'magnetic'
}

export function PhysicalFeedback({
  children,
  className = '',
  onClick,
  feedbackType = 'tap'
}: PhysicalFeedbackProps) {
  const [interaction, setInteraction] = useState<'idle' | 'hover' | 'active'>('idle')
  
  const y = useSpring(0, TACTILE_SPRINGS.button)
  const scale = useSpring(1, TACTILE_SPRINGS.button)
  const blur = useSpring(0, TACTILE_SPRINGS.light)

  useEffect(() => {
    switch (interaction) {
      case 'hover':
        y.set(-2)
        scale.set(1.02)
        blur.set(0)
        break
      case 'active':
        y.set(2)
        scale.set(0.98)
        blur.set(0.5)
        break
      default:
        y.set(0)
        scale.set(1)
        blur.set(0)
    }
  }, [interaction])

  return (
    <motion.div
      className={className}
      style={{
        y,
        scale,
        filter: useTransform(blur, b => b > 0 ? `blur(${b}px)` : 'none')
      }}
      onMouseEnter={() => setInteraction('hover')}
      onMouseLeave={() => setInteraction('idle')}
      onMouseDown={() => setInteraction('active')}
      onMouseUp={() => setInteraction('hover')}
      onTouchStart={() => setInteraction('active')}
      onTouchEnd={() => setInteraction('idle')}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ⚡ SNAP TO GRID
// Elements that snap to an invisible grid
// ───────────────────────────────────────────────────────────────────────────────

interface SnapToGridProps {
  children: React.ReactNode
  className?: string
  gridSize?: number
}

export function SnapToGrid({
  children,
  className = '',
  gridSize = 50
}: SnapToGridProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const snapX = useSpring(0, TACTILE_SPRINGS.magnetic)
  const snapY = useSpring(0, TACTILE_SPRINGS.magnetic)

  const handleDragEnd = () => {
    const currentX = x.get()
    const currentY = y.get()

    const snappedX = Math.round(currentX / gridSize) * gridSize
    const snappedY = Math.round(currentY / gridSize) * gridSize

    snapX.set(snappedX - currentX)
    snapY.set(snappedY - currentY)
  }

  return (
    <motion.div
      className={className}
      style={{
        x: useTransform([x, snapX], ([xVal, snapVal]: number[]) => xVal + snapVal),
        y: useTransform([y, snapY], ([yVal, snapVal]: number[]) => yVal + snapVal)
      }}
      drag
      onDrag={() => {
        snapX.set(0)
        snapY.set(0)
      }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

export default {
  TactileButton,
  TactileCard,
  TactileRipple,
  MagneticElement,
  ElasticDrag,
  PressureSensitive,
  PhysicalFeedback,
  SnapToGrid,
  TACTILE_SPRINGS
}
