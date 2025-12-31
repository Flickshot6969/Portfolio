'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Award, 
  ExternalLink, 
  Calendar,
  Building,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'

const technicalCertifications = [
  {
    id: 1,
    title: 'Cloud Computing Fundamentals',
    issuer: 'IBM',
    date: 'December 2025',
    category: 'Cloud Computing',
    image: '/media/Certifications/Technical and soft skill certificates/cloud computing fundamentals ibm.pdf',
    description: 'Comprehensive understanding of cloud computing principles, services, and IBM Cloud architecture.',
    skills: ['Cloud Services', 'IBM Cloud', 'Virtualization', 'Cloud Architecture']
  },
  {
    id: 2,
    title: 'Digital Marketing Certification',
    issuer: 'HubSpot Academy',
    date: 'December 2025',
    category: 'Digital Marketing',
    credentialId: '8268d9048f3b4ff5a4705726ea0376bd',
    image: '/media/Certifications/Technical and soft skill certificates/digital marketing hubspot.png',
    description: 'Strategic digital marketing and inbound methodology certification with hands-on campaign management expertise.',
    skills: ['SEO', 'Content Marketing', 'Social Media Marketing', 'Analytics', 'Campaign Management']
  },
  {
    id: 3,
    title: 'AWS Solutions Architecture Job Simulation',
    issuer: 'Forage',
    date: 'July 2025',
    category: 'Cloud & AWS',
    credentialId: 'ftTNijFvh63WZw3CY',
    image: '/media/Certifications/Technical and soft skill certificates/AWS.pdf',
    description: 'Practical AWS solutions architecture experience through real-world simulation scenarios.',
    skills: ['AWS', 'Cloud Architecture', 'Solutions Design', 'Infrastructure']
  },
  {
    id: 4,
    title: 'Deloitte Cyber Security Job Simulation',
    issuer: 'Forage (Deloitte Australia)',
    date: 'July 2025',
    category: 'Cybersecurity',
    credentialId: 'ZtiKmGKFkQPPuQXnp',
    image: '/media/Certifications/Technical and soft skill certificates/cyber certification.pdf',
    description: 'Hands-on cybersecurity experience with threat analysis and security compliance.',
    skills: ['Cyber Security', 'Threat Analysis', 'Security Compliance', 'Risk Assessment']
  },
  {
    id: 5,
    title: 'Deloitte Technology Job Simulation',
    issuer: 'Forage (Deloitte Australia)',
    date: 'July 2025',
    category: 'Technology Consulting',
    credentialId: 'B9kbwjNiMAHWr2rjn',
    image: '/media/Certifications/Technical and soft skill certificates/Tech job simulation.pdf',
    description: 'Real-world technology consulting experience and enterprise problem-solving.',
    skills: ['Technology Consulting', 'Problem Solving', 'Technical Analysis', 'Enterprise Solutions']
  }
]

const starbucksCertifications = [
  {
    id: 1,
    title: 'Frappuccino Certification',
    issuer: 'Starbucks',
    description: 'Mastery in crafting signature Frappuccino beverages',
    image: '/media/Certifications/Starbucks certificates/Frappucino certification.pdf'
  },
  {
    id: 2,
    title: 'Latte Art Certification',
    issuer: 'Starbucks',
    description: 'Advanced skills in latte art and presentation',
    image: '/media/Certifications/Starbucks certificates/Latte Art.pdf'
  },
  {
    id: 3,
    title: 'Food Safety Certification',
    issuer: 'Starbucks',
    description: 'Comprehensive food safety and hygiene standards',
    image: '/media/Certifications/Starbucks certificates/Food Safety.pdf'
  },
  {
    id: 4,
    title: 'Customer Connection',
    issuer: 'Starbucks',
    description: 'Excellence in customer service and engagement',
    image: '/media/Certifications/Starbucks certificates/Customer connection.pdf'
  },
  {
    id: 5,
    title: 'Point of Sale',
    issuer: 'Starbucks',
    description: 'Proficiency in POS operations and transactions',
    image: '/media/Certifications/Starbucks certificates/point of sale.pdf'
  },
  {
    id: 6,
    title: 'Food Basics & Selling Skills',
    issuer: 'Starbucks',
    description: 'Product knowledge and sales expertise',
    image: '/media/Certifications/Starbucks certificates/food basics and selling skills.pdf'
  },
  {
    id: 7,
    title: 'CORE Workbook Completion',
    issuer: 'Starbucks',
    description: 'Core training program completion',
    image: '/media/Certifications/Starbucks certificates/CORE WORKBOOK.pdf'
  },
  {
    id: 8,
    title: 'Policy Course Completion',
    issuer: 'Starbucks',
    description: 'Company policies and compliance training',
    image: '/media/Certifications/Starbucks certificates/Policy course completion starbucks.pdf'
  }
]

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<'technical' | 'starbucks'>('technical')
  const [selectedCert, setSelectedCert] = useState<typeof technicalCertifications[0] | null>(null)
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

  return (
    <section id="certifications" className="section-padding relative overflow-hidden gradient-mesh network-grid">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-950/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Credentials
          </span>
          <h2 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Continuous learning and professional development across technical and soft skills domains.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 md:mb-12 px-4 sm:px-0"
        >
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base bouncy-click ${
              activeTab === 'technical'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 vegas-glow neumorphic'
                : 'glass-frost text-dark-300 hover:text-white hover-lift jelly-hover'
            }`}
          >
            Technical & Professional
          </button>
          <button
            onClick={() => setActiveTab('starbucks')}
            className={`px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base bouncy-click ${
              activeTab === 'starbucks'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30 neumorphic'
                : 'glass text-dark-300 hover:text-white jelly-hover'
            }`}
          >
            Starbucks Training
          </button>
        </motion.div>

        {/* Technical Certifications */}
        {activeTab === 'technical' && (
          <motion.div
            key="technical"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {technicalCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="glass-premium neumorphic rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full shine-effect">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-colors">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                    </div>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {cert.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-dark-400 text-xs sm:text-sm mb-2 sm:mb-3">
                    <Building size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span>{cert.issuer}</span>
                    <span className="text-dark-600">•</span>
                    <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                    <span>{cert.date}</span>
                  </div>

                  <p className="text-dark-400 text-xs sm:text-sm mb-3 sm:mb-4">{cert.description}</p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs bg-dark-800/50 text-dark-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View Certificate Link */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-dark-800">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-400 text-xs sm:text-sm font-medium">
                      View Certificate
                      <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Starbucks Certifications */}
        {activeTab === 'starbucks' && (
          <motion.div
            key="starbucks"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Starbucks Intro */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-center"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">☕</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2">Starbucks Certified Partner</h3>
              <p className="text-dark-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2 sm:px-0">
                Completed comprehensive training programs demonstrating excellence in customer service, 
                product knowledge, and operational skills. These certifications reflect my commitment 
                to quality and continuous learning in every role.
              </p>
            </motion.div>

            {/* Starbucks Certificates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {starbucksCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 group hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 flex items-center justify-center group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-colors">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{cert.title}</h4>
                      <p className="text-[10px] sm:text-xs text-dark-400">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-dark-400 line-clamp-2">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 glass-card rounded-full px-8 py-4">
            <Award className="w-6 h-6 text-primary-400" />
            <span className="text-dark-200">
              <span className="text-white font-semibold">15+ Certifications</span> across technical and professional domains
            </span>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-2xl p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
              <p className="text-primary-400 font-medium mb-4">{selectedCert.issuer}</p>
              <p className="text-dark-400 mb-6">{selectedCert.description}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {selectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm bg-primary-500/10 text-primary-400 border border-primary-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <motion.a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Certificate</span>
                <ExternalLink size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
