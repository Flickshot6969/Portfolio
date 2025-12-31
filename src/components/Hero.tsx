'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Shield
} from 'lucide-react'

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

  // Mark as loaded for animations
  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
      {/* Aurora Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-ultra electric-border mb-6 hover-glow-intense"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-dark-200">
                Gandhinagar Institute of Technology | General Secretary
              </span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="heading-xl mb-6 rocket-launch"
            >
              <span className="text-dark-100">Hi, I&apos;m </span>
              <span className="gradient-text-animated holographic">Dev Patel</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium text-dark-300 mb-6 h-12"
            >
              <TypeAnimation
                sequence={[
                  'General Secretary @ GU',
                  2000,
                  'Event Production Head',
                  2000,
                  'Campaign & Marketing Head',
                  2000,
                  'Jazba Festival Head',
                  2000,
                  'Cultural Secretary',
                  2000,
                  'Starbucks Barista',
                  2000,
                  'Full Stack Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-body max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Results-driven{' '}
              <span className="text-primary-400 font-semibold">Student Leader</span>{' '}
              at Gandhinagar University with 1+ years of progressive leadership. Currently serving as{' '}
              <span className="text-accent-400 font-semibold">General Secretary</span>{' '}
              while heading{' '}
              <span className="text-cyan-400 font-semibold">Event Production & Marketing</span>. 
              Pursuing B.Tech at GIT with expertise in governance, digital marketing, and web development.
            </motion.p>

            {/* Role Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm">
                <Code2 size={14} />
                General Secretary
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-sm">
                <Briefcase size={14} />
                Event Production Head
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                <Sparkles size={14} />
                Marketing Strategist
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.a
                href="#projects"
                className="btn-primary btn-premium group ripple-effect"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline btn-premium neumorphic-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

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
                  className="p-3 rounded-xl glass-premium neumorphic group jelly-hover"
                  whileHover={{ y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
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
                style={{
                  transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))',
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-primary-500 via-accent-500 to-cyan-500 animate-spin-slow" style={{ animationDuration: '8s' }}>
                  <div className="w-full h-full rounded-full bg-dark-900" />
                </div>
                
                {/* Image Container - CLEAN, NO OVERLAYS */}
                <div className="absolute inset-1 rounded-full overflow-hidden bg-dark-900">
                  {/* Image Slideshow - Pure natural photos */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={heroImages[currentImageIndex]}
                      alt={`Dev Patel - Professional`}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 20%' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>
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
        </div>

        {/* Stats Section - Enhanced with icons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className="relative text-center glass-premium neumorphic rounded-xl md:rounded-2xl p-4 md:p-6 group hover:border-primary-500/30 transition-all duration-500 overflow-hidden shine-effect"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Background Icon */}
              <div className="absolute -right-2 -top-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon size={60} className="text-primary-500" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon size={18} className="text-primary-400" />
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text font-mono stat-number stat-glow">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-dark-400 text-xs md:text-sm">{stat.label}</p>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal-style tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800/50 border border-dark-700 font-mono text-xs md:text-sm">
            <span className="text-green-400">$</span>
            <span className="text-dark-300">building</span>
            <span className="text-primary-400">innovative_solutions</span>
            <span className="text-dark-400">--with</span>
            <span className="text-accent-400">passion</span>
            <motion.span
              className="w-2 h-4 bg-primary-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
