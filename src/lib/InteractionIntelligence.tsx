'use client'

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 INTERACTION INTELLIGENCE SYSTEM
// Treats the website as a state machine with predictive, layered interactions
// ═══════════════════════════════════════════════════════════════════════════════

interface ScrollState {
  direction: 'up' | 'down' | 'idle'
  velocity: number
  depth: number // 0-1 representing scroll position
  isScrolling: boolean
  lastScrollTime: number
  acceleration: number
  momentum: number
  hesitation: boolean // user paused mid-scroll
}

interface CursorState {
  x: number
  y: number
  velocity: { x: number; y: number }
  angle: number // entry angle in degrees
  isMoving: boolean
  lastMoveTime: number
  zone: 'top' | 'middle' | 'bottom' // thumb zone for mobile thinking
  proximity: Map<string, number> // distance to registered elements
}

interface TouchState {
  isTouch: boolean
  touchVelocity: number
  touchDirection: 'up' | 'down' | 'left' | 'right' | 'idle'
  gesturePhase: 'idle' | 'start' | 'move' | 'end'
  swipeIntent: number // 0-1 prediction of swipe completion
  pressure: number // if available
  multiTouch: boolean
}

interface DeviceState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  hasTouch: boolean
  hasMouse: boolean
  orientation: 'portrait' | 'landscape'
  viewportHeight: number
  viewportWidth: number
  pixelRatio: number
  reducedMotion: boolean
}

interface InteractionPhase {
  phase: 'idle' | 'approach' | 'engage' | 'commit' | 'release'
  duration: number
  intensity: number // 0-1
}

interface GlobalInteractionState {
  scroll: ScrollState
  cursor: CursorState
  touch: TouchState
  device: DeviceState
  phase: InteractionPhase
  activeSection: string
  idleTime: number
  isIdle: boolean
  focusedElement: string | null
  interactionHistory: string[]
}

const defaultState: GlobalInteractionState = {
  scroll: {
    direction: 'idle',
    velocity: 0,
    depth: 0,
    isScrolling: false,
    lastScrollTime: 0,
    acceleration: 0,
    momentum: 0,
    hesitation: false
  },
  cursor: {
    x: 0,
    y: 0,
    velocity: { x: 0, y: 0 },
    angle: 0,
    isMoving: false,
    lastMoveTime: 0,
    zone: 'middle',
    proximity: new Map()
  },
  touch: {
    isTouch: false,
    touchVelocity: 0,
    touchDirection: 'idle',
    gesturePhase: 'idle',
    swipeIntent: 0,
    pressure: 0,
    multiTouch: false
  },
  device: {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    hasMouse: true,
    orientation: 'landscape',
    viewportHeight: 0,
    viewportWidth: 0,
    pixelRatio: 1,
    reducedMotion: false
  },
  phase: {
    phase: 'idle',
    duration: 0,
    intensity: 0
  },
  activeSection: 'home',
  idleTime: 0,
  isIdle: false,
  focusedElement: null,
  interactionHistory: []
}

const InteractionContext = createContext<{
  state: GlobalInteractionState
  registerElement: (id: string, element: HTMLElement) => void
  unregisterElement: (id: string) => void
  setActiveSection: (section: string) => void
  getProximity: (id: string) => number
  getApproachAngle: (id: string) => number
  getInteractionIntensity: () => number
}>({
  state: defaultState,
  registerElement: () => {},
  unregisterElement: () => {},
  setActiveSection: () => {},
  getProximity: () => Infinity,
  getApproachAngle: () => 0,
  getInteractionIntensity: () => 0
})

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalInteractionState>(defaultState)
  const registeredElements = useRef<Map<string, HTMLElement>>(new Map())
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const idleTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastCursorPos = useRef({ x: 0, y: 0, time: Date.now() })
  const rafId = useRef<number | null>(null)

  // Device detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setState(prev => ({
        ...prev,
        device: {
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
          hasTouch,
          hasMouse: !hasTouch || width >= 1024,
          orientation: width > height ? 'landscape' : 'portrait',
          viewportHeight: height,
          viewportWidth: width,
          pixelRatio: window.devicePixelRatio || 1,
          reducedMotion
        }
      }))
    }

    detectDevice()
    window.addEventListener('resize', detectDevice)
    window.addEventListener('orientationchange', detectDevice)

    return () => {
      window.removeEventListener('resize', detectDevice)
      window.removeEventListener('orientationchange', detectDevice)
    }
  }, [])

  // Scroll intelligence
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const currentY = window.scrollY
      const deltaY = currentY - lastScrollY.current
      const deltaTime = now - lastScrollTime.current
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      // Calculate velocity and acceleration
      const velocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0
      const prevVelocity = state.scroll.velocity
      const acceleration = deltaTime > 0 ? (velocity - prevVelocity) / deltaTime : 0

      // Detect hesitation (velocity dropped significantly)
      const hesitation = prevVelocity > 0.5 && velocity < 0.1

      setState(prev => ({
        ...prev,
        scroll: {
          direction: deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'idle',
          velocity,
          depth: maxScroll > 0 ? currentY / maxScroll : 0,
          isScrolling: true,
          lastScrollTime: now,
          acceleration,
          momentum: velocity * (acceleration > 0 ? 1.2 : 0.8),
          hesitation
        },
        isIdle: false,
        idleTime: 0
      }))

      lastScrollY.current = currentY
      lastScrollTime.current = now

      // Clear existing timeout and set new one
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          scroll: { ...prev.scroll, isScrolling: false, direction: 'idle', velocity: 0 }
        }))
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [state.scroll.velocity])

  // Cursor intelligence
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const deltaX = e.clientX - lastCursorPos.current.x
      const deltaY = e.clientY - lastCursorPos.current.y
      const deltaTime = now - lastCursorPos.current.time

      // Calculate velocity
      const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0
      const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0

      // Calculate entry angle
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      // Determine zone
      const viewportHeight = window.innerHeight
      const zone = e.clientY < viewportHeight * 0.33 ? 'top' : 
                   e.clientY > viewportHeight * 0.66 ? 'bottom' : 'middle'

      // Calculate proximity to registered elements
      const proximity = new Map<string, number>()
      registeredElements.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )
        proximity.set(id, distance)
      })

      setState(prev => ({
        ...prev,
        cursor: {
          x: e.clientX,
          y: e.clientY,
          velocity: { x: velocityX, y: velocityY },
          angle,
          isMoving: true,
          lastMoveTime: now,
          zone,
          proximity
        },
        isIdle: false,
        idleTime: 0
      }))

      lastCursorPos.current = { x: e.clientX, y: e.clientY, time: now }

      // Reset idle detection
      if (idleTimeout.current) clearTimeout(idleTimeout.current)
      idleTimeout.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          cursor: { ...prev.cursor, isMoving: false },
          isIdle: true
        }))
      }, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Touch intelligence
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
      touchStartTime = Date.now()

      setState(prev => ({
        ...prev,
        touch: {
          ...prev.touch,
          isTouch: true,
          gesturePhase: 'start',
          multiTouch: e.touches.length > 1
        }
      }))
    }

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - touchStartY
      const deltaX = e.touches[0].clientX - touchStartX
      const deltaTime = Date.now() - touchStartTime
      const velocity = deltaTime > 0 ? Math.sqrt(deltaX ** 2 + deltaY ** 2) / deltaTime : 0

      // Determine direction
      let direction: 'up' | 'down' | 'left' | 'right' | 'idle' = 'idle'
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        direction = deltaY > 0 ? 'down' : 'up'
      } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left'
      }

      // Calculate swipe intent (how likely to complete swipe)
      const swipeDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const swipeIntent = Math.min(swipeDistance / 150, 1) // Normalize to 0-1

      setState(prev => ({
        ...prev,
        touch: {
          ...prev.touch,
          touchVelocity: velocity,
          touchDirection: direction,
          gesturePhase: 'move',
          swipeIntent,
          multiTouch: e.touches.length > 1
        }
      }))
    }

    const handleTouchEnd = () => {
      setState(prev => ({
        ...prev,
        touch: {
          ...prev.touch,
          gesturePhase: 'end',
          swipeIntent: 0
        }
      }))

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          touch: { ...prev.touch, gesturePhase: 'idle', isTouch: false }
        }))
      }, 100)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // Idle time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isIdle) {
        setState(prev => ({
          ...prev,
          idleTime: prev.idleTime + 1
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isIdle])

  // Element registration
  const registerElement = useCallback((id: string, element: HTMLElement) => {
    registeredElements.current.set(id, element)
  }, [])

  const unregisterElement = useCallback((id: string) => {
    registeredElements.current.delete(id)
  }, [])

  const setActiveSection = useCallback((section: string) => {
    setState(prev => ({
      ...prev,
      activeSection: section,
      interactionHistory: [...prev.interactionHistory.slice(-10), section]
    }))
  }, [])

  const getProximity = useCallback((id: string): number => {
    return state.cursor.proximity.get(id) ?? Infinity
  }, [state.cursor.proximity])

  const getApproachAngle = useCallback((id: string): number => {
    const element = registeredElements.current.get(id)
    if (!element) return 0

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    return Math.atan2(centerY - state.cursor.y, centerX - state.cursor.x) * (180 / Math.PI)
  }, [state.cursor.x, state.cursor.y])

  const getInteractionIntensity = useCallback((): number => {
    const scrollIntensity = state.scroll.velocity * 2
    const cursorIntensity = Math.sqrt(
      state.cursor.velocity.x ** 2 + state.cursor.velocity.y ** 2
    )
    const touchIntensity = state.touch.touchVelocity * 3

    return Math.min(Math.max(scrollIntensity + cursorIntensity + touchIntensity, 0), 1)
  }, [state.scroll.velocity, state.cursor.velocity, state.touch.touchVelocity])

  return (
    <InteractionContext.Provider value={{
      state,
      registerElement,
      unregisterElement,
      setActiveSection,
      getProximity,
      getApproachAngle,
      getInteractionIntensity
    }}>
      {children}
    </InteractionContext.Provider>
  )
}

export const useInteraction = () => useContext(InteractionContext)

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PROXIMITY-AWARE COMPONENT WRAPPER
// Elements that know when cursor approaches before hover
// ═══════════════════════════════════════════════════════════════════════════════

interface ProximityAwareProps {
  id: string
  children: (props: {
    proximity: number
    isApproaching: boolean
    approachAngle: number
    phase: 'distant' | 'approaching' | 'near' | 'hovering'
  }) => React.ReactNode
  hoverThreshold?: number
  approachThreshold?: number
}

export function ProximityAware({ 
  id, 
  children, 
  hoverThreshold = 50,
  approachThreshold = 200 
}: ProximityAwareProps) {
  const { registerElement, unregisterElement, getProximity, getApproachAngle } = useInteraction()
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (ref.current) {
      registerElement(id, ref.current)
    }
    return () => unregisterElement(id)
  }, [id, registerElement, unregisterElement])

  const proximity = getProximity(id)
  const approachAngle = getApproachAngle(id)

  const phase = isHovering ? 'hovering' :
                proximity < hoverThreshold ? 'near' :
                proximity < approachThreshold ? 'approaching' : 'distant'

  return (
    <div 
      ref={ref}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children({
        proximity,
        isApproaching: proximity < approachThreshold,
        approachAngle,
        phase
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🌊 SCROLL-AWARE COMPONENT
// Responds to scroll direction, velocity, and momentum
// ═══════════════════════════════════════════════════════════════════════════════

interface ScrollAwareProps {
  children: (props: {
    scrollDirection: 'up' | 'down' | 'idle'
    scrollVelocity: number
    scrollDepth: number
    isScrolling: boolean
    momentum: number
    hesitation: boolean
  }) => React.ReactNode
}

export function ScrollAware({ children }: ScrollAwareProps) {
  const { state } = useInteraction()

  return (
    <>
      {children({
        scrollDirection: state.scroll.direction,
        scrollVelocity: state.scroll.velocity,
        scrollDepth: state.scroll.depth,
        isScrolling: state.scroll.isScrolling,
        momentum: state.scroll.momentum,
        hesitation: state.scroll.hesitation
      })}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 DEVICE-AWARE COMPONENT
// Adjusts behavior based on device capabilities
// ═══════════════════════════════════════════════════════════════════════════════

interface DeviceAwareProps {
  children: (props: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    hasTouch: boolean
    orientation: 'portrait' | 'landscape'
    reducedMotion: boolean
  }) => React.ReactNode
}

export function DeviceAware({ children }: DeviceAwareProps) {
  const { state } = useInteraction()

  return (
    <>
      {children({
        isMobile: state.device.isMobile,
        isTablet: state.device.isTablet,
        isDesktop: state.device.isDesktop,
        hasTouch: state.device.hasTouch,
        orientation: state.device.orientation,
        reducedMotion: state.device.reducedMotion
      })}
    </>
  )
}
