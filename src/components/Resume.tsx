'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  Users,
  Target,
  Download,
  ExternalLink,
  Building,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Cloud,
  Database,
  Terminal,
  Rocket,
  Star,
  CheckCircle2,
  Printer
} from 'lucide-react'
import { downloadResumePDF } from '@/lib/generateResumePDF'

const personalInfo = {
  name: 'Dev Patel',
  title: 'General Secretary | Event Production Head | Marketing Strategist',
  email: 'devpatel170521@gmail.com',
  phone: '+91 XXXXXXXXXX',
  location: 'Ahmedabad, Gujarat, India',
  linkedin: 'linkedin.com/in/devpatel170521',
  github: 'github.com/devpatel170521'
}

const summary = `Results-driven Student Leader and Strategic Executive with 1+ years of progressive leadership experience at Gandhinagar University. Currently serving as General Secretary while concurrently heading Event Production and Campaign & Marketing divisions. Demonstrated expertise in governance, policy execution, large-scale event management, and digital marketing strategy. Former Starbucks Barista with exceptional customer experience and operational excellence track record. Pursuing B.Tech in Computer Science at Gandhinagar Institute of Technology (2023-2027). Recognized for decisive leadership, data-driven decision-making, cross-functional team coordination, and delivering high-impact outcomes with accountability and strategic intent. Proven ability to enhance institutional presence, drive student engagement, and execute initiatives that consistently exceed stakeholder expectations.`

const experiences = [
  {
    title: 'General Secretary',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Aug 2025 - Present',
    type: 'Full-time',
    achievements: [
      'Spearheading student governance as the primary liaison between 5000+ students and university administration',
      'Orchestrating university-wide academic, cultural, and professional initiatives with strategic oversight',
      'Driving policy execution and institutional compliance across all student organizations and councils',
      'Delivering structured, high-impact outcomes through decisive decision-making and disciplined execution',
      'Enhancing student engagement and campus operations through innovative governance frameworks'
    ]
  },
  {
    title: 'Head of Event Production',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Aug 2025 - Present',
    type: 'Full-time',
    achievements: [
      'Leading end-to-end execution of dynamic campus events with meticulous logistics management',
      'Managing cross-functional volunteer teams and multi-stakeholder collaboration for event success',
      'Overseeing budget planning, resource allocation, and vendor coordination for large-scale productions',
      'Implementing proactive problem-solving strategies in fast-paced, high-pressure environments',
      'Creating meaningful and engaging experiences that drive campus community building'
    ]
  },
  {
    title: 'Head of Campaign & Marketing',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Aug 2025 - Present',
    type: 'Full-time',
    achievements: [
      'Architecting comprehensive marketing campaigns from strategy and positioning to execution and analytics',
      'Driving brand visibility and audience engagement across digital and traditional channels',
      'Leveraging data-driven insights to optimize campaign performance and maximize reach',
      'Coordinating with creative teams to deliver high-engagement content under tight deadlines',
      'Strengthening institutional presence through innovative cross-channel promotion strategies'
    ]
  },
  {
    title: 'Jazba Head (Annual Cultural Fest)',
    company: 'Gandhinagar University',
    location: 'Ahmedabad, Gujarat',
    period: 'Feb 2025 - Oct 2025',
    type: 'Leadership Role',
    achievements: [
      'Led the flagship annual cultural festival with comprehensive event planning and production oversight',
      'Managed talent acquisition, performance management, and artist coordination for 50+ events',
      'Executed strategic planning initiatives resulting in record-breaking student participation',
      'Coordinated team of 100+ volunteers across multiple event verticals and committees',
      'Delivered exceptional event experiences through meticulous time management and leadership'
    ]
  },
  {
    title: 'Cultural Secretary',
    company: 'Gandhinagar University Student Council',
    location: 'Ahmedabad, Gujarat',
    period: 'Sep 2024 - Oct 2025',
    type: 'Leadership Role',
    achievements: [
      'Directed planning, coordination, and execution of all university-level cultural events',
      'Collaborated with diverse student teams to enhance campus engagement through creative experiences',
      'Strengthened leadership, event production, and strategic problem-solving capabilities',
      'Managed logistics, budgets, and vendor relationships for 20+ annual cultural programs',
      'Fostered talent development and team leadership skills across student organizations'
    ]
  },
  {
    title: 'Barista',
    company: 'Starbucks India',
    location: 'Ahmedabad, Gujarat',
    period: 'Feb 2025 - Sep 2025',
    type: 'Part-time',
    achievements: [
      'Delivered exceptional customer experiences in high-volume, fast-paced retail environment',
      'Mastered espresso crafting, beverage preparation, and food safety compliance standards',
      'Developed advanced interpersonal, multitasking, and real-time problem-solving capabilities',
      'Built expertise in CRM, customer engagement, and sales operations excellence',
      'Recognized for outstanding service quality, team collaboration, and professional growth mindset'
    ]
  }
]

const education = [
  {
    degree: 'Bachelor of Technology (B.Tech) - Computer Science & Engineering',
    institution: 'Gandhinagar Institute of Technology (GTU Affiliated)',
    location: 'Gandhinagar, Gujarat',
    period: '2023 - 2027',
    achievements: [
      'Concurrent leadership roles: General Secretary, Event Production Head, Campaign & Marketing Head',
      'Core coursework: Data Structures, Algorithms, Web Development, DBMS, Cloud Computing',
      'Founding member and leader of multiple technical and cultural student organizations',
      'Participated in hackathons, coding competitions, and tech workshops'
    ]
  },
  {
    degree: 'Higher Secondary Education (HSC) - Science Stream',
    institution: 'Maharaja Agrasen Vidyalaya (CBSE Board)',
    location: 'Ahmedabad, Gujarat',
    period: '2021 - 2023',
    achievements: [
      'Science stream with focus on Physics, Chemistry, Mathematics, and Computer Science',
      'Developed strong analytical thinking and problem-solving foundation',
      'Active participant in school events, science exhibitions, and inter-school competitions'
    ]
  },
  {
    degree: 'Secondary Education (SSC) - All Subjects',
    institution: 'Maharaja Agrasen Vidyalaya (CBSE Board)',
    location: 'Ahmedabad, Gujarat',
    period: '2013 - 2021',
    achievements: [
      'Built strong academic foundation across Mathematics, Science, English, and Social Studies',
      'Developed foundational communication, management, and organizational competencies',
      'Active participant in extracurricular activities and house events',
      'Cultivated early leadership skills through class representative roles'
    ]
  }
]

const skills = {
  technical: [
    { category: 'Frontend Development', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
    { category: 'Backend Development', items: ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs', 'API Integration'] },
    { category: 'Database & Storage', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Cloud Storage'] },
    { category: 'Cloud & DevOps', items: ['AWS Solutions Architecture', 'Cloud Computing (IBM)', 'Git', 'GitHub', 'Vercel', 'Render', 'CI/CD'] },
    { category: 'Digital Marketing', items: ['Social Media Marketing', 'Campaign Management', 'Content Strategy', 'SEO', 'Analytics', 'Brand Marketing'] },
    { category: 'Tools & Platforms', items: ['VS Code', 'Figma', 'Postman', 'Canva', 'HubSpot', 'Google Analytics'] }
  ],
  soft: ['Strategic Leadership', 'Team Management', 'Event Production', 'Public Speaking', 'Stakeholder Management', 'Customer Experience', 'Cross-functional Collaboration', 'Decision Making', 'Problem Solving', 'Time Management', 'Budget Management', 'Talent Management']
}

const certifications = [
  { name: 'Cybersecurity Fundamentals', issuer: 'IBM SkillsBuild', year: '2026', credentialUrl: 'https://www.credly.com/badges/24a99885-68ed-404c-bfcc-63c042974559/public_url', image: '/media/Certifications/Technical and soft skill certificates/IBM Cyber security.pdf', category: 'technical' },
  { name: 'Cloud Computing Fundamentals', issuer: 'IBM', year: '2025', credentialId: 'IBMDesign20251216', image: '/media/Certifications/Technical and soft skill certificates/cloud computing fundamentals ibm.pdf', category: 'technical' },
  { name: 'Digital Marketing Certification', issuer: 'HubSpot Academy', year: '2025', credentialId: '8268d9048f3b4ff5a4705726ea0376bd', image: '/media/Certifications/Technical and soft skill certificates/digital marketing hubspot.png', category: 'technical' },
  { name: 'AWS Solutions Architecture Job Simulation', issuer: 'Forage', year: '2025', credentialId: 'ftTNijFvh63WZw3CY', image: '/media/Certifications/Technical and soft skill certificates/AWS.pdf', category: 'technical' },
  { name: 'Deloitte Cyber Security Job Simulation', issuer: 'Forage (Deloitte Australia)', year: '2025', credentialId: 'ZtiKmGKFkQPPuQXnp', image: '/media/Certifications/Technical and soft skill certificates/cyber certification.pdf', category: 'technical' },
  { name: 'Deloitte Technology Job Simulation', issuer: 'Forage (Deloitte Australia)', year: '2025', credentialId: 'B9kbwjNiMAHWr2rjn', image: '/media/Certifications/Technical and soft skill certificates/Tech job simulation.pdf', category: 'technical' },
  { name: 'Food Safety & Handling Certification', issuer: 'Starbucks India', year: '2025', image: '/media/Certifications/Starbucks certificates/Food Safety.pdf', category: 'starbucks' },
  { name: 'Espresso & Latte Art Certification', issuer: 'Starbucks India', year: '2025', image: '/media/Certifications/Starbucks certificates/Latte Art.pdf', category: 'starbucks' },
  { name: 'Customer Connection Excellence', issuer: 'Starbucks Training', year: '2025', image: '/media/Certifications/Starbucks certificates/Customer connection.pdf', category: 'starbucks' },
  { name: 'Frappuccino Master Certification', issuer: 'Starbucks India', year: '2025', image: '/media/Certifications/Starbucks certificates/Frappucino certification.pdf', category: 'starbucks' },
  { name: 'Core Operations & Policy Completion', issuer: 'Starbucks India', year: '2025', image: '/media/Certifications/Starbucks certificates/Policy course completion starbucks.pdf', category: 'starbucks' }
]

const achievements = [
  'Elected General Secretary of Gandhinagar University — representing 5000+ students',
  'Concurrently heading Event Production, Campaign & Marketing divisions',
  'Led Jazba (Annual Cultural Fest) with 50+ events and 100+ volunteer team',
  'Served as Cultural Secretary for 1+ year, organizing 20+ cultural programs',
  'Earned 6+ professional certifications from IBM, HubSpot, AWS, and Deloitte',
  'Completed comprehensive Starbucks barista training including Food Safety, Espresso, and Customer Excellence',
  'Built full-stack portfolio website using Next.js, React, and modern web technologies',
  'Recognized for exceptional customer service and operational excellence at Starbucks India'
]

export default function Resume() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px',
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="resume" className="section-padding relative overflow-hidden bg-dark-950/50">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-primary-400 text-sm font-medium mb-4">
            Professional Resume
          </span>
          <h2 className="heading-lg mb-4">
            My <span className="gradient-text">Career Journey</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto mb-6">
            A comprehensive overview of my professional experience, skills, and achievements
          </p>
          
          {/* Download Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={downloadResumePDF}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:from-primary-500 hover:to-accent-500 transition-all shadow-lg shadow-primary-500/25 md:electric-border"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Download Resume with Certificates (PDF)
            </motion.button>
            
            <motion.button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-500/50 text-primary-400 font-semibold hover:bg-primary-500/10 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Printer size={18} />
              Print This Page
            </motion.button>
          </div>
        </motion.div>
        {/* Resume Content */}
        <motion.div
          variants={containerVariants}
          initial="visible"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Header Card - Personal Info */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8 border border-primary-500/20"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary-500/30">
                  <img
                    src="/media/Images/2.JPG"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {personalInfo.name}
                </h1>
                <p className="text-lg text-primary-400 font-medium mb-4">
                  {personalInfo.title}
                </p>
                
                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm text-dark-300">
                    <Mail size={14} className="text-primary-400" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-300">
                    <MapPin size={14} className="text-primary-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-300">
                    <Linkedin size={14} className="text-primary-400" />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-300">
                    <Github size={14} className="text-primary-400" />
                    <span>{personalInfo.github}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                <Target size={18} className="text-primary-400" />
                Professional Summary
              </h3>
              <p className="text-dark-300 leading-relaxed">{summary}</p>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience Section */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 md:p-8">
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                    <Briefcase size={20} className="text-white" />
                  </div>
                  Work Experience
                </h3>

                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative pl-8 pb-6 border-l-2 border-primary-500/30 last:pb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/50" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{exp.title}</h4>
                          <div className="flex items-center gap-2 text-dark-400">
                            <Building size={14} />
                            <span>{exp.company}</span>
                            <span className="text-dark-600">•</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            {exp.period}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-500/10 text-accent-400 border border-accent-500/20">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                            <CheckCircle2 size={14} className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education Section */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 md:p-8">
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  Education
                </h3>

                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-cyan-500/30">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                        <div className="flex items-center gap-2 text-dark-400">
                          <BookOpen size={14} />
                          <span>{edu.institution}</span>
                          <span className="text-dark-600">•</span>
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {edu.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-dark-300">
                          <Star size={14} className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Technical Skills */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Code2 size={16} className="text-white" />
                  </div>
                  Technical Skills
                </h3>

                <div className="space-y-4">
                  {skills.technical.map((skillGroup, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                        {skillGroup.category === 'Frontend' && <Terminal size={14} />}
                        {skillGroup.category === 'Backend' && <Database size={14} />}
                        {skillGroup.category === 'Database' && <Database size={14} />}
                        {skillGroup.category === 'Cloud & DevOps' && <Cloud size={14} />}
                        {skillGroup.category === 'Tools' && <Lightbulb size={14} />}
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-md bg-dark-800 text-dark-200 border border-dark-700 hover:border-primary-500/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Soft Skills */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  Soft Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                  Certifications
                </h3>

                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="group p-3 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer"
                      onClick={() => window.open(cert.image, '_blank')}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">{cert.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-dark-400">
                            <span>{cert.issuer}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-xs">
                            {cert.year}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink size={10} />
                            View
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Achievements */}
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center">
                    <TrendingUp size={16} className="text-white" />
                  </div>
                  Key Achievements
                </h3>

                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-dark-300">
                      <Rocket size={14} className="text-rose-400 mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-dark-500 text-sm">
              This resume is a summary. For detailed information, please download the full PDF version.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
