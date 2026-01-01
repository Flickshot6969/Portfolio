'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ArrowUpRight, 
  Users, 
  TrendingUp, 
  Zap, 
  Award,
  Cloud,
  Code2,
  Briefcase,
  Target,
  BarChart3
} from 'lucide-react'

// Featured projects with PROOF - not descriptions
const featuredProjects = [
  {
    id: 1,
    title: 'Student Governance Platform',
    role: 'General Secretary',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    gradient: 'from-violet-600 to-purple-600',
    problem: 'Fragmented communication between 5000+ students and university administration',
    impact: [
      { label: 'Students Represented', value: '5,000+', icon: Users },
      { label: 'Events Orchestrated', value: '50+', icon: Target },
      { label: 'Engagement Increase', value: '3x', icon: TrendingUp }
    ],
    outcome: 'Transformed student governance with streamlined communication, policy execution, and cross-functional collaboration',
    skills: ['Leadership', 'Stakeholder Management', 'Policy Execution', 'Public Speaking'],
    featured: true
  },
  {
    id: 2,
    title: 'IBM Cloud Architecture',
    role: 'Cloud Computing Specialist',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-blue-600 to-cyan-500',
    problem: 'Need for scalable, enterprise-grade cloud infrastructure solutions',
    impact: [
      { label: 'Cloud Services', value: '10+', icon: Cloud },
      { label: 'Deployment Time', value: '-60%', icon: Zap },
      { label: 'System Uptime', value: '99.9%', icon: BarChart3 }
    ],
    outcome: 'Designed and deployed cloud-native solutions using IBM Cloud, Docker, and CI/CD pipelines',
    skills: ['IBM Cloud', 'AWS', 'Docker', 'CI/CD', 'Cloud Architecture'],
    featured: true
  },
  {
    id: 3,
    title: 'Jazba Cultural Festival',
    role: 'Festival Head & Cultural Secretary',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    gradient: 'from-orange-500 to-pink-500',
    problem: 'Organizing university\'s flagship cultural event with limited resources and tight deadlines',
    impact: [
      { label: 'Events Managed', value: '50+', icon: Award },
      { label: 'Volunteers Led', value: '100+', icon: Users },
      { label: 'Attendees', value: '3,000+', icon: TrendingUp }
    ],
    outcome: 'Successfully executed largest campus festival with end-to-end production, vendor management, and creative direction',
    skills: ['Event Production', 'Team Leadership', 'Budget Management', 'Creative Direction'],
    featured: true
  },
  {
    id: 4,
    title: 'Customer Excellence @ Starbucks',
    role: 'Barista Partner',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    gradient: 'from-green-500 to-emerald-500',
    problem: 'Delivering consistent, high-quality customer experiences in fast-paced retail',
    impact: [
      { label: 'Daily Customers', value: '200+', icon: Users },
      { label: 'Service Rating', value: '4.9/5', icon: Award },
      { label: 'Speed Improvement', value: '+25%', icon: Zap }
    ],
    outcome: 'Mastered espresso crafting, CRM systems, and real-time problem-solving under pressure',
    skills: ['Customer Service', 'CRM', 'Operations', 'Quality Assurance'],
    featured: false
  }
]

export default function FeaturedProjects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header - AGGRESSIVE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            🔥 Proof, Not Promises
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block">Work That</span>
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent">
              Speaks Louder
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
            I don't just build things — I solve problems and deliver measurable impact.
            <span className="text-primary-400 font-medium"> Here's the proof.</span>
          </p>
        </motion.div>

        {/* Projects Grid - PROOF FIRST */}
        <div className="grid gap-8 md:gap-12">
          {featuredProjects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              className={`group relative ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                {/* Project Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-multiply z-10`} />
                  
                  {/* Image */}
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} - ${project.role}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-dark-900 rounded-xl font-semibold flex items-center gap-2"
                    >
                      View Details
                      <ArrowUpRight size={18} />
                    </motion.button>
                  </div>
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="px-3 py-1.5 bg-dark-900/90 backdrop-blur-sm rounded-lg text-sm font-medium text-white border border-white/10">
                      {project.role}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-6">
                  {/* Title & Problem */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-400 text-lg">
                      <span className="text-dark-300 font-medium">The Challenge:</span> {project.problem}
                    </p>
                  </div>

                  {/* Impact Metrics - THE PROOF */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.impact.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-center p-4 rounded-xl bg-dark-800/50 border border-dark-700 group-hover:border-primary-500/30 transition-colors"
                      >
                        <metric.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                        <div className="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-dark-400 mt-1">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <p className="text-dark-300">
                    <span className="text-primary-400 font-medium">→ Outcome:</span> {project.outcome}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-dark-800 text-dark-300 border border-dark-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Project - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-dark-800/50 to-dark-800/30 border border-dark-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <Briefcase className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">+ More Real-World Experience</h4>
                <p className="text-dark-400">Starbucks customer excellence, 200+ daily interactions, 4.9/5 rating</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              See Full Experience
              <ArrowUpRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
