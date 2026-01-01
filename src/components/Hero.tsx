'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight,
  Sparkles,
  Code2,
  Briefcase,
  Terminal,
  Database,
  Cloud,
  Cpu,
  GitBranch,
  Zap,
  Server,
  Shield,
  MousePointer
} from 'lucide-react'
import { MagneticButton, BlurReveal } from './AnimationEffects'
import { Card3D, SmoothCounter } from './EliteEffects'
import { useInteraction, ProximityAware } from '@/lib/InteractionIntelligence'
import { useScrollPhase, PhaseElement, VelocityText, HesitationAware } from '@/lib/ScrollPhaseEngine'
import { CinematicButton, CinematicCard, AmbientParticles, VelocityGradientText } from '@/lib/CinematicMotion'
import { 
  AnticipatoryCTA, 
  MultiPhaseCard, 
  AmbientMotion,
  SparkleOnIdle 
} from './AdvancedInteractions'
import { 
  AttentionMagnet, 
  CursorGradient, 
  AmbientWave,
  DirectionalReveal,
  VelocityStagger,
  MomentumCarry 
} from './MotionHierarchy'
// ⚡ NEW: Psychological Motion & Tactile Systems
import { 
  useEmotionalState, 
  AweReveal, 
  GrandEntrance, 
  DopamineHit,
  HeartbeatElement,
  PresenceIndicator,
  FocusPull
} from '@/lib/PsychologicalMotion'
import { 
  TactileButton, 
  TactileCard, 
  MagneticElement,
  TactileRipple
} from '@/lib/TactileSystem'
import { 
  useViewport, 
  ResponsiveText, 
  DeviceAwareAnimation,
  TouchOptimizedButton
} from '@/lib/UltraResponsive'
import { DramaticReveal, ScrollSpotlight } from '@/lib/NarrativeScroll'

// All images with numbers
const heroImages = [
  '/media/Images/1.jpg',
  '/media/Images/2.JPG',
  '/media/Images/3.JPG',
  '/media/Images/4.JPG',
  '/media/Images/5.jpg',
  '/media/Images/6.JPG',
  '/media/Images/7.jpg',
  '/media/Images/8.JPG',
  '/media/Images/9.jpg',
  '/media/Images/11.JPG',
]

const stats = [
  { label: 'Leadership Roles', value: '5+', icon: Zap },
  { label: 'Events Managed', value: '50+', icon: GitBranch },
  { label: 'Skills Mastered', value: '20+', icon: Cpu },
  { label: 'Certifications', value: '10+', icon: Shield },
]

// Tech stack for floating icons
const techIcons = [
  { icon: Terminal, delay: 0 },
  { icon: Database, delay: 0.5 },
  { icon: Cloud, delay: 1 },
  { icon: Server, delay: 1.5 },
  { icon: GitBranch, delay: 2 },
]

// Code snippets for background effect
const codeSnippets = [
  'const deploy = async () => {',
  'function optimize() {',
  'class Manager extends Leader {',
  'export default App;',
  'npm run build',
  'git push origin main',
  'docker-compose up',
  'kubectl apply -f',
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const { state } = useInteraction()
  
  // Interaction-aware state
  const [interactionPhase, setInteractionPhase] = useState<'initial' | 'engaged' | 'exploring'>('initial')
  const [heroFocusTime, setHeroFocusTime] = useState(0)
  
  // Spring physics for organic motion
  const heroY = useSpring(0, { stiffness: 100, damping: 20 })
  const heroBlur = useSpring(0, { stiffness: 150, damping: 25 })
  const contentOpacity = useSpring(1, { stiffness: 200, damping: 30 })

  // Mark as loaded for animations
  useEffect(() => {
    setIsLoaded(true)
    // Track time spent on hero
    const interval = setInterval(() => {
      setHeroFocusTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  // Phase transition based on user behavior
  useEffect(() => {
    if (heroFocusTime > 3 && interactionPhase === 'initial') {
      setInteractionPhase('engaged')
    }
    if (state.scroll.depth > 0.1) {
      setInteractionPhase('exploring')
    }
  }, [heroFocusTime, state.scroll.depth, interactionPhase])
  
  // Scroll-reactive hero transformation
  useEffect(() => {
    // Parallax based on scroll
    const offset = state.scroll.depth * 100
    heroY.set(offset * 0.5)
    
    // Blur during fast scroll
    heroBlur.set(state.scroll.velocity > 0.8 ? state.scroll.velocity * 3 : 0)
    
    // Fade content when scrolling away
    contentOpacity.set(1 - state.scroll.depth * 0.5)
  }, [state.scroll.depth, state.scroll.velocity, heroY, heroBlur, contentOpacity])

  // Auto-slide images every 4 seconds - seamless transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { width, height, left, top } = containerRef.current.getBoundingClientRect()
      const x = (clientX - left - width / 2) / 25
      const y = (clientY - top - height / 2) / 25
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 aurora-bg"
    >
      {/* Interaction-Aware Background Gradient */}
      <CursorGradient intensity={0.8} />
      
      {/* Ambient Wave Layer - Tertiary Motion */}
      <AmbientWave intensity={0.5} />
      
      {/* Sparkle Reward for Idle Users */}
      <SparkleOnIdle />

      {/* Aurora Glow Orbs - React to Scroll */}
      <MomentumCarry sensitivity={0.3}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      </MomentumCarry>
      <MomentumCarry sensitivity={0.5}>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </MomentumCarry>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl vegas-glow" />
      
      {/* Matrix-like Code Rain Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-500 font-mono text-xs whitespace-nowrap"
            style={{
              left: `${(i * 13) % 100}%`,
              top: -50,
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid-bg pointer-events-none" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {techIcons.map((tech, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-500/20"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: tech.delay,
            }}
          >
            <tech.icon size={40 + i * 10} />
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-primary-500/40' : i % 3 === 1 ? 'bg-accent-500/40' : 'bg-cyan-500/40'}`}
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          style={{ 
            y: heroY,
            filter: useTransform(heroBlur, v => `blur(${v}px)`)
          }}
        >
          {/* Content - With Interaction Awareness */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center lg:text-left order-2 lg:order-1"
            style={{ opacity: contentOpacity }}
          >
            {/* Badge - Attention Magnet with Grand Entrance */}
            <GrandEntrance delay={0.2}>
              <AttentionMagnet priority="high" pulseOnIdle>
                <DirectionalReveal>
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ultra electric-border mb-6 hover-glow-intense breathing-glow"
                  >
                    <HeartbeatElement intensity={0.8}>
                      <Sparkles className="w-4 h-4 text-primary-400" />
                    </HeartbeatElement>
                    <span className="text-sm font-medium text-dark-200">
                      Gandhinagar Institute of Technology | General Secretary
                    </span>
                    <PresenceIndicator importance="high">
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </PresenceIndicator>
                  </motion.div>
                </DirectionalReveal>
              </AttentionMagnet>
            </GrandEntrance>

            {/* Main Heading - Elite Text Reveal with Awe */}
            <AweReveal delay={0.3} intensity="dramatic">
              <motion.h1
                className="heading-xl mb-6 rocket-launch"
              >
                <motion.span 
                  className="text-dark-100 inline-block text-xl md:text-2xl font-medium mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  I'm{' '}
                </motion.span>
                <FocusPull intensity={1.2}>
                  <motion.span 
                    className="gradient-shimmer inline-block focus-pull"
                    initial={{ opacity: 0, scale: 0.8, rotateX: -40 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
                  >
                    Dev Patel
                  </motion.span>
                </FocusPull>
              </motion.h1>
            </AweReveal>

            {/* Value Proposition - NOT just typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                I turn <span className="text-primary-400">chaos into clarity</span>
              </p>
              <p className="text-lg md:text-xl text-dark-300">
                Whether it's leading <span className="text-accent-400 font-medium">5,000+ students</span> or 
                orchestrating <span className="text-cyan-400 font-medium">50+ events</span>, I deliver results.
              </p>
            </motion.div>
            
            {/* Quick Proof - SHOW DON'T TELL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 py-4 border-y border-dark-700/50"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">5,000+</div>
                <div className="text-sm text-dark-400">Students Led</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-400">50+</div>
                <div className="text-sm text-dark-400">Events Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-400">4.9/5</div>
                <div className="text-sm text-dark-400">Service Rating</div>
              </div>
            </motion.div>

            {/* Typing Animation - Now Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl font-medium text-dark-300 mb-6 h-8"
            >
              <span className="text-dark-500">Currently: </span>
              <TypeAnimation
                sequence={[
                  'General Secretary @ Gandhinagar University',
                  2000,
                  'Event Production Head @ GIT',
                  2000,
                  'Marketing & Campaign Strategist',
                  2000,
                  'Jazba Festival Head',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary-400"
              />
            </motion.div>

            {/* CTA Buttons - Tactile with Dopamine Hit */}
            <DramaticReveal direction="up" intensity="normal">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <ProximityAware id="hero-cta-primary" approachThreshold={150}>
                  {({ phase, proximity }) => (
                    <DopamineHit trigger={phase === 'hovering'}>
                      <TactileRipple rippleColor="rgba(139, 92, 246, 0.4)">
                        <TactileButton
                          variant="floating"
                          haptic="medium"
                          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                          className={`px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 ${phase === 'approaching' ? 'shadow-lg shadow-primary/30' : ''}`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            View My Work
                            <motion.span
                              animate={{ x: phase === 'hovering' ? 5 : 0 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <ArrowRight size={18} />
                            </motion.span>
                          </span>
                        </TactileButton>
                      </TactileRipple>
                    </DopamineHit>
                  )}
                </ProximityAware>
                
                <ProximityAware id="hero-cta-secondary" approachThreshold={150}>
                  {({ phase }) => (
                    <MagneticElement strength={0.2} radius={80}>
                      <TactileButton
                        variant="glass"
                        haptic="light"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className={`px-8 py-4 glass-ultra border border-white/20 rounded-xl font-semibold transition-all duration-300 ${phase === 'approaching' ? 'border-primary/40' : ''}`}
                      >
                        Get In Touch
                      </TactileButton>
                    </MagneticElement>
                  )}
                </ProximityAware>
              </motion.div>
            </DramaticReveal>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: 'https://github.com/devpatel170521', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/devpatel170521/', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/devpatel170521', label: 'Twitter' },
                { icon: Instagram, href: 'https://instagram.com/devpatel170521', label: 'Instagram' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-dark-800/50 border border-white/10 group hover:bg-primary-500/20 hover:border-primary-500/40 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 400 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-dark-300 group-hover:text-primary-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Hexagon Tech Frame */}
              <div className="absolute -inset-4 opacity-30">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="url(#techGradient)"
                    strokeWidth="1"
                    strokeDasharray="10 5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="160"
                    fill="none"
                    stroke="url(#techGradient)"
                    strokeWidth="0.5"
                    strokeDasharray="5 10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 via-accent-500/20 to-cyan-500/30 rounded-full blur-3xl scale-125 animate-pulse" />
              
              {/* Main Image Container */}
              <motion.div
                className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Gradient Border Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-cyan-500 p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-dark-900">
                    {/* Image Slideshow */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Dev Patel - General Secretary at Gandhinagar Institute of Technology showcasing student leadership and IBM Cloud Computing expertise"
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                        fetchPriority="high"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards - Developer Badge */}
              <motion.div
                className="absolute -right-4 top-10 glass-card px-3 py-2 md:px-4 md:py-3 rounded-xl hidden sm:block border border-primary-500/30"
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-primary-500 to-cyan-500 flex items-center justify-center">
                    <Terminal size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Developer</p>
                    <p className="text-xs md:text-sm font-semibold text-white font-mono">Full Stack</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards - Manager Badge */}
              <motion.div
                className="absolute -left-4 bottom-20 glass-card px-3 py-2 md:px-4 md:py-3 rounded-xl hidden sm:block border border-accent-500/30"
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-accent-500 to-pink-500 flex items-center justify-center">
                    <Briefcase size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Leader</p>
                    <p className="text-xs md:text-sm font-semibold text-white">Tech Lead</p>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stats Badge */}
              <motion.div
                className="absolute -right-2 bottom-10 glass-card px-2 py-1.5 md:px-3 md:py-2 rounded-lg hidden sm:block border border-cyan-500/30"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-cyan-400">Online</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section - Multi-Phase Cards with Velocity Stagger */}
        <VelocityStagger baseDelay={0.15}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          >
            {stats.map((stat, index) => (
              <MultiPhaseCard 
                key={stat.label}
                className="text-center rounded-xl md:rounded-2xl p-4 md:p-6 glass-elite"
                onPhaseChange={(phase) => {
                  // Could track analytics here
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.15, type: 'spring', stiffness: 100 }}
                  className="relative overflow-hidden"
                >
                  {/* Background Icon */}
                  <AmbientMotion intensity="low">
                    <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                      <stat.icon size={60} className="text-primary-500" />
                    </div>
                  </AmbientMotion>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon size={18} className="text-primary-400" />
                      </motion.div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-shimmer font-mono">
                        <SmoothCounter target={parseInt(stat.value)} suffix="+" />
                      </h3>
                    </div>
                    <p className="text-dark-400 text-xs md:text-sm group-hover:text-dark-300 transition-colors">{stat.label}</p>
                  </div>
                </motion.div>
              </MultiPhaseCard>
            ))}
          </motion.div>
        </VelocityStagger>

        {/* Terminal-style tagline - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-elite border border-dark-700/50 font-mono text-xs md:text-sm magnetic-glow"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-green-400 neon-text">$</span>
            <span className="text-dark-300">building</span>
            <span className="text-primary-400 gradient-shimmer">innovative_solutions</span>
            <span className="text-dark-400">--with</span>
            <span className="text-accent-400">passion</span>
            <motion.span
              className="w-2 h-4 bg-primary-500 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Elite */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-dark-600 group-hover:border-primary-500/50 flex justify-center pt-2 transition-colors"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary-500"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
