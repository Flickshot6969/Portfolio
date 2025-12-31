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
  Star
} from 'lucide-react'

const experiences = [
  {
    id: 1,
    role: 'Technical Lead / Full Stack Developer',
    company: 'Freelance & Projects',
    location: 'Remote',
    period: '2022 - Present',
    type: 'Full-time',
    description: 'Leading development projects and teams, architecting scalable solutions, and delivering high-impact products.',
    achievements: [
      'Led cross-functional teams of 5+ developers across multiple projects',
      'Architected and deployed 10+ production applications using modern tech stack',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Mentored junior developers and established coding standards'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'AWS', 'MongoDB', 'TypeScript']
  },
  {
    id: 2,
    role: 'Barista & Team Lead',
    company: 'Starbucks',
    location: 'India',
    period: '2021 - 2022',
    type: 'Full-time',
    description: 'Demonstrated leadership in a fast-paced customer service environment while mastering operational excellence.',
    achievements: [
      'Trained and mentored new team members on company standards',
      'Achieved 100% completion on all certification programs',
      'Maintained highest customer satisfaction scores in the team',
      'Managed inventory and point-of-sale operations efficiently'
    ],
    technologies: ['Customer Service', 'Team Leadership', 'Operations', 'Training']
  }
]

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Built a complete e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/media/Images/3.JPG',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    links: { live: '#', github: '#' }
  },
  {
    id: 2,
    title: 'Project Management Tool',
    category: 'SaaS Application',
    description: 'Developed a comprehensive project management platform with real-time collaboration features.',
    image: '/media/Images/4.JPG',
    technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    links: { live: '#', github: '#' }
  },
  {
    id: 3,
    title: 'AI-Powered Analytics Dashboard',
    category: 'Data Visualization',
    description: 'Created an intelligent analytics platform with ML-powered insights and interactive visualizations.',
    image: '/media/Images/5.jpg',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    links: { live: '#', github: '#' }
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Setup',
    category: 'DevOps',
    description: 'Designed and implemented scalable cloud infrastructure with auto-scaling and monitoring.',
    image: '/media/Images/6.JPG',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    links: { live: '#', github: '#' }
  },
  {
    id: 5,
    title: 'Mobile Banking App',
    category: 'Mobile Development',
    description: 'Built a secure mobile banking application with biometric authentication and real-time transactions.',
    image: '/media/Images/7.jpg',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    links: { live: '#', github: '#' }
  },
  {
    id: 6,
    title: 'Portfolio Website',
    category: 'Web Design',
    description: 'Designed and developed this stunning portfolio with advanced animations and SEO optimization.',
    image: '/media/Images/8.JPG',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    links: { live: '#', github: '#' }
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
      <section id="experience" className="section-padding relative overflow-hidden">
        <div className="container-custom relative z-10" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Career Journey
            </span>
            <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              A track record of delivering results across technical and leadership roles.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline Line */}
            <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-4 sm:gap-8 mb-8 sm:mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-x-1/2 mt-8 z-10 shadow-lg shadow-primary-500/50" />

                {/* Content Card */}
                <div className={`flex-1 ml-12 sm:ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="glass-card glass-card-hover rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
                    whileHover={{ scale: 1.02 }}
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

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs bg-dark-800 text-dark-300 border border-dark-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for timeline alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-primary-950/5 to-transparent">
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
                <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium glass text-white">
                      {project.category}
                    </span>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <motion.a
                          href={project.links.live}
                          className="p-2 sm:p-3 rounded-full glass text-white hover:bg-white/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
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
              className="btn-outline inline-flex items-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
