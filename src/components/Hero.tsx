'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
  Briefcase
} from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Delivered', value: '25+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Certifications', value: '10+' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-dark-200">
                Available for Opportunities
              </span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="heading-xl mb-6"
            >
              <span className="text-dark-100">Hi, I&apos;m </span>
              <span className="gradient-text-animated">Dev Patel</span>
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
                  'Full Stack Developer',
                  2000,
                  'Technical Leader',
                  2000,
                  'Product Manager',
                  2000,
                  'Cloud Architect',
                  2000,
                  'Problem Solver',
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
              A dynamic professional bridging the gap between{' '}
              <span className="text-primary-400 font-semibold">technical excellence</span> and{' '}
              <span className="text-accent-400 font-semibold">strategic leadership</span>. 
              Transforming complex challenges into innovative, scalable solutions.
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
                Technical Expert
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-300 text-sm">
                <Briefcase size={14} />
                Management Pro
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
                className="btn-primary group"
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
                className="btn-outline"
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
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card glass-card-hover group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
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
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-full blur-3xl scale-110 animate-pulse" />
              
              {/* Main Image Container */}
              <motion.div
                className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20" />
                <img
                  src="/media/Images/1.jpg"
                  alt="Dev Patel"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
              </motion.div>

              {/* Floating Cards - Hidden on small mobile */}
              <motion.div
                className="absolute -right-4 top-10 glass-card px-3 py-2 md:px-4 md:py-3 rounded-xl hidden sm:block"
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                    <Code2 size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Stack</p>
                    <p className="text-xs md:text-sm font-semibold text-white">Full Stack</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-20 glass-card px-3 py-2 md:px-4 md:py-3 rounded-xl hidden sm:block"
                animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-accent-500 to-pink-500 flex items-center justify-center">
                    <Briefcase size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Role</p>
                    <p className="text-xs md:text-sm font-semibold text-white">Tech Lead</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
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
              className="text-center glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:border-primary-500/30 transition-all duration-500"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 md:mb-2">
                {stat.value}
              </h3>
              <p className="text-dark-400 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-400 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  )
}
