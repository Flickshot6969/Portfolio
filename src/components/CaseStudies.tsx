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
  Briefcase,
  Target,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'

// Case Studies - Problem → Approach → Outcome → Learning
const caseStudies = [
  {
    id: 1,
    title: 'Scaling Student Governance',
    role: 'General Secretary',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    gradient: 'from-violet-600 to-purple-600',
    
    // THE PROBLEM - Real, specific, measurable
    problem: {
      headline: '5,000 students. Zero unified communication.',
      context: 'Student concerns were scattered across WhatsApp groups, emails, and word-of-mouth. Policy changes took weeks to communicate. Administration had no clear feedback loop.',
      constraint: 'No budget for new tools. Existing infrastructure only.'
    },
    
    // THE APPROACH - Decision-making transparency
    approach: {
      headline: 'Systems over band-aids',
      decisions: [
        'Created tiered communication hierarchy: Class → Department → University',
        'Established weekly office hours (not monthly meetings)',
        'Built feedback templates that reduced noise by 60%'
      ],
      tradeoff: 'Chose depth over breadth — focused on 3 high-impact initiatives rather than 10 shallow ones'
    },
    
    // THE OUTCOME - Measurable results
    outcome: {
      metrics: [
        { value: '5,000+', label: 'Students Reached', icon: Users },
        { value: '3x', label: 'Engagement Rate', icon: TrendingUp },
        { value: '72hrs', label: 'Avg Response Time', icon: Zap }
      ],
      result: 'First student body in 3 years to achieve 100% policy rollout compliance'
    },
    
    // THE LEARNING - What I'd do differently
    learning: {
      insight: 'Started with formal processes. Should have led with relationships first.',
      improvement: "Next time: 2 weeks of listening before any system changes"
    },
    
    skills: ['Leadership', 'Stakeholder Management', 'Process Design', 'Communication Strategy']
  },
  
  {
    id: 2,
    title: 'Jazba Festival: Zero to Execution',
    role: 'Festival Head',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    gradient: 'from-orange-500 to-pink-500',
    
    problem: {
      headline: '50 events. 10 days. First-time team.',
      context: 'University\'s flagship cultural festival. Previous year had 30% event cancellations due to coordination failures. 80% of volunteer team had zero event experience.',
      constraint: 'Fixed budget. Cannot hire external coordinators.'
    },
    
    approach: {
      headline: 'Train the trainers',
      decisions: [
        'Split into 5 pods with dedicated leads (reduced coordination overhead by 70%)',
        'Created event playbooks for each category (reusable templates)',
        'Daily 15-min standups instead of weekly 2-hour meetings'
      ],
      tradeoff: 'Sacrificed "perfect" events for "consistent" events — chose reliability over ambition'
    },
    
    outcome: {
      metrics: [
        { value: '50+', label: 'Events Delivered', icon: Award },
        { value: '0', label: 'Cancellations', icon: Target },
        { value: '3,000+', label: 'Attendees', icon: Users }
      ],
      result: 'First festival in university history with zero event cancellations'
    },
    
    learning: {
      insight: 'Over-documented. Playbooks became 40 pages. Nobody read them.',
      improvement: 'Next time: 1-page checklists. Video walkthroughs for complex tasks.'
    },
    
    skills: ['Event Production', 'Team Building', 'Resource Allocation', 'Crisis Management']
  },
  
  {
    id: 3,
    title: 'Cloud Architecture @ Scale',
    role: 'IBM Cloud Specialist',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-blue-600 to-cyan-500',
    
    problem: {
      headline: 'Legacy infrastructure. Modern requirements.',
      context: 'Academic projects required cloud deployment but existing setups were manual, time-consuming, and error-prone. Average deployment time: 4+ hours.',
      constraint: 'Must use IBM Cloud (certification requirement). Limited compute credits.'
    },
    
    approach: {
      headline: 'Automate the boring stuff',
      decisions: [
        'Built reusable Terraform templates for common architectures',
        'Created CI/CD pipeline that reduced deployment to 1-click',
        'Documented patterns for future students (knowledge transfer)'
      ],
      tradeoff: 'Chose IBM-specific solutions over multi-cloud — deeper expertise over broader coverage'
    },
    
    outcome: {
      metrics: [
        { value: '-60%', label: 'Deploy Time', icon: Zap },
        { value: '99.9%', label: 'Uptime', icon: BarChart3 },
        { value: '10+', label: 'Services Deployed', icon: Cloud }
      ],
      result: 'Templates now used by 3 batches of students. Reduced onboarding time from weeks to days.'
    },
    
    learning: {
      insight: 'Built for my workflow, not others. Documentation assumed too much context.',
      improvement: 'Next time: User testing with actual beginners before "shipping".'
    },
    
    skills: ['IBM Cloud', 'Docker', 'CI/CD', 'Infrastructure as Code', 'Technical Documentation']
  }
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  return (
    <section id="projects" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              Case Studies
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Real Problems.<br />
              <span className="text-primary-400">Real Decisions.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-dark-400">
              Not "what I did" — but <span className="text-dark-200 font-medium">why I did it</span>, 
              what I <span className="text-dark-200 font-medium">traded off</span>, and what I'd 
              <span className="text-dark-200 font-medium"> do differently</span>.
            </p>
          </div>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-24 md:space-y-32">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="relative"
            >
              {/* Case Study Number */}
              <div className="absolute -left-4 md:-left-8 top-0 text-8xl md:text-9xl font-bold text-dark-800/30 select-none">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className="relative grid lg:grid-cols-[1fr,1.5fr] gap-8 md:gap-12">
                {/* Left: Image + Role */}
                <div className="space-y-6">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-70 mix-blend-multiply z-10`} />
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-dark-900/90 backdrop-blur-sm rounded-lg text-sm font-medium text-white">
                        {study.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {study.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-dark-800 text-dark-400 border border-dark-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Case Study Content */}
                <div className="space-y-8">
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {study.title}
                  </h3>
                  
                  {/* Problem */}
                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-3">
                      <AlertTriangle className="w-4 h-4" />
                      THE PROBLEM
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{study.problem.headline}</h4>
                    <p className="text-dark-400 mb-3">{study.problem.context}</p>
                    <p className="text-sm text-dark-500 italic">Constraint: {study.problem.constraint}</p>
                  </div>
                  
                  {/* Approach */}
                  <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
                      <Lightbulb className="w-4 h-4" />
                      THE APPROACH
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{study.approach.headline}</h4>
                    <ul className="space-y-2 mb-4">
                      {study.approach.decisions.map((decision, i) => (
                        <li key={i} className="flex items-start gap-2 text-dark-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                          {decision}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-dark-500 p-3 bg-dark-800/50 rounded-lg">
                      <span className="text-dark-400 font-medium">Trade-off:</span> {study.approach.tradeoff}
                    </p>
                  </div>
                  
                  {/* Outcome */}
                  <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/10">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
                      <TrendingUp className="w-4 h-4" />
                      THE OUTCOME
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {study.outcome.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <metric.icon className="w-5 h-5 text-green-400 mx-auto mb-1" />
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-dark-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-green-300 font-medium">{study.outcome.result}</p>
                  </div>
                  
                  {/* Learning - What I'd Do Differently */}
                  <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-3">
                      <Lightbulb className="w-4 h-4" />
                      WHAT I'D DO DIFFERENTLY
                    </div>
                    <p className="text-dark-300 mb-2">{study.learning.insight}</p>
                    <p className="text-amber-300 text-sm font-medium">→ {study.learning.improvement}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
