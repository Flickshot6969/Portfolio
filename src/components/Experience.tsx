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
    title: 'Student Council Platform',
    category: 'Web Application',
    description: 'A governance platform concept enabling seamless communication between administration and 5000+ students.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'REST API'],
    links: { live: '#', github: '#' },
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    title: 'Cloud Architecture Solutions',
    category: 'Cloud Computing',
    description: 'Enterprise-grade cloud infrastructure design and implementation using AWS and IBM Cloud best practices.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    technologies: ['AWS', 'IBM Cloud', 'Docker', 'CI/CD'],
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
        {/* Floating Orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container-custom relative z-10" ref={ref}>
          {/* Section Header - Elite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-elite text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4 magnetic-glow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Award className="w-4 h-4" />
              Career Journey
            </motion.span>
            <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Work{' '}
              </motion.span>
              <motion.span 
                className="gradient-shimmer"
                initial={{ opacity: 0, rotateX: -40 }}
                animate={inView ? { opacity: 1, rotateX: 0 } : {}}
                transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              >
                Experience
              </motion.span>
            </h2>
            <motion.p 
              className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              A track record of delivering results across technical and leadership roles.
            </motion.p>
          </motion.div>

          {/* Timeline - Elite */}
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
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-primary-400">
                          <Building size={14} className="sm:w-4 sm:h-4" />
                          <span className="font-medium text-sm sm:text-base">{exp.company}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-dark-400 mb-3 sm:mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="sm:w-[14px] sm:h-[14px]" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-dark-300 mb-3 sm:mb-4 text-sm sm:text-base">{exp.description}</p>

                    {/* Achievements */}
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Star size={12} className="sm:w-[14px] sm:h-[14px] text-accent-400 mt-0.5 sm:mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-dark-300">{achievement}</span>
                        </div>
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
