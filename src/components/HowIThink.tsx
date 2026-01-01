'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Layers, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

const thinkingProcess = [
  {
    phase: 'Understand',
    title: 'Context Before Code',
    description: 'I start by asking "Why?" — understanding the real problem, not just the symptoms. Whether it\'s a technical challenge or a people problem, context shapes every decision.',
    icon: Brain,
    color: 'from-violet-500 to-purple-500',
    examples: [
      'Stakeholder interviews before solutions',
      'User journey mapping for any project',
      'Root cause analysis, not band-aids'
    ]
  },
  {
    phase: 'Deconstruct',
    title: 'Break It Down',
    description: 'Complex problems become manageable when decomposed. I identify dependencies, constraints, and critical paths — then prioritize ruthlessly.',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    examples: [
      'First principles thinking',
      'Modular architecture mindset',
      'Clear ownership boundaries'
    ]
  },
  {
    phase: 'Execute',
    title: 'Bias for Action',
    description: 'Analysis paralysis kills projects. I iterate fast, gather feedback, and course-correct. Done is better than perfect — but quality is non-negotiable.',
    icon: Target,
    color: 'from-orange-500 to-pink-500',
    examples: [
      'MVP-first approach',
      'Weekly milestones, daily progress',
      '80/20 rule for impact'
    ]
  },
  {
    phase: 'Reflect',
    title: 'Learn & Scale',
    description: 'Every project is a learning opportunity. I document what worked, what didn\'t, and build systems to prevent repeating mistakes.',
    icon: Lightbulb,
    color: 'from-green-500 to-emerald-500',
    examples: [
      'Post-mortems without blame',
      'Reusable templates & frameworks',
      'Knowledge sharing culture'
    ]
  }
]

const differentiators = [
  { label: 'Not just a coder', value: 'A Problem Solver', description: 'I see technology as a tool, not the goal' },
  { label: 'Not just individual work', value: 'Team Multiplier', description: 'I make everyone around me more effective' },
  { label: 'Not just following specs', value: 'Strategic Thinker', description: 'I question requirements to find better solutions' }
]

export default function HowIThink() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-i-think" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            What Sets Me Apart
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block">How I</span>
            <span className="bg-gradient-to-r from-accent-400 via-primary-400 to-cyan-400 bg-clip-text text-transparent">
              Approach Problems
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto">
            Skills can be taught. Frameworks change.
            <span className="text-accent-400 font-medium"> My thinking process is my competitive edge.</span>
          </p>
        </motion.div>

        {/* Thinking Process - Timeline */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="grid gap-8 md:gap-6">
            {thinkingProcess.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group"
              >
                <div className={`relative grid md:grid-cols-[1fr,3fr] gap-6 p-6 md:p-8 rounded-2xl bg-dark-800/40 border border-dark-700 hover:border-primary-500/30 transition-all duration-300 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Phase & Icon */}
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 border border-white/10`}>
                      <step.icon className="w-8 h-8 text-white" />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="md:mt-2">
                      <span className={`text-sm font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                        Phase {index + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <p className="text-dark-300 text-lg leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                      {step.examples.map((example, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700/50 text-dark-300 text-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < thinkingProcess.length - 1 && (
                    <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2">
                      <ArrowRight className="w-5 h-5 text-dark-600 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Differentiators - The "Why Me" Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-dark-800/60 to-dark-800/30 border border-dark-700"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Not Just <span className="line-through text-dark-500">What</span> I Do — 
            <span className="text-primary-400"> Why It Matters</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="relative p-6 rounded-xl bg-dark-900/50 border border-dark-700 hover:border-primary-500/30 transition-colors text-center group"
              >
                <p className="text-dark-500 text-sm mb-2 line-through">{diff.label}</p>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {diff.value}
                </h4>
                <p className="text-dark-400 text-sm">{diff.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote / Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl text-dark-300 italic max-w-3xl mx-auto">
            "The best solutions come from understanding people as deeply as you understand systems. 
            <span className="text-primary-400 not-italic font-medium"> I build bridges between both.</span>"
          </blockquote>
          <p className="mt-4 text-dark-500 text-sm">— My approach to every project</p>
        </motion.div>
      </div>
    </section>
  )
}
