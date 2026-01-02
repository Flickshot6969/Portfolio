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
    institution: 'Gandhinagar Institute of Technology',
    location: 'Gandhinagar, Gujarat',
    period: '2023 - 2027',
    achievements: [
      'Concurrent leadership roles: General Secretary, Event Production Head, Campaign & Marketing Head',
      'Spearheading student governance, cultural initiatives, and institutional marketing strategies',
      'Core competencies: Data Structures, Algorithms, Web Development, DBMS, Cloud Computing',
      'Founding member and leader of multiple technical and cultural student organizations'
    ]
  },
  {
    degree: 'High School Diploma',
    institution: 'Maharaja Agrasen Vidyalaya',
    location: 'India',
    period: '2013 - 2023',
    achievements: [
      'Developed foundational communication and management competencies',
      'Active participant in extracurricular and leadership activities',
      'Built strong academic foundation across core subjects',
      'Cultivated early leadership and organizational skills'
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
              onClick={() => {
                // Create a printable version of the resume with certificates
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                  printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Dev Patel - Resume & Certifications</title>
                      <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        @page { size: A4; margin: 0.5in; }
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; background: #fff; }
                        
                        /* Print Instructions Banner - Hidden when printing */
                        .print-instructions { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 15px 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; }
                        .print-instructions h3 { margin-bottom: 5px; }
                        .print-instructions p { font-size: 14px; opacity: 0.9; }
                        @media print { .print-instructions { display: none !important; } }
                        
                        /* Header Styling */
                        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #6366f1; background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%); padding: 30px; border-radius: 12px; }
                        .header h1 { font-size: 36px; color: #1a1a2e; margin-bottom: 8px; letter-spacing: 2px; text-transform: uppercase; }
                        .header p { color: #6366f1; font-size: 16px; font-weight: 600; letter-spacing: 1px; }
                        .contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; font-size: 13px; color: #4a4a6a; }
                        .contact-item { display: flex; align-items: center; gap: 5px; }
                        
                        /* Section Styling */
                        .section { margin: 25px 0; page-break-inside: avoid; }
                        .section h2 { font-size: 18px; color: #6366f1; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 10px; }
                        .section h2::before { content: ''; width: 4px; height: 20px; background: linear-gradient(135deg, #6366f1, #d946ef); border-radius: 2px; }
                        
                        /* Summary Box */
                        .summary { background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #6366f1; font-size: 14px; box-shadow: 0 2px 10px rgba(99, 102, 241, 0.1); }
                        
                        /* Experience Items */
                        .exp-item { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #e0e0e0; }
                        .exp-item:last-child { border-bottom: none; }
                        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
                        .exp-title { font-weight: 700; font-size: 16px; color: #1a1a2e; }
                        .exp-company { color: #6366f1; font-weight: 600; font-size: 14px; }
                        .exp-period { color: #6366f1; font-size: 12px; background: linear-gradient(135deg, #f0f0ff 0%, #fff 100%); padding: 4px 12px; border-radius: 20px; font-weight: 500; border: 1px solid #e0e0ff; }
                        .exp-list { list-style: none; padding-left: 0; margin-top: 10px; }
                        .exp-list li { padding: 4px 0 4px 20px; position: relative; font-size: 13px; color: #4a4a6a; }
                        .exp-list li::before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
                        
                        /* Skills Grid */
                        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
                        .skill-category { background: #f8f9ff; padding: 15px; border-radius: 10px; }
                        .skill-category h4 { font-size: 13px; color: #6366f1; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
                        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
                        .skill-tag { background: linear-gradient(135deg, #fff 0%, #f0f0ff 100%); color: #4a4a6a; padding: 5px 12px; border-radius: 20px; font-size: 11px; border: 1px solid #e0e0ff; font-weight: 500; }
                        
                        /* Achievements */
                        .achievements { columns: 2; column-gap: 30px; }
                        .achievements li { padding: 6px 0 6px 20px; font-size: 13px; break-inside: avoid; position: relative; color: #4a4a6a; }
                        .achievements li::before { content: "★"; position: absolute; left: 0; color: #f59e0b; }
                        
                        /* Certifications Section - Page 2 */
                        .cert-page { page-break-before: always; padding-top: 20px; }
                        .cert-header { text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%); border-radius: 15px; color: white; }
                        .cert-header h2 { font-size: 28px; margin-bottom: 10px; letter-spacing: 2px; text-transform: uppercase; border: none; color: white; }
                        .cert-header h2::before { display: none; }
                        .cert-header p { font-size: 14px; opacity: 0.9; }
                        
                        /* Certificate Categories */
                        .cert-category { margin-bottom: 30px; }
                        .cert-category-title { font-size: 16px; color: #6366f1; margin-bottom: 15px; padding: 10px 15px; background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%); border-radius: 8px; border-left: 4px solid #6366f1; }
                        
                        /* Certificate Grid */
                        .cert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                        .cert-card { background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%); border-radius: 12px; padding: 20px; border: 1px solid #e0e0ff; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.08); page-break-inside: avoid; }
                        .cert-card h4 { font-size: 14px; color: #1a1a2e; margin-bottom: 8px; font-weight: 600; }
                        .cert-card .issuer { font-size: 12px; color: #6366f1; font-weight: 500; margin-bottom: 5px; }
                        .cert-card .year { font-size: 11px; color: #888; background: #f0f0f0; padding: 3px 10px; border-radius: 15px; display: inline-block; }
                        .cert-card .credential { font-size: 10px; color: #888; margin-top: 8px; font-family: monospace; background: #f5f5f5; padding: 5px 8px; border-radius: 4px; word-break: break-all; }
                        
                        /* Starbucks Special Styling */
                        .cert-starbucks { border-left: 4px solid #00704A; }
                        .cert-starbucks .issuer { color: #00704A; }
                        
                        /* Technical Special Styling */
                        .cert-technical { border-left: 4px solid #6366f1; }
                        
                        /* Footer */
                        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 11px; }
                        
                        @media print { 
                          body { padding: 20px; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } 
                          .cert-header { -webkit-print-color-adjust: exact !important; }
                        }
                      </style>
                    </head>
                    <body>
                      <!-- Print Instructions -->
                      <div class="print-instructions">
                        <h3>📄 To Save as PDF</h3>
                        <p>In the print dialog: Select "Save as PDF" or "Microsoft Print to PDF" as your printer, then click Save</p>
                      </div>
                      
                      <!-- PAGE 1: RESUME -->
                      <div class="header">
                        <h1>DEV PATEL</h1>
                        <p>General Secretary | Event Production Head | Marketing Strategist</p>
                        <div class="contact">
                          <span class="contact-item">📧 devpatel170521@gmail.com</span>
                          <span class="contact-item">📍 Ahmedabad, Gujarat, India</span>
                          <span class="contact-item">🔗 linkedin.com/in/devpatel170521</span>
                          <span class="contact-item">💻 github.com/devpatel170521</span>
                        </div>
                      </div>

                      <div class="section">
                        <h2>Professional Summary</h2>
                        <div class="summary">
                          Results-driven Student Leader and Strategic Executive with 1+ years of progressive leadership experience at Gandhinagar University. Currently serving as General Secretary while concurrently heading Event Production and Campaign & Marketing divisions. Demonstrated expertise in governance, policy execution, large-scale event management, and digital marketing strategy. Former Starbucks Barista with exceptional customer experience track record. Pursuing B.Tech in Computer Science at Gandhinagar Institute of Technology (2023-2027). Recognized for decisive leadership, data-driven decision-making, and delivering high-impact outcomes with strategic intent.
                        </div>
                      </div>

                      <div class="section">
                        <h2>Professional Experience</h2>
                        <div class="exp-item">
                          <div class="exp-header">
                            <div>
                              <div class="exp-title">General Secretary</div>
                              <div class="exp-company">Gandhinagar University • Ahmedabad, Gujarat</div>
                            </div>
                            <span class="exp-period">Aug 2025 - Present</span>
                          </div>
                          <ul class="exp-list">
                            <li>Spearheading student governance as primary liaison between 5000+ students and administration</li>
                            <li>Orchestrating university-wide academic, cultural, and professional initiatives</li>
                            <li>Driving policy execution and institutional compliance across all organizations</li>
                          </ul>
                        </div>
                        <div class="exp-item">
                          <div class="exp-header">
                            <div>
                              <div class="exp-title">Head of Event Production & Campaign Marketing</div>
                              <div class="exp-company">Gandhinagar University • Ahmedabad, Gujarat</div>
                            </div>
                            <span class="exp-period">Aug 2025 - Present</span>
                          </div>
                          <ul class="exp-list">
                            <li>Leading end-to-end execution of dynamic campus events with meticulous logistics</li>
                            <li>Architecting comprehensive marketing campaigns from strategy to analytics</li>
                            <li>Managing cross-functional volunteer teams and multi-stakeholder collaboration</li>
                          </ul>
                        </div>
                        <div class="exp-item">
                          <div class="exp-header">
                            <div>
                              <div class="exp-title">Jazba Head & Cultural Secretary</div>
                              <div class="exp-company">Gandhinagar University • Ahmedabad, Gujarat</div>
                            </div>
                            <span class="exp-period">Sep 2024 - Oct 2025</span>
                          </div>
                          <ul class="exp-list">
                            <li>Led flagship annual cultural festival with 50+ events and 100+ volunteer team</li>
                            <li>Directed planning and execution of all university-level cultural events</li>
                            <li>Managed logistics, budgets, and vendor relationships for 20+ annual programs</li>
                          </ul>
                        </div>
                        <div class="exp-item">
                          <div class="exp-header">
                            <div>
                              <div class="exp-title">Barista</div>
                              <div class="exp-company">Starbucks India • Ahmedabad, Gujarat</div>
                            </div>
                            <span class="exp-period">Feb 2025 - Sep 2025</span>
                          </div>
                          <ul class="exp-list">
                            <li>Delivered exceptional customer experiences in high-volume retail environment</li>
                            <li>Mastered espresso crafting, beverage preparation, and food safety compliance</li>
                            <li>Built expertise in CRM, customer engagement, and sales operations excellence</li>
                          </ul>
                        </div>
                      </div>

                      <div class="section">
                        <h2>Education</h2>
                        <div class="exp-item">
                          <div class="exp-header">
                            <div>
                              <div class="exp-title">B.Tech - Computer Science & Engineering</div>
                              <div class="exp-company">Gandhinagar Institute of Technology • Gujarat</div>
                            </div>
                            <span class="exp-period">2023 - 2027</span>
                          </div>
                          <ul class="exp-list">
                            <li>General Secretary, Event Production Head, Campaign & Marketing Head</li>
                            <li>Core: Data Structures, Algorithms, Web Development, Cloud Computing</li>
                          </ul>
                        </div>
                      </div>

                      <div class="section">
                        <h2>Technical Skills</h2>
                        <div class="skills-grid">
                          <div class="skill-category">
                            <h4>Development</h4>
                            <div class="skill-tags">
                              <span class="skill-tag">React.js</span>
                              <span class="skill-tag">Next.js</span>
                              <span class="skill-tag">Node.js</span>
                              <span class="skill-tag">Python</span>
                              <span class="skill-tag">TypeScript</span>
                              <span class="skill-tag">MongoDB</span>
                            </div>
                          </div>
                          <div class="skill-category">
                            <h4>Cloud & Marketing</h4>
                            <div class="skill-tags">
                              <span class="skill-tag">AWS (Certified)</span>
                              <span class="skill-tag">IBM Cloud</span>
                              <span class="skill-tag">Digital Marketing</span>
                              <span class="skill-tag">SEO</span>
                            </div>
                          </div>
                          <div class="skill-category">
                            <h4>Leadership</h4>
                            <div class="skill-tags">
                              <span class="skill-tag">Team Management</span>
                              <span class="skill-tag">Event Production</span>
                              <span class="skill-tag">Strategic Planning</span>
                              <span class="skill-tag">Stakeholder Mgmt</span>
                            </div>
                          </div>
                          <div class="skill-category">
                            <h4>Tools & Platforms</h4>
                            <div class="skill-tags">
                              <span class="skill-tag">Git/GitHub</span>
                              <span class="skill-tag">VS Code</span>
                              <span class="skill-tag">Figma</span>
                              <span class="skill-tag">HubSpot</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="section">
                        <h2>Key Achievements</h2>
                        <ul class="exp-list achievements">
                          <li>Elected General Secretary — representing 5000+ students university-wide</li>
                          <li>Led Jazba Annual Fest with 50+ events and 100+ volunteer coordination</li>
                          <li>Earned 10+ professional certifications from IBM, HubSpot, AWS, Deloitte, Starbucks</li>
                          <li>Built full-stack portfolio using Next.js, React, and modern web technologies</li>
                          <li>Recognized for exceptional customer service at Starbucks India</li>
                        </ul>
                      </div>

                      <!-- PAGE 2: CERTIFICATIONS -->
                      <div class="cert-page">
                        <div class="cert-header">
                          <h2>🏆 Professional Certifications</h2>
                          <p>Verified credentials demonstrating expertise across technology, marketing, and customer service domains</p>
                        </div>

                        <div class="cert-category">
                          <div class="cert-category-title">💻 Technical & Professional Certifications</div>
                          <div class="cert-grid">
                            <div class="cert-card cert-technical">
                              <h4>Cloud Computing Fundamentals</h4>
                              <div class="issuer">IBM</div>
                              <span class="year">2025</span>
                              <div class="credential">ID: IBMDesign20251216</div>
                            </div>
                            <div class="cert-card cert-technical">
                              <h4>Digital Marketing Certification</h4>
                              <div class="issuer">HubSpot Academy</div>
                              <span class="year">2025</span>
                              <div class="credential">ID: 8268d9048f3b4ff5a4705726ea0376bd</div>
                            </div>
                            <div class="cert-card cert-technical">
                              <h4>AWS Solutions Architecture Job Simulation</h4>
                              <div class="issuer">Forage</div>
                              <span class="year">2025</span>
                              <div class="credential">ID: ftTNijFvh63WZw3CY</div>
                            </div>
                            <div class="cert-card cert-technical">
                              <h4>Deloitte Cyber Security Job Simulation</h4>
                              <div class="issuer">Forage (Deloitte Australia)</div>
                              <span class="year">2025</span>
                              <div class="credential">ID: ZtiKmGKFkQPPuQXnp</div>
                            </div>
                            <div class="cert-card cert-technical">
                              <h4>Deloitte Technology Job Simulation</h4>
                              <div class="issuer">Forage (Deloitte Australia)</div>
                              <span class="year">2025</span>
                              <div class="credential">ID: B9kbwjNiMAHWr2rjn</div>
                            </div>
                          </div>
                        </div>

                        <div class="cert-category">
                          <div class="cert-category-title">☕ Starbucks Professional Training Certifications</div>
                          <div class="cert-grid">
                            <div class="cert-card cert-starbucks">
                              <h4>Food Safety & Handling Certification</h4>
                              <div class="issuer">Starbucks India</div>
                              <span class="year">2025</span>
                            </div>
                            <div class="cert-card cert-starbucks">
                              <h4>Espresso & Latte Art Certification</h4>
                              <div class="issuer">Starbucks India</div>
                              <span class="year">2025</span>
                            </div>
                            <div class="cert-card cert-starbucks">
                              <h4>Customer Connection Excellence</h4>
                              <div class="issuer">Starbucks Training</div>
                              <span class="year">2025</span>
                            </div>
                            <div class="cert-card cert-starbucks">
                              <h4>Frappuccino Master Certification</h4>
                              <div class="issuer">Starbucks India</div>
                              <span class="year">2025</span>
                            </div>
                            <div class="cert-card cert-starbucks">
                              <h4>Core Operations & Policy Completion</h4>
                              <div class="issuer">Starbucks India</div>
                              <span class="year">2025</span>
                            </div>
                          </div>
                        </div>

                        <div class="footer">
                          <p>📄 All certifications are verified and available for review upon request</p>
                          <p style="margin-top: 5px;">Generated from Dev Patel's Portfolio • ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                    </body>
                    </html>
                  `);
                  printWindow.document.close();
                  
                  // Wait for content to load, then trigger print
                  printWindow.onload = () => {
                    setTimeout(() => {
                      printWindow.focus();
                      printWindow.print();
                    }, 300);
                  };
                  
                  // Fallback if onload doesn't fire
                  setTimeout(() => {
                    printWindow.focus();
                    printWindow.print();
                  }, 1000);
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:from-primary-500 hover:to-accent-500 transition-all shadow-lg shadow-primary-500/25 electric-border"
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
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
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
