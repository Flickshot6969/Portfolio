'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  User, 
  MapPin, 
  Mail, 
  Calendar,
  Award,
  Target,
  Lightbulb,
  Users,
  Rocket,
  Heart,
  Code2,
  Download,
  ArrowRight
} from 'lucide-react'
import { Card3D } from './EliteEffects'
import { downloadResumePDF } from '@/lib/generateResumePDF'
// ⚡ NEW: Psychological Motion & Tactile Systems
import { 
  GrandEntrance,
  FocusPull
} from '@/lib/PsychologicalMotion'



const highlights = [
  {
    icon: Target,
    title: 'General Secretary',
    description: 'Spearheading student governance at Gandhinagar University, representing 5000+ students'
  },
  {
    icon: Lightbulb,
    title: 'Event Production Head',
    description: 'Leading end-to-end execution of dynamic campus events and cultural festivals'
  },
  {
    icon: Users,
    title: 'Marketing Strategist',
    description: 'Driving brand visibility and digital marketing campaigns with data-driven insights'
  },
  {
    icon: Rocket,
    title: 'Tech & Leadership',
    description: 'Pursuing B.Tech at GIT while building web applications with modern technologies'
  }
]

const personalInfo = [
  { icon: User, label: 'Name', value: 'Dev Patel' },
  { icon: MapPin, label: 'Location', value: 'Ahmedabad, Gujarat' },
  { icon: Mail, label: 'Email', value: 'devpatel170521@gmail.com' },
  { icon: Calendar, label: 'Expected Graduation', value: '2027' },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="about" className="section-padding relative overflow-hidden gradient-mesh">
      {/* Section Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent pointer-events-none" />
      {/* Desktop-only animated orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl hidden md:block md:animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl hidden md:block md:animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header - Elite Reveal with Awe */}
        <GrandEntrance delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <motion.span 
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-elite text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4 md:magnetic-glow md:breathing-glow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Dev Patel
            </motion.span>
            {/* H1 for About section - SEO */}
            <h1 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Leadership Journey{' '}
              </motion.span>
              <FocusPull intensity={1.1}>
                <motion.span 
                  className="gradient-shimmer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4, type: 'spring' }}
                >
                  & Achievements
                </motion.span>
              </FocusPull>
            </h1>
            {/* H2 for SEO */}
            <h2 className="sr-only">Technical Skills & Professional Experience</h2>
            <motion.p 
              className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              Combining strategic leadership with hands-on technical skills, Dev Patel bridges the gap between 
              organizational excellence and IBM cybersecurity & cloud computing expertise. From student governance as General Secretary 
              to professional barista experience at Starbucks.
            </motion.p>
          </motion.div>
        </GrandEntrance>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image & Personal Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Image Container */}
            <motion.div 
              variants={itemVariants}
              className="relative max-w-xs sm:max-w-md mx-auto"
            >
              {/* Decorative Elements - Animated on all devices */}
              <motion.div 
                className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 border-l-2 border-t-2 border-primary-500/30 rounded-tl-2xl sm:rounded-tl-3xl"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div 
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border-r-2 border-b-2 border-accent-500/30 rounded-br-2xl sm:rounded-br-3xl"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              />
              
              {/* Mobile-visible floating particles around image */}
              <motion.div 
                className="absolute -top-4 left-1/4 w-2 h-2 rounded-full bg-primary-500/60"
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-accent-500/60"
                animate={{ 
                  y: [0, 8, 0],
                  x: [0, -3, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-1/4 -left-3 w-1.5 h-1.5 rounded-full bg-cyan-500/60"
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, 4, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
              />
              
              {/* Main Image - Elite 3D Card */}
              <Card3D className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-2 bg-dark-900/50 border border-white/10" intensity={15}>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden relative">
                  <img
                    src="/media/Images/2.JPG"
                    alt="Dev Patel - General Secretary and Student Leader at Gandhinagar Institute of Technology"
                    className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Overlay Info Card - HARDCORE Elite */}
                <motion.div 
                  className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 rounded-lg sm:rounded-xl p-3 sm:p-4 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.85) 50%, rgba(6, 182, 212, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)' }}
                >
                  {/* Animated shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  
                  <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base drop-shadow-md tracking-wide">DEV PATEL</h4>
                      <p className="text-xs sm:text-sm text-white/90 font-medium">🚀 General Secretary & Tech Leader</p>
                    </div>
                  </div>
                </motion.div>
              </Card3D>

              {/* Floating Badge - Strategic Leader - Enhanced Mobile */}
              <motion.div
                className="absolute -right-1 sm:-right-4 -top-3 sm:top-1/4 glass-card px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl z-20"
                animate={{ 
                  y: [0, -8, 0], 
                  x: [0, 3, 0],
                  rotate: [0, 2, 0],
                  scale: [1, 1.05, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-red-500" />
                  </motion.div>
                  <span className="text-[10px] sm:text-sm font-semibold text-white">Strategic Leader</span>
                </div>
              </motion.div>

              {/* Floating Badge - Passionate Coder - Enhanced Mobile */}
              <motion.div
                className="absolute -left-1 sm:-left-4 -top-3 sm:bottom-1/3 sm:top-auto glass-card px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl z-20"
                animate={{ 
                  y: [0, 8, 0], 
                  x: [0, -3, 0],
                  rotate: [0, -2, 0],
                  scale: [1, 1.05, 1] 
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity, 
                  delay: 0.5,
                  ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                style={{ boxShadow: '0 8px 32px rgba(34, 211, 238, 0.3)' }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Code2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400" />
                  </motion.div>
                  <span className="text-[10px] sm:text-sm font-semibold text-white">Passionate Coder</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Personal Info Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-8"
            >
              {personalInfo.map((info, _index) => (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  className="glass-premium rounded-lg sm:rounded-xl p-3 sm:p-4 group hover:border-primary-500/30 transition-all duration-300 hover-lift neumorphic jelly-hover"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                      <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-dark-400">{info.label}</p>
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Story Section - Enhanced with Pull Quote */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
                My <span className="gradient-text">Journey</span>
              </h3>
              
              {/* Pull Quote - Visual Emphasis */}
              <motion.blockquote 
                className="relative pl-6 py-4 mb-6 border-l-4 border-primary-500 bg-gradient-to-r from-primary-500/10 to-transparent rounded-r-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lg sm:text-xl font-medium text-white/90 italic leading-relaxed">
                  &ldquo;Bridging the gap between <span className="text-primary-400">strategic leadership</span> and <span className="text-accent-400">technical innovation</span> — that&apos;s where I thrive.&rdquo;
                </p>
              </motion.blockquote>
              
              <div className="space-y-5 text-dark-200 text-base leading-relaxed">
                <p>
                  I&apos;m <span className="font-bold text-white">Dev Patel</span> — a{' '}
                  <span className="text-primary-400 font-semibold bg-primary-500/10 px-1.5 py-0.5 rounded">visionary student leader</span> and{' '}
                  <span className="text-accent-400 font-semibold bg-accent-500/10 px-1.5 py-0.5 rounded">aspiring technologist</span> who believes 
                  in the transformative power of combining cutting-edge development skills with strategic 
                  leadership abilities.
                </p>
                <p>
                  Currently serving as{' '}
                  <span className="font-bold text-white">General Secretary</span> at Gandhinagar University, 
                  I spearhead student governance while concurrently leading{' '}
                  <span className="text-accent-400 font-semibold">Event Production</span> and{' '}
                  <span className="text-cyan-400 font-semibold">Campaign & Marketing</span> divisions. 
                  As <span className="font-bold text-white">Jazba Head</span>, I orchestrated our flagship cultural festival with <span className="text-primary-400 font-semibold">50+ events</span> and <span className="text-primary-400 font-semibold">100+ volunteers</span>.
                </p>
                <p>
                  My stint as a{' '}
                  <span className="text-green-400 font-semibold bg-green-500/10 px-1.5 py-0.5 rounded">Starbucks Barista</span> was a masterclass in <span className="text-white font-medium">customer experience</span>, <span className="text-white font-medium">operational excellence</span>, 
                  and thriving under pressure.
                </p>
                <p>
                  Pursuing <span className="font-bold text-white">B.Tech in Computer Science</span> at 
                  Gandhinagar Institute of Technology (2023-2027). Certified in{' '}
                  <span className="text-cyan-400 font-semibold">Cloud Computing (IBM)</span>,{' '}
                  <span className="text-accent-400 font-semibold">Digital Marketing (HubSpot)</span>, and{' '}
                  <span className="text-primary-400 font-semibold">AWS Solutions Architecture</span>.
                </p>
              </div>
            </motion.div>
            
            {/* Section Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent my-4" />

            {/* Value Propositions */}
            <motion.div variants={itemVariants}>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">What I Bring to the Table</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {highlights.map((item, _index) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="card-love p-3 sm:p-4 group"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 relative z-10">
                      <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-r from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-colors">
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h5>
                        <p className="text-xs sm:text-sm text-dark-400">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA - Love Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#skills"
                className="btn-love text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Explore My Skills
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
              <motion.button
                onClick={downloadResumePDF}
                className="btn-love-ghost text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
