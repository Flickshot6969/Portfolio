'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// ✨ KINETIC TYPOGRAPHY SYSTEM
// Text that feels alive - character animations, cursor reactions, gradient waves
// Makes visitors freeze when they see headings come alive
// ═══════════════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────────────
// 🔤 ANIMATED TEXT - Character-by-character reveal with physics
// ───────────────────────────────────────────────────────────────────────────────

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  variant?: 'slide' | 'fade' | 'scale' | 'rotate' | 'glitch' | 'wave'
  once?: boolean
}

export function AnimatedText({ 
  text, 
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  variant = 'slide',
  once = true
}: AnimatedTextProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once])

  const characters = text.split('')

  const variants = {
    slide: {
      hidden: { y: 100, opacity: 0, rotateX: -80 },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        rotateX: 0,
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }
      })
    },
    fade: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: (i: number) => ({
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }
      })
    },
    scale: {
      hidden: { scale: 0, opacity: 0 },
      visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }
      })
    },
    rotate: {
      hidden: { rotateY: -90, opacity: 0 },
      visible: (i: number) => ({
        rotateY: 0,
        opacity: 1,
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }
      })
    },
    glitch: {
      hidden: { x: 0, opacity: 0 },
      visible: (i: number) => ({
        x: [20, -10, 5, -2, 0],
        opacity: 1,
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.4,
          times: [0, 0.25, 0.5, 0.75, 1],
        }
      })
    },
    wave: {
      hidden: { y: 0, opacity: 0 },
      visible: (i: number) => ({
        y: [30, -15, 8, -3, 0],
        opacity: 1,
        transition: {
          delay: delay + i * staggerDelay,
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }
      })
    }
  }

  return (
    <div ref={ref} className={`inline-block ${className}`} style={{ perspective: '1000px' }}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
          variants={variants[variant]}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={i}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌊 GRADIENT WAVE TEXT - Flowing color animation across text
// ───────────────────────────────────────────────────────────────────────────────

interface GradientWaveTextProps {
  text: string
  className?: string
  colors?: string[]
  speed?: number
}

export function GradientWaveText({ 
  text, 
  className = '',
  colors = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#6366f1'],
  speed = 3
}: GradientWaveTextProps) {
  const time = useMotionValue(0)
  
  useAnimationFrame((t) => {
    time.set(t / 1000)
  })

  const gradientPos = useTransform(time, (t) => `${(t * 50) % 200}%`)

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% 100%',
        backgroundPosition: gradientPos,
      }}
    >
      {text}
    </motion.span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🧲 MAGNETIC TEXT - Characters react to cursor proximity
// ───────────────────────────────────────────────────────────────────────────────

interface MagneticTextProps {
  text: string
  className?: string
  strength?: number
  radius?: number
}

export function MagneticText({ 
  text, 
  className = '',
  strength = 30,
  radius = 100
}: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const characters = text.split('')

  return (
    <div 
      ref={containerRef}
      className={`inline-flex ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {characters.map((char, i) => (
        <MagneticCharacter
          key={i}
          char={char}
          index={i}
          mousePos={mousePos}
          isHovering={isHovering}
          strength={strength}
          radius={radius}
          containerRef={containerRef}
        />
      ))}
    </div>
  )
}

function MagneticCharacter({
  char,
  index,
  mousePos,
  isHovering,
  strength,
  radius,
  containerRef
}: {
  char: string
  index: number
  mousePos: { x: number; y: number }
  isHovering: boolean
  strength: number
  radius: number
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 25 })
  const y = useSpring(0, { stiffness: 300, damping: 25 })
  const scale = useSpring(1, { stiffness: 400, damping: 20 })

  useEffect(() => {
    if (!ref.current || !containerRef.current || !isHovering) {
      x.set(0)
      y.set(0)
      scale.set(1)
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    
    const charCenterX = rect.left - containerRect.left + rect.width / 2
    const charCenterY = rect.top - containerRect.top + rect.height / 2

    const dx = mousePos.x - charCenterX
    const dy = mousePos.y - charCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < radius) {
      const force = (1 - distance / radius) * strength
      x.set(dx * force / distance * 0.5)
      y.set(dy * force / distance * 0.5)
      scale.set(1 + (1 - distance / radius) * 0.3)
    } else {
      x.set(0)
      y.set(0)
      scale.set(1)
    }
  }, [mousePos, isHovering, radius, strength, x, y, scale, containerRef])

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ 
        x, 
        y, 
        scale,
        whiteSpace: char === ' ' ? 'pre' : 'normal'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 💫 SCRAMBLE TEXT - Text that decodes/scrambles on hover
// ───────────────────────────────────────────────────────────────────────────────

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  characters?: string
}

export function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = useCallback(() => {
    let iteration = 0
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index]
            if (char === ' ') return ' '
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }

      iteration += 1 / 3
    }, scrambleSpeed)
  }, [text, scrambleSpeed, characters])

  useEffect(() => {
    if (isHovering) {
      scramble()
    } else {
      setDisplayText(text)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovering, scramble, text])

  return (
    <motion.span
      className={`font-mono ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </motion.span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎭 SPLIT TEXT - Words that split and reveal on hover
// ───────────────────────────────────────────────────────────────────────────────

interface SplitTextProps {
  text: string
  className?: string
  hoverColor?: string
}

export function SplitText({
  text,
  className = '',
  hoverColor = '#8b5cf6'
}: SplitTextProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="relative inline-block overflow-hidden"
          whileHover="hover"
        >
          {/* Original text */}
          <motion.span
            className="inline-block"
            variants={{
              hover: { y: '-100%' }
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          
          {/* Hover text */}
          <motion.span
            className="absolute left-0 top-full inline-block"
            style={{ color: hoverColor }}
            variants={{
              hover: { y: '-100%' }
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📝 TYPEWRITER TEXT - Classic typing effect with cursor
// ───────────────────────────────────────────────────────────────────────────────

interface TypewriterTextProps {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({
  texts,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🌈 RAINBOW TEXT - Each character cycles through colors
// ───────────────────────────────────────────────────────────────────────────────

interface RainbowTextProps {
  text: string
  className?: string
}

export function RainbowText({ text, className = '' }: RainbowTextProps) {
  const colors = [
    '#f43f5e', '#f97316', '#eab308', '#22c55e', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'
  ]

  const characters = text.split('')

  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            color: colors.map((_, ci) => colors[(i + ci) % colors.length])
          }}
          transition={{
            duration: colors.length * 0.5,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ⚡ GLITCH TEXT - Cyberpunk glitch effect on hover
// ───────────────────────────────────────────────────────────────────────────────

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.span
              className="absolute inset-0 text-cyan-400 z-0"
              initial={{ x: 0, opacity: 0 }}
              animate={{ 
                x: [-2, 2, -2, 1, 0],
                opacity: [0, 0.8, 0.8, 0.8, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              style={{ clipPath: 'inset(10% 0 60% 0)' }}
            >
              {text}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-red-400 z-0"
              initial={{ x: 0, opacity: 0 }}
              animate={{ 
                x: [2, -2, 2, -1, 0],
                opacity: [0, 0.8, 0.8, 0.8, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.05
              }}
              style={{ clipPath: 'inset(50% 0 20% 0)' }}
            >
              {text}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

export default {
  AnimatedText,
  GradientWaveText,
  MagneticText,
  ScrambleText,
  SplitText,
  TypewriterText,
  RainbowText,
  GlitchText
}
