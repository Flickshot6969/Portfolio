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
  Code2
} from 'lucide-react'

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            About Me
          </span>
          <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Bridging <span className="gradient-text">Technology</span> & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            A unique blend of technical expertise and management acumen, driving innovation while leading teams to success.
          </p>
        </motion.div>

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
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 border-l-2 border-t-2 border-primary-500/30 rounded-tl-2xl sm:rounded-tl-3xl" />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border-r-2 border-b-2 border-accent-500/30 rounded-br-2xl sm:rounded-br-3xl" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-premium p-1.5 sm:p-2 card-3d hover-glow-intense neumorphic">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src="/media/Images/2.JPG"
                    alt="Dev Patel - Professional"
                    className="w-full aspect-[4/5] object-cover object-top"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
                
                {/* Overlay Info Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 glass-premium rounded-lg sm:rounded-xl p-3 sm:p-4 bouncy-click">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base">Dev Patel</h4>
                      <p className="text-xs sm:text-sm text-dark-300">General Secretary & Tech Leader</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Strategic Leader */}
              <motion.div
                className="absolute -right-2 sm:-right-4 top-1/4 glass-card px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl hidden sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  <span className="text-xs sm:text-sm font-medium text-white">Strategic Leader</span>
                </div>
              </motion.div>

              {/* Floating Badge - Passionate Coder */}
              <motion.div
                className="absolute -left-2 sm:-left-4 bottom-1/3 glass-card px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl hidden sm:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-medium text-white">Passionate Coder</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Personal Info Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-8"
            >
              {personalInfo.map((info, index) => (
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
            {/* Story Section */}
            <motion.div variants={itemVariants}>
              <h3 className="heading-md mb-4">
                My <span className="gradient-text">Journey</span>
              </h3>
              <div className="space-y-4 text-body">
                <p>
                  I&apos;m Dev Patel — a{' '}
                  <span className="text-primary-400 font-medium">visionary student leader</span> and{' '}
                  <span className="text-accent-400 font-medium">aspiring technologist</span> who believes 
                  in the transformative power of combining cutting-edge development skills with strategic 
                  leadership abilities. My journey began with a deep curiosity for technology that evolved 
                  into a passion for creating real impact.
                </p>
                <p>
                  Currently serving as{' '}
                  <span className="text-primary-400 font-medium">General Secretary</span> at Gandhinagar University, 
                  I spearhead student governance while concurrently leading{' '}
                  <span className="text-accent-400 font-medium">Event Production</span> and{' '}
                  <span className="text-cyan-400 font-medium">Campaign & Marketing</span> divisions. 
                  As Jazba Head, I orchestrated our flagship cultural festival with 50+ events and 100+ volunteers — 
                  proving that meticulous planning meets creative execution.
                </p>
                <p>
                  My stint as a{' '}
                  <span className="text-green-400 font-medium">Starbucks Barista</span> wasn&apos;t just about 
                  crafting beverages — it was a masterclass in customer experience, operational excellence, 
                  and thriving under pressure. These skills now fuel my approach to both code and leadership.
                </p>
                <p>
                  Pursuing <span className="text-primary-400 font-medium">B.Tech in Computer Science</span> at 
                  Gandhinagar Institute of Technology (2023-2027), I bridge technical expertise with strategic 
                  thinking. Certified in <span className="text-cyan-400 font-medium">Cloud Computing (IBM)</span>,{' '}
                  <span className="text-accent-400 font-medium">Digital Marketing (HubSpot)</span>, and{' '}
                  <span className="text-primary-400 font-medium">AWS Solutions Architecture</span> — I lead projects 
                  from conception to delivery, ensuring innovative solutions meet real-world needs.
                </p>
              </div>
            </motion.div>

            {/* Value Propositions */}
            <motion.div variants={itemVariants}>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">What I Bring to the Table</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="glass-premium rounded-lg sm:rounded-xl p-3 sm:p-4 group hover:border-primary-500/30 transition-all duration-300 neumorphic shine-effect"
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
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

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4">
              <motion.a
                href="#skills"
                className="btn-primary btn-premium text-sm sm:text-base ripple-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore My Skills</span>
              </motion.a>
              <motion.a
                href="/Dev_Patel_Resume.pdf"
                download
                className="btn-outline btn-premium neumorphic-button text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
