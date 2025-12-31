'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, AnimatePresence, PanInfo } from 'framer-motion'
import { useInteraction } from '@/lib/InteractionIntelligence'

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 MOBILE-FIRST DOMINANCE SYSTEM
// "I have never seen a mobile website behave like this"
// ═══════════════════════════════════════════════════════════════════════════════

// THUMB ZONE OPTIMIZATION
const THUMB_ZONES = {
  easy: { top: 0.5, bottom: 1 },      // Bottom 50% - easy reach
  medium: { top: 0.25, bottom: 0.5 }, // Middle area
  hard: { top: 0, bottom: 0.25 }      // Top 25% - hard to reach
}

// ═══════════════════════════════════════════════════════════════════════════════
// 👆 TOUCH RIPPLE EFFECT
// Premium touch feedback
// ═══════════════════════════════════════════════════════════════════════════════

interface TouchRippleProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function TouchRipple({ children, className = '', color = 'rgba(168, 85, 247, 0.3)' }: TouchRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  const handleTouch = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    setRipples(prev => [...prev, { id: Date.now(), x, y, size }])
  }

  return (
    <div 
      className={`relative overflow-hidden touch-manipulation ${className}`}
      onTouchStart={handleTouch}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples(prev => prev.filter(r => r.id !== ripple.id))
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background: `radial-gradient(circle, ${color}, transparent 70%)`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 THUMB-ZONE AWARE BUTTON
// Buttons that know where they are on screen
// ═══════════════════════════════════════════════════════════════════════════════

interface ThumbZoneButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function ThumbZoneButton({ children, onClick, className = '', variant = 'primary' }: ThumbZoneButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { state } = useInteraction()
  const [zone, setZone] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [isPressed, setIsPressed] = useState(false)

  const scale = useSpring(1, { stiffness: 500, damping: 25 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (!ref.current || !state.device.isMobile) return

    const rect = ref.current.getBoundingClientRect()
    const relativeY = rect.top / state.device.viewportHeight

    if (relativeY >= THUMB_ZONES.easy.top) {
      setZone('easy')
    } else if (relativeY >= THUMB_ZONES.medium.top) {
      setZone('medium')
    } else {
      setZone('hard')
    }
  }, [state.device.isMobile, state.device.viewportHeight])

  const handleTouchStart = () => {
    setIsPressed(true)
    scale.set(0.95)
    // Haptic-like visual feedback based on zone
    if (zone === 'hard') {
      y.set(-3) // Slight lift for hard-to-reach buttons
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
    scale.set(1)
    y.set(0)
    onClick?.()
  }

  // Larger touch target for harder zones
  const touchTargetPadding = zone === 'hard' ? 'p-5' : zone === 'medium' ? 'p-4' : 'p-3'

  const variants = {
    primary: 'bg-gradient-to-r from-primary via-primary/90 to-accent text-white',
    secondary: 'bg-secondary/20 border border-primary/30 text-white',
    ghost: 'bg-transparent text-white'
  }

  return (
    <TouchRipple>
      <motion.button
        ref={ref}
        className={`relative rounded-xl font-medium ${touchTargetPadding} ${variants[variant]} ${className}`}
        style={{ scale, y }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}
      >
        {children}
        
        {/* Zone indicator (dev mode) */}
        {process.env.NODE_ENV === 'development' && state.device.isMobile && (
          <span className="absolute top-0 right-0 text-[8px] opacity-30">
            {zone}
          </span>
        )}
      </motion.button>
    </TouchRipple>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌊 SWIPE CAROUSEL
// Premium swipeable content
// ═══════════════════════════════════════════════════════════════════════════════

interface SwipeCarouselProps {
  children: React.ReactNode[]
  className?: string
  onSlideChange?: (index: number) => void
}

export function SwipeCarousel({ children, className = '', onSlideChange }: SwipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { state } = useInteraction()
  const constraintsRef = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const opacity = useSpring(1, { stiffness: 200, damping: 25 })

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.x

    if (info.offset.x > threshold || velocity > 500) {
      // Swipe right - go to previous
      if (currentIndex > 0) {
        setCurrentIndex(prev => {
          const newIndex = prev - 1
          onSlideChange?.(newIndex)
          return newIndex
        })
      }
    } else if (info.offset.x < -threshold || velocity < -500) {
      // Swipe left - go to next
      if (currentIndex < children.length - 1) {
        setCurrentIndex(prev => {
          const newIndex = prev + 1
          onSlideChange?.(newIndex)
          return newIndex
        })
      }
    }
  }

  // React to swipe intent
  useEffect(() => {
    if (state.touch.gesturePhase === 'move') {
      opacity.set(1 - state.touch.swipeIntent * 0.3)
    } else {
      opacity.set(1)
    }
  }, [state.touch.gesturePhase, state.touch.swipeIntent, opacity])

  return (
    <div ref={constraintsRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ opacity }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            className="min-w-full"
            animate={{
              scale: index === currentIndex ? 1 : 0.9,
              opacity: index === currentIndex ? 1 : 0.5
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <motion.button
            key={index}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: index === currentIndex ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.3)',
              scale: index === currentIndex ? 1.2 : 1
            }}
            onClick={() => {
              setCurrentIndex(index)
              onSlideChange?.(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🔄 PULL TO REFRESH ILLUSION
// Simulated pull-to-refresh for perceived interactivity
// ═══════════════════════════════════════════════════════════════════════════════

interface PullToRevealProps {
  children: React.ReactNode
  revealContent: React.ReactNode
  className?: string
}

export function PullToReveal({ children, revealContent, className = '' }: PullToRevealProps) {
  const [pullProgress, setPullProgress] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const { state } = useInteraction()
  const startY = useRef(0)

  const revealY = useSpring(0, { stiffness: 200, damping: 25 })
  const revealOpacity = useSpring(0, { stiffness: 300, damping: 30 })

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY > 0) return

    const deltaY = e.touches[0].clientY - startY.current
    if (deltaY > 0) {
      const progress = Math.min(deltaY / 150, 1)
      setPullProgress(progress)
      revealY.set(progress * 50)
      revealOpacity.set(progress)
    }
  }

  const handleTouchEnd = () => {
    if (pullProgress > 0.7) {
      setIsRevealed(true)
      setTimeout(() => setIsRevealed(false), 2000)
    }
    setPullProgress(0)
    revealY.set(0)
    revealOpacity.set(0)
  }

  return (
    <div
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Reveal content */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ y: revealY, opacity: revealOpacity }}
      >
        <div className="transform -translate-y-full py-4">
          {revealContent}
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y: revealY }}>
        {children}
      </motion.div>

      {/* Pull indicator */}
      <AnimatePresence>
        {pullProgress > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2"
          >
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center"
              animate={{ rotate: pullProgress * 360 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: pullProgress }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📍 HAPTIC FEEDBACK SIMULATION
// Visual haptic feedback for touch interactions
// ═══════════════════════════════════════════════════════════════════════════════

interface HapticFeedbackProps {
  children: React.ReactNode
  intensity?: 'light' | 'medium' | 'heavy'
  className?: string
}

export function HapticFeedback({ children, intensity = 'medium', className = '' }: HapticFeedbackProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  const scale = useSpring(1, { stiffness: 600, damping: 15 })
  const blur = useSpring(0, { stiffness: 500, damping: 20 })

  const intensityConfig = {
    light: { scale: 0.98, blur: 0.5, duration: 50 },
    medium: { scale: 0.96, blur: 1, duration: 80 },
    heavy: { scale: 0.94, blur: 2, duration: 120 }
  }

  const triggerHaptic = useCallback(() => {
    const config = intensityConfig[intensity]
    setTriggered(true)
    scale.set(config.scale)
    blur.set(config.blur)

    // Vibration API if available
    if (navigator.vibrate) {
      navigator.vibrate(config.duration)
    }

    setTimeout(() => {
      scale.set(1)
      blur.set(0)
      setTriggered(false)
    }, config.duration)
  }, [intensity, scale, blur])

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{ scale }}
      onTouchStart={triggerHaptic}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🎭 GESTURE-AWARE CARD
// Card that responds to mobile gestures
// ═══════════════════════════════════════════════════════════════════════════════

interface GestureCardProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onLongPress?: () => void
}

export function GestureCard({ 
  children, 
  className = '',
  onSwipeLeft,
  onSwipeRight,
  onLongPress
}: GestureCardProps) {
  const { state } = useInteraction()
  const [gestureState, setGestureState] = useState<'idle' | 'swiping' | 'longpress'>('idle')
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  const x = useSpring(0, { stiffness: 300, damping: 25 })
  const rotate = useSpring(0, { stiffness: 300, damping: 20 })
  const scale = useSpring(1, { stiffness: 400, damping: 30 })
  const opacity = useSpring(1, { stiffness: 300, damping: 25 })

  // Track swipe progress
  useEffect(() => {
    if (state.touch.gesturePhase === 'move') {
      setGestureState('swiping')
      
      const direction = state.touch.touchDirection
      const intent = state.touch.swipeIntent

      if (direction === 'left' || direction === 'right') {
        x.set(direction === 'right' ? intent * 100 : -intent * 100)
        rotate.set(direction === 'right' ? intent * 8 : -intent * 8)
        opacity.set(1 - intent * 0.5)
      }
    }
  }, [state.touch.gesturePhase, state.touch.touchDirection, state.touch.swipeIntent, x, rotate, opacity])

  // Handle gesture completion
  useEffect(() => {
    if (state.touch.gesturePhase === 'end' && gestureState === 'swiping') {
      const intent = state.touch.swipeIntent
      const direction = state.touch.touchDirection

      if (intent > 0.5) {
        if (direction === 'left') onSwipeLeft?.()
        if (direction === 'right') onSwipeRight?.()
      }

      // Reset
      x.set(0)
      rotate.set(0)
      scale.set(1)
      opacity.set(1)
      setGestureState('idle')
    }
  }, [state.touch.gesturePhase, gestureState, state.touch.swipeIntent, state.touch.touchDirection, x, rotate, scale, opacity, onSwipeLeft, onSwipeRight])

  const handleTouchStart = () => {
    scale.set(0.98)
    
    // Long press detection
    longPressTimer.current = setTimeout(() => {
      setGestureState('longpress')
      scale.set(0.95)
      onLongPress?.()
      
      // Visual feedback
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }, 500)
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
    
    if (gestureState !== 'swiping') {
      scale.set(1)
      setGestureState('idle')
    }
  }

  return (
    <motion.div
      className={`touch-manipulation ${className}`}
      style={{ x, rotate, scale, opacity }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      
      {/* Swipe hint indicators */}
      <AnimatePresence>
        {gestureState === 'swiping' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: state.touch.touchDirection === 'left' ? state.touch.swipeIntent : 0 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400"
            >
              ←
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: state.touch.touchDirection === 'right' ? state.touch.swipeIntent : 0 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-green-400"
            >
              →
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 MOBILE NAV DRAWER
// Gesture-driven navigation drawer
// ═══════════════════════════════════════════════════════════════════════════════

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const { state } = useInteraction()
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const backdropOpacity = useSpring(0, { stiffness: 200, damping: 25 })

  useEffect(() => {
    if (isOpen) {
      x.set(0)
      backdropOpacity.set(1)
    } else {
      x.set(-100)
      backdropOpacity.set(0)
    }
  }, [isOpen, x, backdropOpacity])

  // Close on swipe left
  useEffect(() => {
    if (isOpen && state.touch.gesturePhase === 'move' && state.touch.touchDirection === 'left') {
      const closeProgress = state.touch.swipeIntent
      x.set(-closeProgress * 100)
      backdropOpacity.set(1 - closeProgress)
    }

    if (isOpen && state.touch.gesturePhase === 'end' && state.touch.touchDirection === 'left') {
      if (state.touch.swipeIntent > 0.3) {
        onClose()
      } else {
        x.set(0)
        backdropOpacity.set(1)
      }
    }
  }, [isOpen, state.touch, x, backdropOpacity, onClose])

  if (!state.device.isMobile) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            style={{ opacity: backdropOpacity }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-[80%] max-w-sm bg-dark-900/95 backdrop-blur-xl z-50 overflow-y-auto"
            style={{ x: x.get() + '%' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
