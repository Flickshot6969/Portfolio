'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// Section reveal with cinematic entrance
interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1] // custom ease for premium feel
      }}
    >
      {children}
    </motion.div>
  )
}

// Heading with premium split animation
interface SplitHeadingProps {
  children: string
  className?: string
  gradient?: boolean
}

export function SplitHeading({ children, className = '', gradient = false }: SplitHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = children.split(' ')

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className={`inline-block ${gradient ? 'gradient-text' : ''}`}
            initial={{ y: '110%', rotateX: -80 }}
            animate={isInView ? { y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ transformOrigin: 'top' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

// Image with parallax zoom effect
interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
}

export function ParallaxImage({ src, alt, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale, y }}
      />
    </div>
  )
}

// Smooth number counter with easing
interface SmoothCounterProps {
  target: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function SmoothCounter({ 
  target, 
  suffix = '', 
  prefix = '', 
  className = '',
  duration = 2 
}: SmoothCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Card with 3D hover and depth
interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = '', intensity = 10 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    setRotateX((y - 0.5) * -intensity)
    setRotateY((x - 0.5) * intensity)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovering(false)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.02 : 1
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${105 + rotateY * 5}deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          borderRadius: 'inherit'
        }}
        animate={{ opacity: isHovering ? 1 : 0 }}
      />
    </motion.div>
  )
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })
  
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%'])

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          className="flex gap-8"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

// Scroll-linked opacity and scale
interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

export function ScrollFade({ children, className = '' }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  )
}

// Reveal mask effect
interface RevealMaskProps {
  children: React.ReactNode
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function RevealMask({ children, className = '', direction = 'up' }: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const getTransform = () => {
    switch (direction) {
      case 'left': return { x: '-100%', y: 0 }
      case 'right': return { x: '100%', y: 0 }
      case 'up': return { x: 0, y: '100%' }
      case 'down': return { x: 0, y: '-100%' }
    }
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={getTransform()}
        animate={isInView ? { x: 0, y: 0 } : getTransform()}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
