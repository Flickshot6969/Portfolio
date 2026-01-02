'use client'

import { motion, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import {
  Code2,
  Server,
  Cloud,
  Shield,
  Users,
  Briefcase,
  LineChart,
  Lightbulb,
  Target,
  MessageSquare,
  Zap,
  Layers,
  Sparkles,
  Heart,
  Clock,
  Brain,
  Award,
  Mic,
  Settings,
  TrendingUp,
  FileSpreadsheet,
  PenTool,
  Headphones
} from 'lucide-react'
import { SmoothCounter } from './EliteEffects'
import { useInteraction } from '@/lib/InteractionIntelligence'

import { 
  SectionAwareness,
  AmbientWave
} from './MotionHierarchy'
// ⚡ NEW: Psychological Motion & Tactile Systems
import { 
  GrandEntrance,
  HeartbeatElement,
  FocusPull
} from '@/lib/PsychologicalMotion'



const skillCategories = [
  {
    id: 'tech',
    title: 'Technical & Tools',
    subtitle: 'Development & Technology',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Python', level: 85, icon: Code2 },
      { name: 'C/C++', level: 80, icon: Server },
      { name: 'AWS Cloud', level: 82, icon: Cloud },
      { name: 'Cybersecurity', level: 85, icon: Shield },
      { name: 'Data Analysis', level: 80, icon: LineChart },
      { name: 'MS Office Suite', level: 95, icon: FileSpreadsheet },
      { name: 'Google Workspace', level: 92, icon: Layers },
      { name: 'Canva Design', level: 88, icon: PenTool },
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership & Management',
    subtitle: 'Governance & Strategy',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Event Planning & Coordination', level: 95, icon: Zap },
      { name: 'Creative Direction', level: 92, icon: Lightbulb },
      { name: 'Leadership & Team Handling', level: 95, icon: Users },
      { name: 'Strategic Planning', level: 90, icon: Target },
      { name: 'Crisis Management', level: 88, icon: Shield },
      { name: 'Budgeting & Resource Allocation', level: 85, icon: TrendingUp },
      { name: 'Project & Committee Management', level: 92, icon: Briefcase },
      { name: 'Team Motivation & Mentoring', level: 90, icon: Heart },
    ]
  },
  {
    id: 'communication',
    title: 'Communication & PR',
    subtitle: 'Public Relations & Advocacy',
    icon: Mic,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Public Relations & Communication', level: 95, icon: Mic },
      { name: 'Communication Mastery', level: 92, icon: MessageSquare },
      { name: 'Conflict Resolution & Diplomacy', level: 88, icon: Shield },
      { name: 'Representation & Advocacy', level: 90, icon: Award },
      { name: 'Professional Ethics', level: 95, icon: Target },
      { name: 'Marketing & Promotion', level: 88, icon: TrendingUp },
      { name: 'Cultural Knowledge & Inclusivity', level: 90, icon: Heart },
      { name: 'Stakeholder Management', level: 92, icon: Users },
    ]
  },
  {
    id: 'soft',
    title: 'Soft Skills & Operations',
    subtitle: 'Customer Service & Efficiency',
    icon: Heart,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Customer Service Excellence', level: 95, icon: Headphones },
      { name: 'Time Management', level: 90, icon: Clock },
      { name: 'Multitasking', level: 92, icon: Layers },
      { name: 'Problem-Solving', level: 90, icon: Brain },
      { name: 'Attention to Detail', level: 88, icon: Target },
      { name: 'Stress Handling', level: 85, icon: Shield },
      { name: 'Team Collaboration', level: 95, icon: Users },
      { name: 'Adaptability', level: 92, icon: Settings },
    ]
  }
]

const techStack = [
  { name: 'Python', icon: '🐍' },
  { name: 'C/C++', icon: '⚡' },
  { name: 'AWS', icon: '☁️' },
  { name: 'MS Office', icon: '📊' },
  { name: 'Canva', icon: '🎨' },
  { name: 'Google Workspace', icon: '📁' },
  { name: 'Digital Marketing', icon: '📈' },
  { name: 'Event Management', icon: '🎪' },
  { name: 'Project Management', icon: '📋' },
  { name: 'Leadership', icon: '👑' },
  { name: 'Customer Service', icon: '🤝' },
  { name: 'Team Building', icon: '💪' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('tech')
  const { state } = useInteraction()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // Scroll-reactive springs
  const sectionScale = useSpring(1, { stiffness: 100, damping: 20 })
  const sectionOpacity = useSpring(1, { stiffness: 150, damping: 25 })
  
  // React to scroll velocity
  useEffect(() => {
    if (state.scroll.velocity > 0.5) {
      sectionScale.set(0.98)
      sectionOpacity.set(0.9)
    } else {
      sectionScale.set(1)
      sectionOpacity.set(1)
    }
  }, [state.scroll.velocity, sectionScale, sectionOpacity])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)

  return (
    <SectionAwareness className="relative">
      {({ visibility, isEntering, isLeaving: _isLeaving, position: _position }) => (
        <section id="skills" className="section-padding relative overflow-hidden network-grid">
          {/* Ambient Wave - Tertiary Motion */}
          <AmbientWave intensity={visibility * 0.5} />
          
          {/* Background Decoration - React to Visibility */}
          <motion.div 
            className="absolute top-1/2 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"
            animate={{ 
              scale: isEntering ? [0.8, 1.1, 1] : 1,
              opacity: visibility * 0.8
            }}
            transition={{ duration: 1 }}
          />
          <motion.div 
            className="absolute top-1/2 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            animate={{ 
              scale: isEntering ? [0.8, 1.1, 1] : 1,
              opacity: visibility * 0.8
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl vegas-glow" />

          <motion.div 
            className="container-custom relative z-10" 
            ref={ref}
            style={{ scale: sectionScale, opacity: sectionOpacity }}
          >
        {/* Section Header - Elite with Grand Entrance */}
        <GrandEntrance delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <HeartbeatElement intensity={0.5}>
              <motion.span 
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-elite text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4 magnetic-glow breathing-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring' }}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                My Expertise
              </motion.span>
            </HeartbeatElement>
            <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Skills &{' '}
              </motion.span>
              <FocusPull intensity={1.2}>
                <motion.span 
                  className="gradient-shimmer"
                  initial={{ opacity: 0, rotateX: -40 }}
                  animate={inView ? { opacity: 1, rotateX: 0 } : {}}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                >
                  Competencies
                </motion.span>
              </FocusPull>
            </h2>
            <motion.p 
              className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              A comprehensive skill set spanning technical development, strategic leadership, and digital marketing – 
              the perfect combination for delivering exceptional results.
            </motion.p>
          </motion.div>
        </GrandEntrance>

        {/* Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12"
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setActiveCategory(category.id)}
              className={`relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-500 bouncy-click ${
                activeCategory === category.id
                  ? 'glass-premium border-primary-500/50 shadow-lg shadow-primary-500/20 vegas-glow neumorphic'
                  : 'glass-frost hover:border-white/20 hover-lift jelly-hover'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${category.color} ${
                activeCategory === category.id ? 'opacity-100' : 'opacity-50'
              }`}>
                <category.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-left">
                <p className={`text-xs sm:text-sm md:font-semibold transition-colors ${
                  activeCategory === category.id ? 'text-white' : 'text-dark-300'
                }`}>
                  {category.title}
                </p>
                <p className="text-[10px] sm:text-xs text-dark-400 hidden sm:block">{category.subtitle}</p>
              </div>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-primary-500/50"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid - Elite Cards with Progress Bars */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-12 md:mb-20"
        >
          {activeSkills?.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 120 }}
              className="group"
            >
              <motion.div 
                className="card-love relative p-5 sm:p-6 h-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Glow on Hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${activeSkills.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                />
                
                {/* Skill Icon & Level Badge */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-br ${activeSkills.color} shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  
                  {/* Level Badge */}
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${activeSkills.color} bg-opacity-20`}>
                      <span className="text-lg sm:text-xl font-bold text-white">
                        <SmoothCounter target={skill.level} suffix="%" duration={1.5} />
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Skill Name */}
                <h4 className="font-bold text-white text-base sm:text-lg mb-3 group-hover:text-primary-300 transition-colors leading-tight">
                  {skill.name}
                </h4>
                
                {/* Progress Bar - Premium Style */}
                <div className="relative">
                  <div className="h-2.5 bg-dark-800/80 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${activeSkills.color} relative`}
                    >
                      {/* Animated Shine */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Level Indicator Dots */}
                  <div className="flex justify-between mt-2 px-0.5">
                    {[0, 25, 50, 75, 100].map((mark) => (
                      <div 
                        key={mark}
                        className={`w-1 h-1 rounded-full transition-colors ${
                          skill.level >= mark ? 'bg-primary-400' : 'bg-dark-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <h3 className="text-center text-base sm:text-xl font-semibold text-white mb-4 sm:mb-8">
            Technologies I Work With
          </h3>
          
          <div className="relative overflow-hidden py-2 sm:py-4">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-dark-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-dark-950 to-transparent z-10" />
            
            {/* Scrolling Content */}
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="flex gap-3 sm:gap-6"
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl whitespace-nowrap"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-dark-200 font-medium text-xs sm:text-sm">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Why Hire Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 md:mt-20 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5" />
          
          <div className="relative z-10">
            <h3 className="heading-md text-center mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Why I&apos;m the <span className="gradient-text">Perfect Fit</span>
            </h3>
            <p className="text-body text-center max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              A rare combination of leadership, technical skills & customer excellence
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Leadership Excellence</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  General Secretary leading 5000+ students with strategic vision
                </p>
              </div>
              
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Event Production</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  50+ events managed with end-to-end planning & execution
                </p>
              </div>
              
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Communication Pro</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  Public relations, stakeholder management & team coordination
                </p>
              </div>
              
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Customer Focus</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  Starbucks-trained in customer service excellence & hospitality
                </p>
              </div>
            </div>
          </div>
        </motion.div>
          </motion.div>
        </section>
      )}
    </SectionAwareness>
  )
}
