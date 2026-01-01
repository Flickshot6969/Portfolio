'use client'

import React, { useEffect, useState, useRef, useCallback, createContext, useContext } from 'react'
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 ULTRA-RESPONSIVE MASTERY SYSTEM
// "This looks perfect on my phone, tablet, laptop, AND my ultra-wide monitor?!"
// Device-aware layouts that morph beautifully - not just scale
// ═══════════════════════════════════════════════════════════════════════════════

// BREAKPOINT SYSTEM - More granular than standard
const BREAKPOINTS = {
  xs: 320,     // Small phones
  sm: 480,     // Large phones
  md: 768,     // Tablets portrait
  lg: 1024,    // Tablets landscape / small laptops
  xl: 1280,    // Laptops
  '2xl': 1536, // Desktops
  '3xl': 1920, // Large desktops
  '4xl': 2560, // Ultra-wide
  '5xl': 3840, // 4K displays
} as const

type Breakpoint = keyof typeof BREAKPOINTS

// ───────────────────────────────────────────────────────────────────────────────
// 📊 VIEWPORT CONTEXT
// Reactive viewport intelligence
// ───────────────────────────────────────────────────────────────────────────────

interface ViewportContextValue {
  width: number
  height: number
  breakpoint: Breakpoint
  isPortrait: boolean
  isLandscape: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isUltraWide: boolean
  is4K: boolean
  devicePixelRatio: number
  hasTouch: boolean
  prefersReducedMotion: boolean
}

const ViewportContext = createContext<ViewportContextValue | null>(null)

export function useViewport() {
  const context = useContext(ViewportContext)
  if (!context) {
    return {
      width: typeof window !== 'undefined' ? window.innerWidth : 1280,
      height: typeof window !== 'undefined' ? window.innerHeight : 720,
      breakpoint: 'xl' as Breakpoint,
      isPortrait: false,
      isLandscape: true,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isUltraWide: false,
      is4K: false,
      devicePixelRatio: 1,
      hasTouch: false,
      prefersReducedMotion: false
    }
  }
  return context
}

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [viewport, setViewport] = useState<ViewportContextValue>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
    breakpoint: 'xl',
    isPortrait: false,
    isLandscape: true,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isUltraWide: false,
    is4K: false,
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    hasTouch: false,
    prefersReducedMotion: false
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Determine breakpoint
      let breakpoint: Breakpoint = 'xs'
      for (const [key, value] of Object.entries(BREAKPOINTS)) {
        if (width >= value) breakpoint = key as Breakpoint
      }

      const isPortrait = height > width
      const isMobile = width < BREAKPOINTS.md
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg
      const isDesktop = width >= BREAKPOINTS.lg
      const isUltraWide = width >= BREAKPOINTS['3xl'] && width / height > 2
      const is4K = width >= BREAKPOINTS['5xl']

      setViewport({
        width,
        height,
        breakpoint,
        isPortrait,
        isLandscape: !isPortrait,
        isMobile,
        isTablet,
        isDesktop,
        isUltraWide,
        is4K,
        devicePixelRatio: window.devicePixelRatio,
        hasTouch: 'ontouchstart' in window,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎭 RESPONSIVE CONTAINER - Morphs based on viewport
// ───────────────────────────────────────────────────────────────────────────────

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  mobileLayout?: 'stack' | 'center' | 'full'
  tabletLayout?: 'two-col' | 'center' | 'sidebar'
  desktopLayout?: 'multi-col' | 'wide' | 'contained'
  ultraWideLayout?: 'max-width' | 'full-bleed' | 'sidebar-heavy'
}

export function ResponsiveContainer({
  children,
  className = '',
  mobileLayout = 'stack',
  tabletLayout = 'center',
  desktopLayout = 'contained',
  ultraWideLayout = 'max-width'
}: ResponsiveContainerProps) {
  const viewport = useViewport()

  const layoutClasses = {
    mobile: {
      stack: 'flex flex-col gap-4',
      center: 'flex flex-col items-center text-center gap-4',
      full: 'w-full'
    },
    tablet: {
      'two-col': 'grid grid-cols-2 gap-6',
      center: 'max-w-2xl mx-auto',
      sidebar: 'grid grid-cols-[1fr_2fr] gap-6'
    },
    desktop: {
      'multi-col': 'grid grid-cols-3 gap-8',
      wide: 'max-w-7xl mx-auto',
      contained: 'max-w-5xl mx-auto'
    },
    ultraWide: {
      'max-width': 'max-w-[1800px] mx-auto',
      'full-bleed': 'w-full px-24',
      'sidebar-heavy': 'grid grid-cols-[300px_1fr_300px] gap-12'
    }
  }

  let activeLayout = ''
  if (viewport.isMobile) {
    activeLayout = layoutClasses.mobile[mobileLayout]
  } else if (viewport.isTablet) {
    activeLayout = layoutClasses.tablet[tabletLayout]
  } else if (viewport.isUltraWide) {
    activeLayout = layoutClasses.ultraWide[ultraWideLayout]
  } else {
    activeLayout = layoutClasses.desktop[desktopLayout]
  }

  return (
    <motion.div
      className={`${activeLayout} ${className}`}
      layout
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📐 FLUID SPACING - Spacing that breathes with viewport
// ───────────────────────────────────────────────────────────────────────────────

interface FluidSpacingProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function FluidSpacing({
  children,
  className = '',
  padding = 'md',
  margin = 'none'
}: FluidSpacingProps) {
  const viewport = useViewport()

  // Fluid padding based on viewport
  const paddingScale = {
    none: { mobile: 0, tablet: 0, desktop: 0 },
    sm: { mobile: 12, tablet: 16, desktop: 20 },
    md: { mobile: 16, tablet: 24, desktop: 32 },
    lg: { mobile: 24, tablet: 40, desktop: 64 },
    xl: { mobile: 32, tablet: 64, desktop: 96 }
  }

  const marginScale = {
    none: { mobile: 0, tablet: 0, desktop: 0 },
    sm: { mobile: 8, tablet: 12, desktop: 16 },
    md: { mobile: 16, tablet: 24, desktop: 32 },
    lg: { mobile: 24, tablet: 40, desktop: 56 },
    xl: { mobile: 32, tablet: 56, desktop: 80 }
  }

  const device = viewport.isMobile ? 'mobile' : viewport.isTablet ? 'tablet' : 'desktop'
  const currentPadding = paddingScale[padding][device]
  const currentMargin = marginScale[margin][device]

  return (
    <motion.div
      className={className}
      animate={{
        padding: currentPadding,
        margin: currentMargin
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📱 MOBILE-FIRST GRID
// Grid that transforms dramatically across breakpoints
// ───────────────────────────────────────────────────────────────────────────────

interface MobileFirstGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
    ultraWide?: number
  }
  gap?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function MobileFirstGrid({
  children,
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3, ultraWide: 4 },
  gap = { mobile: 16, tablet: 24, desktop: 32 }
}: MobileFirstGridProps) {
  const viewport = useViewport()

  let currentCols = cols.mobile ?? 1
  let currentGap = gap.mobile ?? 16

  if (viewport.isUltraWide) {
    currentCols = cols.ultraWide ?? cols.desktop ?? 4
    currentGap = gap.desktop ?? 32
  } else if (viewport.isDesktop) {
    currentCols = cols.desktop ?? 3
    currentGap = gap.desktop ?? 32
  } else if (viewport.isTablet) {
    currentCols = cols.tablet ?? 2
    currentGap = gap.tablet ?? 24
  }

  return (
    <motion.div
      className={className}
      animate={{
        gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`,
        gap: currentGap
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ display: 'grid' }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🖼️ ADAPTIVE IMAGE - Images that crop/position intelligently
// ───────────────────────────────────────────────────────────────────────────────

interface AdaptiveImageProps {
  src: string
  alt: string
  className?: string
  mobileCrop?: 'center' | 'top' | 'bottom'
  desktopCrop?: 'center' | 'left' | 'right'
  aspectRatio?: {
    mobile?: string
    desktop?: string
  }
}

export function AdaptiveImage({
  src,
  alt,
  className = '',
  mobileCrop = 'center',
  desktopCrop = 'center',
  aspectRatio = { mobile: '1/1', desktop: '16/9' }
}: AdaptiveImageProps) {
  const viewport = useViewport()

  const cropPositions = {
    center: 'center',
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
  }

  const currentCrop = viewport.isMobile 
    ? cropPositions[mobileCrop] 
    : cropPositions[desktopCrop]
  
  const currentAspect = viewport.isMobile 
    ? aspectRatio.mobile 
    : aspectRatio.desktop

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      animate={{ aspectRatio: currentAspect }}
      transition={{ duration: 0.4 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ objectPosition: currentCrop }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🔤 RESPONSIVE TYPOGRAPHY - Text that commands at every size
// ───────────────────────────────────────────────────────────────────────────────

interface ResponsiveTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  variant?: 'hero' | 'display' | 'heading' | 'subhead' | 'body' | 'small'
  className?: string
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
}

export function ResponsiveText({
  children,
  as: Component = 'p',
  variant = 'body',
  className = '',
  weight = 'normal'
}: ResponsiveTextProps) {
  const viewport = useViewport()

  // Size scales that feel right at every viewport
  const sizeScales = {
    hero: { mobile: 36, tablet: 56, desktop: 80, ultraWide: 96 },
    display: { mobile: 28, tablet: 40, desktop: 56, ultraWide: 64 },
    heading: { mobile: 24, tablet: 32, desktop: 40, ultraWide: 48 },
    subhead: { mobile: 18, tablet: 22, desktop: 26, ultraWide: 30 },
    body: { mobile: 16, tablet: 17, desktop: 18, ultraWide: 20 },
    small: { mobile: 14, tablet: 14, desktop: 15, ultraWide: 16 }
  }

  const lineHeights = {
    hero: 1.05,
    display: 1.1,
    heading: 1.2,
    subhead: 1.4,
    body: 1.6,
    small: 1.5
  }

  const weights = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900
  }

  const device = viewport.isUltraWide ? 'ultraWide' : viewport.isDesktop ? 'desktop' : viewport.isTablet ? 'tablet' : 'mobile'
  const fontSize = sizeScales[variant][device]

  return (
    <motion.div
      className={className}
      animate={{
        fontSize,
        lineHeight: lineHeights[variant],
        fontWeight: weights[weight]
      }}
      transition={{ duration: 0.3 }}
    >
      <Component>{children}</Component>
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 📺 ULTRA-WIDE OPTIMIZED SECTION
// Sections that shine on large displays
// ───────────────────────────────────────────────────────────────────────────────

interface UltraWideSectionProps {
  children: React.ReactNode
  className?: string
  sideContent?: React.ReactNode
  sidePosition?: 'left' | 'right' | 'both'
}

export function UltraWideSection({
  children,
  className = '',
  sideContent,
  sidePosition = 'both'
}: UltraWideSectionProps) {
  const viewport = useViewport()

  if (!viewport.isUltraWide || !sideContent) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`grid gap-12 ${className}`}
      initial={{ gridTemplateColumns: '1fr' }}
      animate={{ 
        gridTemplateColumns: sidePosition === 'both' 
          ? '1fr 2fr 1fr'
          : sidePosition === 'left'
          ? '1fr 3fr'
          : '3fr 1fr'
      }}
      transition={{ duration: 0.5 }}
    >
      {(sidePosition === 'left' || sidePosition === 'both') && (
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-24"
        >
          {sideContent}
        </motion.aside>
      )}
      
      <main>{children}</main>
      
      {(sidePosition === 'right' || sidePosition === 'both') && (
        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-24"
        >
          {sideContent}
        </motion.aside>
      )}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 🎯 DEVICE-AWARE ANIMATION - Different animations per device
// ───────────────────────────────────────────────────────────────────────────────

interface DeviceAwareAnimationProps {
  children: React.ReactNode
  className?: string
  mobileAnimation?: object
  tabletAnimation?: object
  desktopAnimation?: object
}

export function DeviceAwareAnimation({
  children,
  className = '',
  mobileAnimation = { y: [20, 0], opacity: [0, 1] },
  tabletAnimation = { x: [-30, 0], opacity: [0, 1] },
  desktopAnimation = { scale: [0.95, 1], opacity: [0, 1] }
}: DeviceAwareAnimationProps) {
  const viewport = useViewport()
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  let animation = desktopAnimation
  if (viewport.isMobile) animation = mobileAnimation
  else if (viewport.isTablet) animation = tabletAnimation

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? animation : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────────────────────
// 👆 TOUCH-OPTIMIZED BUTTON
// Larger touch targets on mobile, refined on desktop
// ───────────────────────────────────────────────────────────────────────────────

interface TouchOptimizedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function TouchOptimizedButton({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: TouchOptimizedButtonProps) {
  const viewport = useViewport()
  const [isPressed, setIsPressed] = useState(false)

  // Larger touch targets on mobile
  const sizes = {
    mobile: { padding: '16px 24px', fontSize: 16, minHeight: 52 },
    tablet: { padding: '14px 28px', fontSize: 15, minHeight: 48 },
    desktop: { padding: '12px 24px', fontSize: 14, minHeight: 44 }
  }

  const device = viewport.isMobile ? 'mobile' : viewport.isTablet ? 'tablet' : 'desktop'
  const size = sizes[device]

  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white',
    secondary: 'bg-slate-800 text-slate-100 border border-slate-700',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/50'
  }

  return (
    <motion.button
      className={`rounded-xl font-medium transition-colors ${variants[variant]} ${className}`}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      animate={{
        scale: isPressed ? 0.96 : 1,
        ...size
      }}
      whileHover={viewport.hasTouch ? {} : { scale: 1.02 }}
      transition={{ duration: 0.15 }}
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </motion.button>
  )
}

export default {
  ViewportProvider,
  useViewport,
  ResponsiveContainer,
  FluidSpacing,
  MobileFirstGrid,
  AdaptiveImage,
  ResponsiveText,
  UltraWideSection,
  DeviceAwareAnimation,
  TouchOptimizedButton,
  BREAKPOINTS
}
