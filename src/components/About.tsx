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
  Heart
} from 'lucide-react'

const highlights = [
  {
    icon: Target,
    title: 'Vision-Driven',
    description: 'Turning ambitious ideas into reality through strategic planning and execution'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Focus',
    description: 'Constantly exploring new technologies and methodologies to stay ahead'
  },
  {
    icon: Users,
    title: 'Team Leadership',
    description: 'Building and mentoring high-performing teams to achieve exceptional results'
  },
  {
    icon: Rocket,
    title: 'Results Oriented',
    description: 'Delivering measurable impact through data-driven decision making'
  }
]

const personalInfo = [
  { icon: User, label: 'Name', value: 'Dev Patel' },
  { icon: MapPin, label: 'Location', value: 'India' },
  { icon: Mail, label: 'Email', value: 'devpatel170521@gmail.com' },
  { icon: Calendar, label: 'Experience', value: '3+ Years' },
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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Section Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/5 to-transparent pointer-events-none" />
      
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
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card p-1.5 sm:p-2">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src="/media/Images/2.JPG"
                    alt="Dev Patel - Professional"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                </div>
                
                {/* Overlay Info Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 glass-card rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm sm:text-base">Dev Patel</h4>
                      <p className="text-xs sm:text-sm text-dark-300">Technical Leader & Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -right-2 sm:-right-4 top-1/4 glass-card px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl hidden sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
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
                  className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 group hover:border-primary-500/30 transition-all duration-300"
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
                  I&apos;m Dev Patel, a passionate technologist who believes in the power of combining 
                  <span className="text-primary-400 font-medium"> cutting-edge development skills</span> with 
                  <span className="text-accent-400 font-medium"> strategic leadership abilities</span>. 
                </p>
                <p>
                  My journey began with a deep curiosity for technology, which evolved into expertise 
                  spanning Full Stack Development, Cloud Architecture, and Cybersecurity. But I didn&apos;t 
                  stop at technical proficiency – I recognized that creating real impact requires 
                  understanding both the code and the business.
                </p>
                <p>
                  Today, I lead projects from conception to delivery, bridging the gap between 
                  technical teams and stakeholders, ensuring that innovative solutions meet real-world needs.
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
                    className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 group hover:border-primary-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
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
                className="btn-primary text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore My Skills</span>
              </motion.a>
              <motion.a
                href="/Dev_Patel_Resume.pdf"
                download
                className="btn-outline text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
