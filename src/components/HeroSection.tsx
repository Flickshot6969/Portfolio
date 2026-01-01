'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { 
  ArrowRight,
  Github, 
  Linkedin, 
  ChevronDown
} from 'lucide-react'

// Hero images
const heroImages = [
  '/media/Images/1.jpg',
  '/media/Images/2.JPG',
  '/media/Images/3.JPG',
  '/media/Images/4.JPG',
  '/media/Images/5.jpg',
  '/media/Images/6.JPG',
  '/media/Images/7.jpg',
  '/media/Images/8.JPG',
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left: Content - AGGRESSIVE, CLEAR */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/80 border border-dark-700 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-dark-300">General Secretary @ Gandhinagar University</span>
            </motion.div>

            {/* Main Headline - WHAT I DO */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              I turn{' '}
              <span className="text-primary-400">complex problems</span>
              {' '}into{' '}
              <span className="text-accent-400">clear systems</span>
            </motion.h1>

            {/* Sub-headline - FOR WHOM + WHY IT MATTERS */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-dark-400 mb-8 max-w-2xl leading-relaxed"
            >
              For organizations that need{' '}
              <span className="text-dark-200 font-medium">reliable execution</span>,{' '}
              not just ideas. I lead teams, ship projects, and{' '}
              <span className="text-dark-200 font-medium">deliver measurable outcomes</span>.
            </motion.p>

            {/* Proof Bar - INSTANT CREDIBILITY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8 mb-10 pb-8 border-b border-dark-800"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">5,000+</div>
                <div className="text-sm text-dark-500">Students Represented</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-400">50+</div>
                <div className="text-sm text-dark-500">Events Delivered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-accent-400">0</div>
                <div className="text-sm text-dark-500">Event Cancellations</div>
              </div>
            </motion.div>

            {/* CTAs - CLEAR NEXT STEP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold flex items-center gap-3 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See How I Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-dark-800/80 border border-dark-700 text-white rounded-xl font-semibold hover:bg-dark-700 hover:border-dark-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Build Something
              </motion.button>
            </motion.div>

            {/* Social Links - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/devpatel170521"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-dark-600 hover:bg-dark-700 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-dark-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/devpatel170521/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-dark-600 hover:bg-dark-700 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-dark-400" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Image - CONFIDENT, NOT FLASHY */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-transparent rounded-3xl blur-3xl scale-110" />
              
              {/* Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-dark-700">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt="Dev Patel - General Secretary, Event Leader, Problem Solver"
                    className="w-full h-full object-cover object-top"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
              </div>

              {/* Role Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-xl"
              >
                <p className="text-sm text-dark-400">Currently</p>
                <p className="font-semibold text-white">Building systems that scale</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-dark-500 hover:text-dark-300 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-wider">Scroll for proof</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
