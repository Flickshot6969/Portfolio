'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink,
  ArrowRight,
  Building,
  Star,
  Sparkles,
  Award
} from 'lucide-react'
import { BlurReveal, TiltCard } from './AnimationEffects'
import { Card3D, SectionReveal } from './EliteEffects'
// ⚡ NEW: Psychological Motion & Narrative Systems
import { 
  AweReveal, 
  GrandEntrance,
  HeartbeatElement,
  FocusPull,
  BreathingContainer
} from '@/lib/PsychologicalMotion'
import { 
  TactileCard, 
  MagneticElement,
  TactileRipple
} from '@/lib/TactileSystem'
import { 
  DramaticReveal, 
  ScrollTimeline, 
  ScrollSpotlight,
  ScrollSequence,
  FocusScroll
} from '@/lib/NarrativeScroll'

const experiences = [
  {
    id: 1,
    role: 'General Secretary',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Aug 2025 - Present',
    type: 'Full-time',
    description: 'Spearheading student governance as the primary liaison between 5000+ students and university administration.',
    achievements: [
      'Leading student governance and representing student body to university administration',
      'Orchestrating university-wide academic, cultural, and professional initiatives',
      'Driving policy execution and institutional compliance across all student organizations',
      'Delivering structured, high-impact outcomes through decisive decision-making'
    ],
    technologies: ['Governance', 'Leadership', 'Policy Execution', 'Stakeholder Management']
  },
  {
    id: 2,
    role: 'Head of Event Production & Campaign Marketing',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Aug 2025 - Present',
    type: 'Full-time',
    description: 'Leading end-to-end execution of dynamic campus events and comprehensive marketing campaigns.',
    achievements: [
      'Managing cross-functional volunteer teams and multi-stakeholder collaboration',
      'Architecting marketing campaigns from strategy and positioning to execution',
      'Overseeing budget planning, resource allocation, and vendor coordination',
      'Driving brand visibility and audience engagement across digital channels'
    ],
    technologies: ['Event Management', 'Digital Marketing', 'Campaign Strategy', 'Team Leadership']
  },
  {
    id: 3,
    role: 'Jazba Head & Cultural Secretary',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Sep 2024 - Oct 2025',
    type: 'Leadership Role',
    description: 'Led the flagship annual cultural festival and directed all university-level cultural events.',
    achievements: [
      'Managed Jazba festival with 50+ events and coordination of 100+ volunteers',
      'Directed planning, coordination, and execution of university cultural programs',
      'Strengthened leadership, event production, and strategic problem-solving skills',
      'Fostered talent development across student cultural organizations'
    ],
    technologies: ['Event Production', 'Team Coordination', 'Talent Management', 'Strategic Planning']
  },
  {
    id: 4,
    role: 'Barista',
    company: 'Starbucks India',
    location: 'Ahmedabad, Gujarat',
    period: 'Feb 2025 - Sep 2025',
    type: 'Part-time',
    description: 'Delivered exceptional customer experiences in high-volume, fast-paced retail environment.',
    achievements: [
      'Mastered espresso crafting, beverage preparation, and food safety compliance',
      'Built expertise in CRM, customer engagement, and sales operations excellence',
      'Developed advanced interpersonal, multitasking, and real-time problem-solving skills',
      'Recognized for outstanding service quality and professional growth mindset'
    ],
    technologies: ['Customer Service', 'CRM', 'Food Safety', 'Sales Operations']
  }
]

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    category: 'Full Stack Development',
    description: 'A modern, responsive portfolio showcasing advanced web development skills with seamless animations and dark theme.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    links: { live: '#', github: '#' },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Event Management System',
    category: 'Leadership Project',
    description: 'Comprehensive event orchestration for university festivals, managing 50+ events with 100+ volunteer coordination.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    technologies: ['Event Planning', 'Team Management', 'Budget Control', 'Vendor Coordination'],
    links: { live: '#', github: '#' },
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'Digital Marketing Campaign',
    category: 'Marketing & Branding',
    description: 'Data-driven marketing campaigns achieving significant reach and engagement through strategic content and analytics.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=800&q=80',
    technologies: ['Social Media', 'Content Strategy', 'Analytics', 'SEO'],
    links: { live: '#', github: '#' },
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Student Governance Platform',
    category: 'Leadership Project as General Secretary',
    description: 'A governance platform enabling seamless communication between administration and 5000+ students, built during tenure as General Secretary.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'REST API', 'Student Leadership'],
    links: { live: '#', github: '#' },
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    title: 'IBM Cloud Architecture Solutions',
    category: 'Cloud Computing',
    description: 'Enterprise-grade IBM Cloud infrastructure design and deployment featuring cloud automation, containerization, and CI/CD best practices.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    technologies: ['IBM Cloud', 'AWS', 'Docker', 'CI/CD', 'Cloud Automation'],
    links: { live: '#', github: '#' },
    gradient: 'from-indigo-500 to-violet-500'
  },
  {
    id: 6,
    title: 'Customer Experience System',
    category: 'Service Excellence',
    description: 'Operational excellence framework implementing world-class customer service standards in high-volume retail.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    technologies: ['Customer Service', 'CRM', 'Operations', 'Quality Assurance'],
    links: { live: '#', github: '#' },
    gradient: 'from-rose-500 to-pink-500'
  }
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <>
      {/* Experience Section */}
      <section id="experience" className="section-padding relative overflow-hidden aurora-bg">
        {/* Floating Orbs with Breathing */}
        <BreathingContainer breathIntensity={0.3}>
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl animate-pulse" />
        </BreathingContainer>
        <BreathingContainer breathIntensity={0.4}>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </BreathingContainer>
        
        <div className="container-custom relative z-10" ref={ref}>
          {/* Section Header - Elite with Grand Entrance */}
          <GrandEntrance delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-16"
            >
              <HeartbeatElement intensity={0.6}>
                <motion.span 
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-elite text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4 magnetic-glow breathing-glow"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Award className="w-4 h-4" />
                  Career Journey
                </motion.span>
              </HeartbeatElement>
              {/* H1 for Portfolio/Experience - SEO */}
              <h1 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Technical Projects{' '}
                </motion.span>
                <FocusPull intensity={1.2}>
                  <motion.span 
                    className="gradient-shimmer"
                    initial={{ opacity: 0, rotateX: -40 }}
                    animate={inView ? { opacity: 1, rotateX: 0 } : {}}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                  >
                    & Leadership Work
                  </motion.span>
                </FocusPull>
              </h1>
              {/* H2 for SEO */}
              <h2 className="sr-only">Cloud Computing | Student Leadership | Professional Experience</h2>
              <motion.p 
                className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                Each portfolio item demonstrates high-class execution, from IBM Cloud Computing deployment 
                to organizational leadership excellence as General Secretary and Starbucks barista professional experience.
              </motion.p>
            </motion.div>
          </GrandEntrance>

          {/* Timeline - Elite with Scroll Spotlight */}
          <ScrollSpotlight spotlightColor="rgba(139, 92, 246, 0.1)">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="relative max-w-4xl mx-auto"
            >
            {/* Timeline Line - Elite Gradient */}
            <motion.div 
              className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
            >
              <div className="w-full h-full bg-gradient-to-b from-primary-500 via-accent-500 to-cyan-500 rounded-full shadow-lg shadow-primary-500/30" />
            </motion.div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-4 sm:gap-8 mb-8 sm:mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot - Elite Glow */}
                <motion.div 
                  className="absolute left-6 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-x-1/2 mt-8 z-10 supreme-glow"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
                />

                {/* Content Card - Elite 3D */}
                <div className={`flex-1 ml-12 sm:ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card3D 
                    className="glass-elite rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 premium-card-hover"
                    intensity={8}
                  >
                    {/* Header - Enhanced Visual Hierarchy */}
                    <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
                      <div className="flex-1">
                        {/* Role - Bold & Prominent */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight tracking-tight">{exp.role}</h3>
                        {/* Company - Styled differently */}
                        <div className="flex items-center gap-2 text-primary-400 mb-2">
                          <Building size={16} className="sm:w-5 sm:h-5 opacity-80" />
                          <span className="font-semibold text-sm sm:text-base italic">{exp.company}</span>
                        </div>
                        {/* Date & Location - Right-aligned style with clear separation */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-dark-400">
                          <span className="flex items-center gap-1.5 bg-dark-800/60 px-2.5 py-1 rounded-lg">
                            <Calendar size={13} className="text-accent-400" />
                            <span className="font-medium">{exp.period}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-dark-500" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>
                      {/* Type Badge */}
                      <motion.span 
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/30 shadow-lg shadow-primary-500/10"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.type}
                      </motion.span>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-4" />

                    {/* Description - Emphasized */}
                    <p className="text-dark-200 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed font-medium">{exp.description}</p>

                    {/* Achievements - Better visual hierarchy */}
                    <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start gap-3 group/achievement"
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <div className="mt-1 p-1 rounded-md bg-accent-500/10 group-hover/achievement:bg-accent-500/20 transition-colors">
                            <Star size={12} className="text-accent-400" />
                          </div>
                          <span className="text-xs sm:text-sm text-dark-300 leading-relaxed group-hover/achievement:text-dark-200 transition-colors">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies - Elite Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.8 + techIndex * 0.05 }}
                          className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs bg-dark-800/80 text-dark-300 border border-dark-700 hover:border-primary-500/50 hover:text-primary-300 transition-all duration-300 cursor-default"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </Card3D>
                </div>

                {/* Empty space for timeline alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </motion.div>
          </ScrollSpotlight>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding relative overflow-hidden gradient-mesh">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Featured Work
            </span>
            <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              A showcase of projects demonstrating technical excellence and creative problem-solving.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-premium rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col hover-lift-shadow spotlight-card neumorphic">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium glass-premium text-white">
                      {project.category}
                    </span>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <motion.a
                          href={project.links.live}
                          className="p-2 sm:p-3 rounded-full glass-premium text-white hover:bg-white/20 transition-colors jelly-hover"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs bg-dark-800/50 text-dark-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <a
                      href={project.links.live}
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-400 text-xs sm:text-sm font-medium group-hover:gap-2 sm:group-hover:gap-3 transition-all"
                    >
                      View Project
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.a
              href="#"
              className="btn-outline btn-premium inline-flex items-center gap-2 text-sm sm:text-base neumorphic-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
