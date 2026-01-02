'use client'

import React, { useEffect, useState, useRef, createContext, useContext } from 'react'
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 📖 NARRATIVE SCROLL SYSTEM
// "Scrolling through this portfolio feels like reading a story"
// Transform scroll into a cinematic storytelling experience
// ═══════════════════════════════════════════════════════════════════════════════

// NARRATIVE PHASES - Story arc through scroll
type NarrativePhase = 
  | 'prologue'      // Initial hook
  | 'introduction'  // Who am I
  | 'rising'        // Building interest (skills, experience)
  | 'climax'        // Peak moment (best work)
  | 'falling'       // Supporting evidence
  | 'resolution'    // Call to action
  | 'epilogue'      // Contact & close

interface NarrativeContextValue {
  currentPhase: NarrativePhase
  progress: number
  chapterProgress: number
  isTransitioning: boolean
  totalChapters: number
  currentChapter: number
}

const NarrativeContext = createContext<NarrativeContextValue | null>(null)

export function useNarrative() {
  const context = useContext(NarrativeContext)
  if (!context) {
    return {
      currentPhase: 'prologue' as NarrativePhase,
      progress: 0,
      chapterProgress: 0,
      isTransitioning: false,
      totalChapters: 7,
      currentChapter: 0
    }
  }
  return context
}

// ───────────────────────────────────────────────────────────────────────────────
// 📚 NARRATIVE PROVIDER
// Tracks scroll as a story progression
// ───────────────────────────────────────────────────────────────────────────────

interface NarrativeProviderProps {
  children: React.ReactNode
  chapters?: NarrativePhase[]
}

export function NarrativeProvider({ 
  children,
  chapters = ['prologue', 'introduction', 'rising', 'climax', 'falling', 'resolution', 'epilogue']
}: NarrativeProviderProps) {
  const { scrollYProgress } = useScroll()
  const [narrative, setNarrative] = useState<NarrativeContextValue>({
    currentPhase: 'prologue',
    progress: 0,
    chapterProgress: 0,
    isTransitioning: false,
    totalChapters: chapters.length,
    currentChapter: 0
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const chapterLength = 1 / chapters.length
      const currentChapter = Math.min(Math.floor(progress / chapterLength), chapters.length - 1)
      const chapterProgress = (progress % chapterLength) / chapterLength

      setNarrative(prev => ({
        ...prev,
        currentPhase: chapters[currentChapter],
        progress,
        chapterProgress,
        currentChapter,
        isTransitioning: chapterProgress < 0.1 || chapterProgress > 0.9
      }))
    })

    return () => unsubscribe()
  }, [scrollYProgress, chapters])

  return (
    <NarrativeContext.Provider value={narrative}>
      {children}
    </NarrativeContext.Provider>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📑 CHAPTER SECTION
// A section that acts as a chapter in the narrative
// ───────────────────────────────────────────────────────────────────────────────

interface ChapterSectionProps {
  children: React.ReactNode
  chapter: NarrativePhase
  className?: string
  transition?: 'fade' | 'slide' | 'scale' | 'reveal' | 'cinematic'
}

export function ChapterSection({
  children,
  chapter,
  className = '',
  transition = 'cinematic'
}: ChapterSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: '-20% 0px -20% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const transitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 }
    },
    reveal: {
      initial: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      animate: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
      exit: { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
    },
    cinematic: {
      initial: { opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' },
      animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -30, scale: 1.02, filter: 'blur(5px)' }
    }
  }

  return (
    <motion.section
      ref={ref}
      data-chapter={chapter}
      className={`min-h-screen ${className}`}
      initial={transitions[transition].initial}
      animate={isInView ? transitions[transition].animate : transitions[transition].initial}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎬 SCROLL SEQUENCE
// Content that reveals in sequence as you scroll
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollSequenceProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  revealType?: 'stagger' | 'cascade' | 'wave'
}

export function ScrollSequence({
  children,
  className = '',
  staggerDelay = 0.1,
  revealType = 'stagger'
}: ScrollSequenceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-10% 0px', once: true })

  const getAnimation = (index: number) => {
    switch (revealType) {
      case 'cascade':
        return {
          initial: { opacity: 0, y: 30 + index * 10, x: -20 },
          animate: { opacity: 1, y: 0, x: 0 }
        }
      case 'wave':
        return {
          initial: { opacity: 0, y: 20, rotateX: 15 },
          animate: { opacity: 1, y: 0, rotateX: 0 }
        }
      default: // stagger
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 }
        }
    }
  }

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          {...getAnimation(index)}
          animate={isInView ? getAnimation(index).animate : getAnimation(index).initial}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎭 DRAMATIC REVEAL
// Content that reveals with high drama
// ───────────────────────────────────────────────────────────────────────────────

interface DramaticRevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  intensity?: 'subtle' | 'normal' | 'dramatic'
}

export function DramaticReveal({
  children,
  className = '',
  direction = 'up',
  intensity = 'normal'
}: DramaticRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-15%', once: true })

  const intensityValues = {
    subtle: { distance: 30, scale: 0.98, blur: 5 },
    normal: { distance: 60, scale: 0.95, blur: 10 },
    dramatic: { distance: 100, scale: 0.9, blur: 20 }
  }

  const val = intensityValues[intensity]

  const directions = {
    up: { y: val.distance, x: 0 },
    down: { y: -val.distance, x: 0 },
    left: { y: 0, x: val.distance },
    right: { y: 0, x: -val.distance }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
        scale: val.scale,
        filter: `blur(${val.blur}px)`
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)'
      } : {
        opacity: 0,
        ...directions[direction],
        scale: val.scale,
        filter: `blur(${val.blur}px)`
      }}
      transition={{
        duration: intensity === 'dramatic' ? 1 : 0.7,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📜 PARALLAX STORY
// Parallax layers that tell a story
// ───────────────────────────────────────────────────────────────────────────────

interface ParallaxStoryProps {
  children: React.ReactNode
  className?: string
  layers?: number
  depth?: number
}

export function ParallaxStory({
  children,
  className = '',
  layers = 3,
  depth = 50
}: ParallaxStoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const childArray = React.Children.toArray(children)

  return (
    <div ref={ref} className={`relative ${className}`}>
      {childArray.map((child, index) => {
        const layerDepth = ((index / (childArray.length - 1)) - 0.5) * depth * 2
        const y = useTransform(scrollYProgress, [0, 1], [layerDepth, -layerDepth])

        return (
          <motion.div
            key={index}
            style={{ y }}
            className="relative"
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// ⏱️ SCROLL TIMELINE
// Visual timeline that progresses with scroll
// ───────────────────────────────────────────────────────────────────────────────

interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
}

interface ScrollTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function ScrollTimeline({ items, className = '' }: ScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 to-purple-500"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const itemProgress = useTransform(
            scrollYProgress,
            [(index / items.length), ((index + 1) / items.length)],
            [0, 1]
          )

          return (
            <motion.div
              key={index}
              className="relative pl-20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-6 w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-900"
                style={{
                  borderColor: useTransform(itemProgress, [0.3, 0.7], ['rgb(51, 65, 85)', 'rgb(139, 92, 246)']),
                  backgroundColor: useTransform(itemProgress, [0.5, 1], ['rgb(15, 23, 42)', 'rgb(139, 92, 246)'])
                }}
              />

              {/* Content */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                {item.date && (
                  <span className="text-sm text-violet-400 font-medium">{item.date}</span>
                )}
                <h3 className="text-xl font-semibold text-white mt-1">{item.title}</h3>
                {item.description && (
                  <p className="text-slate-400 mt-2">{item.description}</p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎯 FOCUS SCROLL
// Element gains focus as it enters center of viewport
// ───────────────────────────────────────────────────────────────────────────────

interface FocusScrollProps {
  children: React.ReactNode
  className?: string
  scaleRange?: [number, number]
  opacityRange?: [number, number]
}

export function FocusScroll({
  children,
  className = '',
  scaleRange = [0.9, 1],
  opacityRange = [0.5, 1]
}: FocusScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start']
  })

  // Create a bell curve effect - max at center
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleRange[0], scaleRange[1], scaleRange[0]]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityRange[0], opacityRange[1], opacityRange[0]]
  )

  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [5, 0, 5]
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        opacity,
        filter: useTransform(blur, b => `blur(${b}px)`)
      }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📊 SCROLL INDICATOR
// Visual indicator of scroll progress
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollIndicatorProps {
  position?: 'left' | 'right' | 'top' | 'bottom'
  showPercentage?: boolean
  showChapters?: boolean
  chapters?: string[]
}

export function ScrollIndicator({
  position = 'right',
  showPercentage = false,
  showChapters = true,
  chapters = ['Hero', 'About', 'Skills', 'Experience', 'Contact']
}: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll()
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })
  const percentage = useTransform(springProgress, [0, 1], [0, 100])

  const positionClasses = {
    left: 'left-4 top-1/2 -translate-y-1/2 flex-col',
    right: 'right-4 top-1/2 -translate-y-1/2 flex-col',
    top: 'top-4 left-1/2 -translate-x-1/2 flex-row',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2 flex-row'
  }

  const isVertical = position === 'left' || position === 'right'

  return (
    <motion.div
      className={`fixed z-50 flex gap-3 items-center ${positionClasses[position]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Progress bar */}
      <div className={`bg-slate-700/50 rounded-full backdrop-blur-sm ${isVertical ? 'w-1 h-32' : 'h-1 w-32'}`}>
        <motion.div
          className={`bg-gradient-to-b from-violet-500 to-purple-500 rounded-full ${isVertical ? 'w-full' : 'h-full'}`}
          style={isVertical ? { height: useTransform(springProgress, [0, 1], ['0%', '100%']) } : { width: useTransform(springProgress, [0, 1], ['0%', '100%']) }}
        />
      </div>

      {/* Chapter indicators */}
      {showChapters && (
        <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} gap-1`}>
          {chapters.map((chapter, i) => {
            const chapterProgress = i / (chapters.length - 1)
            return (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-slate-600"
                style={{
                  backgroundColor: useTransform(
                    springProgress,
                    [chapterProgress - 0.1, chapterProgress, chapterProgress + 0.1],
                    ['rgb(71, 85, 105)', 'rgb(139, 92, 246)', 'rgb(71, 85, 105)']
                  )
                }}
                title={chapter}
              />
            )
          })}
        </div>
      )}

      {/* Percentage */}
      {showPercentage && (
        <motion.span className="text-xs font-mono text-slate-400">
          {useTransform(percentage, p => `${Math.round(p)}%`)}
        </motion.span>
      )}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎪 SCROLL SPOTLIGHT
// Element gets spotlighted when in view
// ───────────────────────────────────────────────────────────────────────────────

interface ScrollSpotlightProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export function ScrollSpotlight({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.15)'
}: ScrollSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-40% 0px' })

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      animate={{
        boxShadow: isInView 
          ? `0 0 60px 20px ${spotlightColor}`
          : '0 0 0 0 transparent'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          background: isInView
            ? `radial-gradient(circle at center, ${spotlightColor} 0%, transparent 70%)`
            : 'transparent'
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default {
  NarrativeProvider,
  useNarrative,
  ChapterSection,
  ScrollSequence,
  DramaticReveal,
  ParallaxStory,
  ScrollTimeline,
  FocusScroll,
  ScrollIndicator,
  ScrollSpotlight
}
