'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Target, 
  Zap, 
  Cloud, 
  Code2,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'

// Skills with PROOF - not just names
const provenSkills = [
  {
    category: 'Leadership',
    tagline: 'Not just managing — multiplying',
    skills: [
      {
        name: 'Team Coordination',
        proof: 'Led 100+ volunteers across 5 teams for Jazba Festival',
        outcome: 'Zero event cancellations',
        icon: Users
      },
      {
        name: 'Strategic Planning',
        proof: 'Restructured student governance communication',
        outcome: '3x engagement increase',
        icon: Target
      },
      {
        name: 'Crisis Management',
        proof: 'Handled 15+ last-minute event changes',
        outcome: 'All resolved without attendee impact',
        icon: Zap
      }
    ]
  },
  {
    category: 'Technical',
    tagline: 'Tools that solve, not impress',
    skills: [
      {
        name: 'Cloud Architecture',
        proof: 'IBM Cloud certified, deployed 10+ services',
        outcome: '99.9% uptime achieved',
        icon: Cloud
      },
      {
        name: 'Full Stack Development',
        proof: 'Built portfolio with Next.js, deployed on Vercel',
        outcome: 'Sub-2s load times',
        icon: Code2
      },
      {
        name: 'Process Automation',
        proof: 'Created reusable templates for event planning',
        outcome: '60% reduction in setup time',
        icon: TrendingUp
      }
    ]
  }
]

// What I DON'T do (honesty builds trust)
const notMyStrengths = [
  'Graphic design (I collaborate with designers)',
  'Backend-heavy systems (learning, not expert)',
  'Mobile development (web-first focus)'
]

export default function SkillsProof() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Capabilities
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills with{' '}
            <span className="text-cyan-400">receipts</span>
          </h2>
          
          <p className="text-lg text-dark-400">
            Anyone can list skills. Here's where I've actually{' '}
            <span className="text-dark-200 font-medium">applied them</span> and what{' '}
            <span className="text-dark-200 font-medium">happened</span>.
          </p>
        </motion.div>

        {/* Skills Grid - PROOF FIRST */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {provenSkills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.15 }}
              className="p-8 rounded-2xl bg-dark-800/30 border border-dark-700"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.category}</h3>
                <p className="text-dark-500 text-sm">{category.tagline}</p>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + catIndex * 0.1 + skillIndex * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-dark-700/50 group-hover:bg-primary-500/10 transition-colors">
                        <skill.icon className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{skill.name}</h4>
                        <p className="text-sm text-dark-400 mb-2">{skill.proof}</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-xs font-medium text-green-400">{skill.outcome}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest Disclaimer - TRUST SIGNAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-xl bg-dark-800/20 border border-dark-800"
        >
          <h4 className="font-medium text-dark-400 mb-4">
            What I&apos;m still building (honesty over hype):
          </h4>
          <div className="flex flex-wrap gap-3">
            {notMyStrengths.map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg bg-dark-800/50 text-dark-500 text-sm border border-dark-700"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
