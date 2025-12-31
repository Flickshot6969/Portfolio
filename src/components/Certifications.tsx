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
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2023',
    category: 'Cloud Computing',
    image: '/media/Certifications/Technical and soft skill certificates/AWS.pdf',
    description: 'Foundational understanding of AWS Cloud services and architecture.',
    skills: ['AWS', 'Cloud Architecture', 'Security', 'Networking']
  },
  {
    id: 2,
    title: 'Cloud Computing Fundamentals',
    issuer: 'IBM',
    date: '2023',
    category: 'Cloud Computing',
    image: '/media/Certifications/Technical and soft skill certificates/cloud computing fundamentals ibm.pdf',
    description: 'Comprehensive understanding of cloud computing principles and services.',
    skills: ['Cloud Services', 'IBM Cloud', 'Virtualization', 'DevOps']
  },
  {
    id: 3,
    title: 'Cybersecurity Certification',
    issuer: 'Professional Institute',
    date: '2023',
    category: 'Security',
    image: '/media/Certifications/Technical and soft skill certificates/cyber certification.pdf',
    description: 'Expertise in cybersecurity practices and threat management.',
    skills: ['Security', 'Threat Analysis', 'Network Security', 'Compliance']
  },
  {
    id: 4,
    title: 'Digital Marketing',
    issuer: 'HubSpot',
    date: '2023',
    category: 'Marketing',
    image: '/media/Certifications/Technical and soft skill certificates/digital marketing hubspot.png',
    description: 'Strategic digital marketing and inbound methodology.',
    skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics']
  },
  {
    id: 5,
    title: 'Tech Job Simulation',
    issuer: 'Professional Program',
    date: '2023',
    category: 'Professional Development',
    image: '/media/Certifications/Technical and soft skill certificates/Tech job simulation.pdf',
    description: 'Real-world technical job experience and problem-solving.',
    skills: ['Problem Solving', 'Technical Skills', 'Communication', 'Teamwork']
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
    <section id="certifications" className="section-padding relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-950/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary-400 text-sm font-medium mb-4">
            Credentials
          </span>
          <h2 className="heading-lg mb-4">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Continuous learning and professional development across technical and soft skills domains.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === 'technical'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                : 'glass text-dark-300 hover:text-white'
            }`}
          >
            Technical & Professional
          </button>
          <button
            onClick={() => setActiveTab('starbucks')}
            className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === 'starbucks'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                : 'glass text-dark-300 hover:text-white'
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {technicalCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="glass-card glass-card-hover rounded-2xl p-6 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-colors">
                      <Award className="w-6 h-6 text-primary-400" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      {cert.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-dark-400 text-sm mb-3">
                    <Building size={14} />
                    <span>{cert.issuer}</span>
                    <span className="text-dark-600">•</span>
                    <Calendar size={14} />
                    <span>{cert.date}</span>
                  </div>

                  <p className="text-dark-400 text-sm mb-4">{cert.description}</p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded text-xs bg-dark-800/50 text-dark-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View Certificate Link */}
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <span className="inline-flex items-center gap-2 text-primary-400 text-sm font-medium">
                      View Certificate
                      <ExternalLink size={14} />
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
              className="glass-card rounded-2xl p-8 mb-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Starbucks Certified Partner</h3>
              <p className="text-dark-400 max-w-2xl mx-auto">
                Completed comprehensive training programs demonstrating excellence in customer service, 
                product knowledge, and operational skills. These certifications reflect my commitment 
                to quality and continuous learning in every role.
              </p>
            </motion.div>

            {/* Starbucks Certificates Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {starbucksCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-4 group hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 flex items-center justify-center group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-colors">
                      <Award className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{cert.title}</h4>
                      <p className="text-xs text-dark-400">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-xs text-dark-400 line-clamp-2">{cert.description}</p>
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
