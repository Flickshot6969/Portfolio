'use client'

import React, { useEffect, useState, useRef, useCallback, createContext, useContext } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useAnimationFrame } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 ELITE CURSOR SYSTEM
// A completely over-engineered cursor that makes visitors feel magic
// Multiple layers, particle trails, context-aware morphing, magnetic snap
// ═══════════════════════════════════════════════════════════════════════════════

type EliteCursorState = 
  | 'default'
  | 'pointer'
  | 'text'
  | 'grab'
  | 'grabbing'
  | 'hidden'
  | 'expand'
  | 'magnetic'
  | 'loading'
  | 'view'
  | 'drag'

interface EliteCursorContextValue {
  setState: (state: EliteCursorState) => void
  setText: (text: string | null) => void
  setColor: (color: string | null) => void
  setScale: (scale: number) => void
}

const EliteCursorContext = createContext<EliteCursorContextValue | null>(null)

export function useEliteCursor() {
  const context = useContext(EliteCursorContext)
  return context
}

// ───────────────────────────────────────────────────────────────────────────────
// 💫 PARTICLE TRAIL SYSTEM
// ───────────────────────────────────────────────────────────────────────────────

interface Particle {
  id: number
  x: number
  y: number
  life: number
  maxLife: number
  size: number
  vx: number
  vy: number
}

function ParticleTrail({ 
  mouseX, 
  mouseY,
  isActive,
  color = 'rgba(139, 92, 246, 0.6)'
}: { 
  mouseX: number
  mouseY: number
  isActive: boolean
  color?: string
}) {
  const [particles, setParticles] = useState<Particle[]>([])
  const lastPos = useRef({ x: 0, y: 0 })
  const idCounter = useRef(0)

  useAnimationFrame(() => {
    // Calculate velocity
    const dx = mouseX - lastPos.current.x
    const dy = mouseY - lastPos.current.y
    const velocity = Math.sqrt(dx * dx + dy * dy)

    // Spawn particles based on velocity
    if (isActive && velocity > 2) {
      const newParticles: Particle[] = []
      const spawnCount = Math.min(Math.floor(velocity / 5), 3)
      
      for (let i = 0; i < spawnCount; i++) {
        newParticles.push({
          id: idCounter.current++,
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          life: 1,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 4,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 + 1, // slight upward drift
        })
      }
      
      setParticles(prev => [...prev.slice(-50), ...newParticles])
    }

    // Update existing particles
    setParticles(prev => 
      prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy - 0.05, // gravity/float
          life: p.life + 1,
        }))
        .filter(p => p.life < p.maxLife)
    )

    lastPos.current = { x: mouseX, y: mouseY }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size * (1 - p.life / p.maxLife),
            height: p.size * (1 - p.life / p.maxLife),
            background: color,
            opacity: 1 - p.life / p.maxLife,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎪 ELITE CURSOR PROVIDER
// ───────────────────────────────────────────────────────────────────────────────

interface EliteCursorProviderProps {
  children: React.ReactNode
  enableParticles?: boolean
  enableMagnetic?: boolean
}

export function EliteCursorProvider({ 
  children,
  enableParticles = true,
  enableMagnetic = true
}: EliteCursorProviderProps) {
  const [cursorState, setCursorState] = useState<EliteCursorState>('default')
  const [cursorText, setCursorText] = useState<string | null>(null)
  const [cursorColor, setCursorColor] = useState<string | null>(null)
  const [cursorScale, setCursorScale] = useState(1)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [rawMousePos, setRawMousePos] = useState({ x: 0, y: 0 })

  // Check for mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 
        window.matchMedia('(hover: none)').matches || 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      setIsMobile(isTouchDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Motion values for smooth cursor movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Different spring configs for different cursor layers
  const smoothX = useSpring(mouseX, { stiffness: 800, damping: 35 })
  const smoothY = useSpring(mouseY, { stiffness: 800, damping: 35 })
  
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 25 })
  
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Size and appearance springs
  const dotScale = useSpring(1, { stiffness: 500, damping: 25 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 20 })
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 25 })

  // Mouse tracking
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setRawMousePos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseDown = () => {
      setIsClicking(true)
      dotScale.set(0.8)
      ringScale.set(0.9)
    }
    const handleMouseUp = () => {
      setIsClicking(false)
      dotScale.set(1)
      ringScale.set(1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isMobile, mouseX, mouseY, isVisible, dotScale, ringScale])

  // Auto-detect cursor state from hovered elements
  useEffect(() => {
    if (isMobile) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for explicit data attributes
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') as EliteCursorState
      if (cursorType) {
        setCursorState(cursorType)
        const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
        setCursorText(text || null)
        const color = target.closest('[data-cursor-color]')?.getAttribute('data-cursor-color')
        setCursorColor(color || null)
        
        // Update visual springs
        if (cursorType === 'expand' || cursorType === 'view') {
          dotScale.set(2)
          ringScale.set(1.5)
          glowOpacity.set(0.5)
        } else if (cursorType === 'pointer') {
          dotScale.set(1.3)
          ringScale.set(1.2)
          glowOpacity.set(0.3)
        }
        return
      }

      // Auto-detect from element type
      if (target.closest('a, button, [role="button"], [onclick], .clickable')) {
        setCursorState('pointer')
        dotScale.set(1.3)
        ringScale.set(1.2)
        glowOpacity.set(0.3)
      } else if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorState('text')
        dotScale.set(0.5)
        ringScale.set(0.8)
      } else if (target.closest('[draggable="true"], .draggable')) {
        setCursorState('grab')
        dotScale.set(1.2)
        ringScale.set(1.3)
      } else if (target.closest('img, video, .media')) {
        setCursorState('view')
        setCursorText('View')
        dotScale.set(2)
        ringScale.set(1.5)
        glowOpacity.set(0.4)
      } else {
        setCursorState('default')
        setCursorText(null)
        setCursorColor(null)
        dotScale.set(1)
        ringScale.set(1)
        glowOpacity.set(0)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [isMobile, dotScale, ringScale, glowOpacity])

  const contextValue: EliteCursorContextValue = {
    setState: setCursorState,
    setText: setCursorText,
    setColor: setCursorColor,
    setScale: (scale) => {
      dotScale.set(scale)
      ringScale.set(scale)
    }
  }

  // Don't render cursor on mobile
  if (isMobile) return <>{children}</>

  return (
    <EliteCursorContext.Provider value={contextValue}>
      {/* Hide default cursor */}
      <style jsx global>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      
      {children}
      
      {/* Particle Trail */}
      {enableParticles && (
        <ParticleTrail
          mouseX={rawMousePos.x}
          mouseY={rawMousePos.y}
          isActive={cursorState === 'pointer' || cursorState === 'view' || isClicking}
          color={cursorColor || 'rgba(139, 92, 246, 0.5)'}
        />
      )}
      
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Glow layer - slowest, largest */}
            <motion.div
              className="fixed pointer-events-none z-[9991]"
              style={{
                x: glowX,
                y: glowY,
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: 100,
                  height: 100,
                  background: `radial-gradient(circle, ${cursorColor || 'rgba(139, 92, 246, 0.15)'} 0%, transparent 70%)`,
                  opacity: glowOpacity,
                }}
              />
            </motion.div>

            {/* Outer ring - medium speed */}
            <motion.div
              className="fixed pointer-events-none z-[9993]"
              style={{
                x: ringX,
                y: ringY,
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                className="rounded-full border"
                style={{
                  scale: ringScale,
                  borderColor: cursorColor || 'rgba(139, 92, 246, 0.5)',
                  borderWidth: 1,
                }}
                animate={{
                  width: cursorState === 'expand' || cursorState === 'view' ? 80 : 
                         cursorState === 'pointer' ? 50 : 
                         cursorState === 'text' ? 20 : 40,
                  height: cursorState === 'expand' || cursorState === 'view' ? 80 : 
                          cursorState === 'pointer' ? 50 : 
                          cursorState === 'text' ? 20 : 40,
                  opacity: cursorState === 'hidden' ? 0 : 0.6,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </motion.div>

            {/* Inner dot - fastest, most responsive */}
            <motion.div
              className="fixed pointer-events-none z-[9995] mix-blend-difference"
              style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                className="rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  scale: dotScale,
                  background: cursorState === 'text' ? 'transparent' : (cursorColor || '#fff'),
                }}
                animate={{
                  width: cursorState === 'text' ? 2 : 8,
                  height: cursorState === 'text' ? 24 : 8,
                  borderRadius: cursorState === 'text' ? 1 : 999,
                  opacity: cursorState === 'hidden' ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              >
                {cursorState === 'text' && (
                  <motion.div
                    className="w-full h-full bg-white"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Text label */}
            <AnimatePresence>
              {cursorText && (
                <motion.div
                  className="fixed pointer-events-none z-[9996] px-3 py-1.5 rounded-full bg-slate-900/95 backdrop-blur-sm text-white text-xs font-medium border border-white/10"
                  style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: cursorState === 'view' ? '-50%' : '15px',
                    translateY: cursorState === 'view' ? '-50%' : '-30px',
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {cursorText}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading state */}
            <AnimatePresence>
              {cursorState === 'loading' && (
                <motion.div
                  className="fixed pointer-events-none z-[9997]"
                  style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: cursorColor || '#8b5cf6',
                      borderRightColor: cursorColor || '#8b5cf6',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </EliteCursorContext.Provider>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🧲 MAGNETIC ELEMENT - Elements that attract cursor on hover
// ───────────────────────────────────────────────────────────────────────────────

interface MagneticElementProps {
  children: React.ReactNode
  strength?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function MagneticElement({ 
  children, 
  strength = 0.4,
  className = '',
  as: Component = 'div'
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })
  const scale = useSpring(1, { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
    scale.set(1.05)
  }, [strength, x, y, scale])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }, [x, y, scale])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 💡 SPOTLIGHT CONTAINER - Cursor creates a spotlight effect
// ───────────────────────────────────────────────────────────────────────────────

interface SpotlightContainerProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

export function SpotlightContainer({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.12)',
  spotlightSize = 400
}: SpotlightContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)
  const spotlightOpacity = useSpring(0, { stiffness: 200, damping: 25 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)
  }, [spotlightX, spotlightY])

  const handleMouseEnter = useCallback(() => {
    spotlightOpacity.set(1)
  }, [spotlightOpacity])

  const handleMouseLeave = useCallback(() => {
    spotlightOpacity.set(0)
  }, [spotlightOpacity])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: spotlightSize,
          height: spotlightSize,
          x: spotlightX,
          y: spotlightY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 60%)`,
          opacity: spotlightOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default {
  EliteCursorProvider,
  useEliteCursor,
  MagneticElement,
  SpotlightContainer
}
