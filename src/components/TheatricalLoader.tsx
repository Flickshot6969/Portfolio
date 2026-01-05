'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 THEATRICAL PAGE LOADER
// A full-screen cinematic experience that makes visitors freeze
// Brand Mark → Name Reveal → Tagline → Curtain Rise → Content
// ═══════════════════════════════════════════════════════════════════════════════

interface TheatricalLoaderProps {
  onComplete: () => void
  brandName?: string
  tagline?: string
}

// Individual letter animation component
function AnimatedLetter({ 
  letter, 
  index, 
  totalLetters,
  isSpace = false 
}: { 
  letter: string
  index: number
  totalLetters: number
  isSpace?: boolean
}) {
  const delay = index * 0.08
  const midPoint = totalLetters / 2
  const _distanceFromCenter = Math.abs(index - midPoint)
  
  return (
    <motion.span
      className={`inline-block ${isSpace ? 'w-3' : ''}`}
      initial={{ 
        y: 100, 
        opacity: 0,
        rotateX: -90,
        filter: 'blur(10px)'
      }}
      animate={{ 
        y: 0, 
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)'
      }}
      transition={{
        delay: 0.8 + delay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.span
        className="inline-block"
        animate={{
          textShadow: [
            '0 0 0 rgba(99, 102, 241, 0)',
            '0 0 30px rgba(99, 102, 241, 0.8)',
            '0 0 10px rgba(99, 102, 241, 0.4)',
          ]
        }}
        transition={{
          delay: 1.2 + delay,
          duration: 1,
          times: [0, 0.5, 1]
        }}
      >
        {letter}
      </motion.span>
    </motion.span>
  )
}

// Particle system for ambient drama
function LoaderParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, -100],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// Central logo/brand mark animation
function BrandMark() {
  const rotateY = useMotionValue(0)
  const springRotate = useSpring(rotateY, { stiffness: 100, damping: 30 })
  
  useAnimationFrame((time) => {
    rotateY.set(Math.sin(time / 1000) * 10)
  })

  return (
    <motion.div
      className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8 mx-auto"
      initial={{ scale: 0, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ 
        rotateY: springRotate,
        transformStyle: 'preserve-3d' 
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)',
          filter: 'blur(15px)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      
      {/* Inner mark */}
      <motion.div
        className="absolute inset-1.5 sm:inset-2 rounded-full bg-slate-950 flex items-center justify-center"
        style={{ 
          boxShadow: '0 0 40px rgba(99, 102, 241, 0.5), inset 0 0 30px rgba(99, 102, 241, 0.2)'
        }}
      >
        <motion.span
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        >
          DP
        </motion.span>
      </motion.div>
      
      {/* Orbiting accent */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{
          top: '50%',
          left: '50%',
          transformOrigin: '0 0',
          filter: 'blur(1px)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Curtain reveal effect
function CurtainReveal({ isRevealing }: { isRevealing: boolean }) {
  return (
    <>
      {/* Top curtain */}
      <motion.div
        className="fixed top-0 left-0 right-0 bg-slate-950 z-50"
        style={{ 
          height: '50vh',
          background: 'linear-gradient(to bottom, #020617 0%, #0a0f1a 100%)',
        }}
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? '-100%' : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, transparent 0%, #0a0f1a 100%)',
          }}
        />
      </motion.div>
      
      {/* Bottom curtain */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-slate-950 z-50"
        style={{ 
          height: '50vh',
          background: 'linear-gradient(to top, #020617 0%, #0a0f1a 100%)',
        }}
        initial={{ y: 0 }}
        animate={{ y: isRevealing ? '100%' : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0a0f1a 100%)',
          }}
        />
      </motion.div>
    </>
  )
}

// Progress indicator
function LoadingProgress({ progress }: { progress: number }) {
  return (
    <motion.div
      className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-36 sm:w-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <motion.p
        className="text-center text-xs text-slate-500 mt-2 font-mono"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Initializing experience...
      </motion.p>
    </motion.div>
  )
}

export function TheatricalLoader({ 
  onComplete, 
  brandName = "Dev Patel",
  tagline = "Crafting Digital Excellence"
}: TheatricalLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'brand' | 'name' | 'tagline' | 'reveal' | 'complete'>('loading')
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    // Simulated loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    // Phase progression - faster on mobile
    const mobileTimings = [200, 600, 1000, 1400, 2000]
    const desktopTimings = [300, 1200, 2400, 3800, 5200]
    const timings = isMobile ? mobileTimings : desktopTimings

    const timers = [
      setTimeout(() => setPhase('brand'), timings[0]),
      setTimeout(() => setPhase('name'), timings[1]),
      setTimeout(() => setPhase('tagline'), timings[2]),
      setTimeout(() => setPhase('reveal'), timings[3]),
      setTimeout(() => {
        setPhase('complete')
        onComplete()
      }, timings[4]),
    ]

    return () => {
      clearInterval(progressInterval)
      timers.forEach(clearTimeout)
    }
  }, [onComplete, isMobile])

  const nameLetters = brandName.split('')
  const taglineWords = tagline.split(' ')

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <>
          <CurtainReveal isRevealing={phase === 'reveal'} />
          
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 px-4 sm:px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              minWidth: '100vw',
            }}
          >
            {/* Background gradient - static on mobile */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
              }}
              animate={isMobile ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Particles only on desktop */}
            {!isMobile && <LoaderParticles />}

            {/* Brand mark */}
            {phase !== 'loading' && <BrandMark />}

            {/* Name reveal */}
            <AnimatePresence>
              {(phase === 'name' || phase === 'tagline' || phase === 'reveal') && (
                <motion.h1
                  className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 perspective-1000 text-center"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {nameLetters.map((letter, i) => (
                    <AnimatedLetter
                      key={i}
                      letter={letter}
                      index={i}
                      totalLetters={nameLetters.length}
                      isSpace={letter === ' '}
                    />
                  ))}
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Tagline reveal */}
            <AnimatePresence>
              {(phase === 'tagline' || phase === 'reveal') && (
                <motion.div
                  className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-sm sm:text-lg md:text-xl text-slate-400 text-center px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {taglineWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ 
                        opacity: 0, 
                        y: 20,
                        filter: 'blur(10px)'
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        filter: 'blur(0px)'
                      }}
                      transition={{
                        delay: 0.5 + i * 0.15,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            {phase === 'loading' && <LoadingProgress progress={progress} />}

            {/* Skip hint */}
            <motion.button
              className="absolute bottom-8 text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => {
                setPhase('reveal')
                setTimeout(() => {
                  setPhase('complete')
                  onComplete()
                }, 1200)
              }}
            >
              Click to skip →
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TheatricalLoader
