'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ AMBIENT PARTICLE SYSTEMS
// Living, breathing background that makes the site feel alive
// Floating particles, constellation connections, interactive response
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 🌌 FLOATING PARTICLES - Basic ambient particle system
// ───────────────────────────────────────────────────────────────────────────────

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  speed?: number
  className?: string
  interactive?: boolean
  connectDistance?: number
  showConnections?: boolean
}

export function FloatingParticles({
  count = 50,
  colors = ['rgba(99, 102, 241, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(217, 70, 239, 0.4)'],
  minSize = 2,
  maxSize = 6,
  speed = 0.5,
  className = '',
  interactive = true,
  connectDistance = 150,
  showConnections = true
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const frameRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
    }

    if (dimensions.width && dimensions.height) {
      initParticles()
    }
  }, [count, colors, minSize, maxSize, speed, dimensions])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
        canvasRef.current.width = rect.width
        canvasRef.current.height = rect.height
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvasRef.current?.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [interactive])

  // Animation loop
  useAnimationFrame(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current

    // Update and draw particles
    particles.forEach((p, i) => {
      // Update position
      p.x += p.vx
      p.y += p.vy

      // Mouse interaction
      if (interactive && mouseRef.current.active) {
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }
      }

      // Boundary wrapping
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      // Speed limit
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (currentSpeed > speed * 2) {
        p.vx = (p.vx / currentSpeed) * speed * 2
        p.vy = (p.vy / currentSpeed) * speed * 2
      }

      // Draw connections
      if (showConnections) {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = p.x - other.x
          const dy = p.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / connectDistance)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
    })
  })

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.8 }}
    />
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌠 CONSTELLATION BACKGROUND - Stars with constellation patterns
// ───────────────────────────────────────────────────────────────────────────────

interface ConstellationBackgroundProps {
  starCount?: number
  className?: string
  animated?: boolean
}

export function ConstellationBackground({
  starCount = 100,
  className = '',
  animated = true
}: ConstellationBackgroundProps) {
  const stars = useMemo(() => 
    Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    })),
    [starCount]
  )

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={animated ? {
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌊 WAVE PARTICLES - Particles that flow in wave patterns
// ───────────────────────────────────────────────────────────────────────────────

interface WaveParticlesProps {
  count?: number
  className?: string
  color?: string
  amplitude?: number
  frequency?: number
}

export function WaveParticles({
  count = 30,
  className = '',
  color = 'rgba(139, 92, 246, 0.4)',
  amplitude = 50,
  frequency = 0.02
}: WaveParticlesProps) {
  const [particles, setParticles] = useState<Array<{ id: number; baseX: number; baseY: number; size: number }>>([])
  const timeRef = useRef(0)

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        baseX: (i / count) * 100,
        baseY: 50,
        size: Math.random() * 4 + 2
      }))
    )
  }, [count])

  useAnimationFrame((time) => {
    timeRef.current = time / 1000
  })

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles.map(p => {
        const offsetY = Math.sin(p.baseX * frequency + timeRef.current) * amplitude
        const offsetX = Math.cos(p.baseX * frequency * 0.5 + timeRef.current * 0.5) * 20
        
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.baseX + offsetX}%`,
              top: `calc(${p.baseY}% + ${offsetY}px)`,
              width: p.size,
              height: p.size,
              background: color,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: p.id * 0.1
            }}
          />
        )
      })}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 💫 AURORA EFFECT - Flowing aurora borealis background
// ───────────────────────────────────────────────────────────────────────────────

interface AuroraEffectProps {
  className?: string
  colors?: string[]
  intensity?: number
}

export function AuroraEffect({
  className = '',
  colors = ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4'],
  intensity = 0.3
}: AuroraEffectProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '150%',
            height: '50%',
            left: '-25%',
            top: `${i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: intensity,
            filter: 'blur(100px)',
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: [0, 30, 0],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🔮 GRADIENT ORB - Floating gradient orb with movement
// ───────────────────────────────────────────────────────────────────────────────

interface GradientOrbProps {
  className?: string
  colors?: string[]
  size?: number
  blur?: number
  position?: { x: number; y: number }
  moveRange?: number
}

export function GradientOrb({
  className = '',
  colors = ['rgba(99, 102, 241, 0.4)', 'rgba(139, 92, 246, 0.3)'],
  size = 400,
  blur = 100,
  position = { x: 50, y: 50 },
  moveRange = 50
}: GradientOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left: `${position.x}%`,
        top: `${position.y}%`,
        translateX: '-50%',
        translateY: '-50%',
        background: `radial-gradient(circle, ${colors.join(', ')}, transparent)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        x: [-moveRange, moveRange, -moveRange],
        y: [-moveRange / 2, moveRange / 2, -moveRange / 2],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎆 BURST PARTICLES - Particles that burst from a point
// ───────────────────────────────────────────────────────────────────────────────

interface BurstParticle {
  id: number
  angle: number
  distance: number
  size: number
  opacity: number
}

interface ParticleBurstProps {
  x: number
  y: number
  count?: number
  color?: string
  onComplete?: () => void
}

export function ParticleBurst({
  x,
  y,
  count = 20,
  color = 'rgba(139, 92, 246, 0.8)',
  onComplete
}: ParticleBurstProps) {
  const particles: BurstParticle[] = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2,
      distance: Math.random() * 100 + 50,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.5
    })),
    [count]
  )

  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 1000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div 
      className="fixed pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: p.opacity,
            scale: 1 
          }}
          animate={{ 
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌀 VORTEX PARTICLES - Particles spiraling in a vortex
// ───────────────────────────────────────────────────────────────────────────────

interface VortexParticlesProps {
  className?: string
  count?: number
  color?: string
}

export function VortexParticles({
  className = '',
  count = 40,
  color = 'rgba(139, 92, 246, 0.5)'
}: VortexParticlesProps) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      radius: 100 + Math.random() * 200,
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 3 + 1
    })),
    [count]
  )

  const time = useMotionValue(0)
  
  useAnimationFrame((t) => {
    time.set(t / 1000)
  })

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {particles.map(p => {
          const angle = time.get() * p.speed + p.offset
          const x = Math.cos(angle) * p.radius
          const y = Math.sin(angle) * p.radius * 0.4 // Elliptical

          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: color,
                x,
                y,
                opacity: 0.5 + Math.sin(angle) * 0.3
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🏔️ NOISE GRADIENT - Animated noise-based gradient
// ───────────────────────────────────────────────────────────────────────────────

interface NoiseGradientProps {
  className?: string
}

export function NoiseGradient({ className = '' }: NoiseGradientProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-30">
        <defs>
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="4" 
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05" />
      </svg>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎇 COMBINED AMBIENT BACKGROUND - All effects together
// ───────────────────────────────────────────────────────────────────────────────

interface AmbientBackgroundProps {
  className?: string
  particles?: boolean
  constellation?: boolean
  aurora?: boolean
  noise?: boolean
  orbs?: boolean
}

export function AmbientBackground({
  className = '',
  particles = true,
  constellation = false,
  aurora = true,
  noise = true,
  orbs = true
}: AmbientBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {aurora && <AuroraEffect intensity={0.2} />}
      
      {orbs && (
        <>
          <GradientOrb 
            position={{ x: 20, y: 30 }} 
            size={500}
            colors={['rgba(99, 102, 241, 0.3)', 'transparent']}
          />
          <GradientOrb 
            position={{ x: 80, y: 70 }} 
            size={400}
            colors={['rgba(217, 70, 239, 0.2)', 'transparent']}
          />
        </>
      )}
      
      {constellation && <ConstellationBackground starCount={80} />}
      
      {particles && (
        <FloatingParticles 
          count={40} 
          interactive={true}
          showConnections={true}
          connectDistance={120}
        />
      )}
      
      {noise && <NoiseGradient />}
    </div>
  )
}

export default {
  FloatingParticles,
  ConstellationBackground,
  WaveParticles,
  AuroraEffect,
  GradientOrb,
  ParticleBurst,
  VortexParticles,
  NoiseGradient,
  AmbientBackground
}
