'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  Code2,
  Server,
  Database,
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
  Monitor,
  Smartphone,
  GitBranch,
  Figma,
  Palette
} from 'lucide-react'

const skillCategories = [
  {
    id: 'tech',
    title: 'Technical Skills',
    subtitle: 'Development & Engineering',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React/Next.js', level: 95, icon: Monitor },
      { name: 'Node.js/Express', level: 90, icon: Server },
      { name: 'TypeScript', level: 88, icon: Code2 },
      { name: 'Python', level: 85, icon: Code2 },
      { name: 'MongoDB/PostgreSQL', level: 85, icon: Database },
      { name: 'AWS/Cloud Services', level: 82, icon: Cloud },
      { name: 'Docker/Kubernetes', level: 78, icon: Layers },
      { name: 'Cybersecurity', level: 80, icon: Shield },
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership Skills',
    subtitle: 'Team & People Management',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Team Building', level: 92, icon: Users },
      { name: 'Mentorship', level: 90, icon: Lightbulb },
      { name: 'Strategic Planning', level: 88, icon: Target },
      { name: 'Communication', level: 95, icon: MessageSquare },
      { name: 'Decision Making', level: 88, icon: Zap },
      { name: 'Conflict Resolution', level: 85, icon: Shield },
    ]
  },
  {
    id: 'management',
    title: 'Product & Project Management',
    subtitle: 'Delivery & Strategy',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Agile/Scrum', level: 92, icon: GitBranch },
      { name: 'Product Strategy', level: 88, icon: LineChart },
      { name: 'Stakeholder Management', level: 90, icon: Users },
      { name: 'Risk Assessment', level: 85, icon: Shield },
      { name: 'Resource Planning', level: 87, icon: Target },
      { name: 'Roadmap Planning', level: 90, icon: Briefcase },
    ]
  }
]

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '💙' },
  { name: 'Python', icon: '🐍' },
  { name: 'AWS', icon: '☁️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Tailwind', icon: '💨' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('tech')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            My Expertise
          </span>
          <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Skills & <span className="gradient-text">Competencies</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            A comprehensive skill set spanning technical development, team leadership, and product management – 
            the perfect trifecta for delivering exceptional results.
          </p>
        </motion.div>

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
              className={`relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                activeCategory === category.id
                  ? 'glass-card border-primary-500/50 shadow-lg shadow-primary-500/20'
                  : 'glass hover:border-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-20"
        >
          {activeSkills?.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-xl sm:rounded-2xl p-4 sm:p-6 group"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${activeSkills.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{skill.name}</h4>
                </div>
                <span className="text-lg sm:text-2xl font-bold gradient-text">{skill.level}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 sm:h-2 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${activeSkills.color}`}
                />
              </div>
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
              I bring a rare combination that most candidates can&apos;t offer
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Code2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Technical Depth</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  Strong hands-on experience with modern tech stacks and best practices
                </p>
              </div>
              
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Leadership Ability</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  Proven track record of building and leading high-performing teams
                </p>
              </div>
              
              <div className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">Business Acumen</h4>
                <p className="text-xs sm:text-sm text-dark-400">
                  Understanding of product strategy and delivering business value
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
