'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Quote, 
  CheckCircle2, 
  Award, 
  Users, 
  TrendingUp,
  Building2,
  Star,
  Zap
} from 'lucide-react'

// Real validation - not fluff
const socialProof = {
  testimonials: [
    {
      quote: "Dev doesn't just execute tasks — he anticipates problems before they arise. His ability to coordinate 100+ volunteers while maintaining quality is exceptional.",
      author: "Faculty Advisor",
      role: "Gandhinagar University",
      context: "On Jazba Festival Leadership"
    },
    {
      quote: "In high-pressure situations, Dev remains calm and solution-focused. He transformed our event production process from chaotic to systematic.",
      author: "Senior Committee Member",
      role: "Cultural Committee",
      context: "On Crisis Management"
    },
    {
      quote: "What sets Dev apart is his systems thinking. He doesn't just solve problems — he builds frameworks that prevent them from recurring.",
      author: "Team Lead",
      role: "Event Production Team",
      context: "On Problem-Solving Approach"
    }
  ],
  
  metrics: [
    { value: '5,000+', label: 'Students Represented', subtext: 'As General Secretary' },
    { value: '50+', label: 'Events Delivered', subtext: 'Zero critical failures' },
    { value: '100+', label: 'Volunteers Managed', subtext: 'Cross-functional teams' },
    { value: '4.9/5', label: 'Service Rating', subtext: 'At Starbucks India' }
  ],
  
  trustSignals: [
    { icon: Building2, text: 'Gandhinagar University', subtext: 'General Secretary' },
    { icon: Award, text: 'IBM Cloud Certified', subtext: 'Cloud Architecture' },
    { icon: Star, text: 'Starbucks India', subtext: 'Customer Excellence' },
    { icon: Users, text: 'Jazba Festival', subtext: 'Festival Head' }
  ]
}

export default function AuthoritySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="authority" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
            Don't Take My Word For It
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trust is <span className="text-accent-400">Earned</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-xl mx-auto">
            Results from people who've worked with me, not marketing copy.
          </p>
        </motion.div>

        {/* Metrics Bar - First Scroll Proof */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {socialProof.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="relative group"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-dark-800/40 border border-dark-700 hover:border-primary-500/30 transition-all duration-300 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-dark-300 mb-1">{metric.label}</div>
                <div className="text-xs text-dark-500">{metric.subtext}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials - Second Scroll Depth */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium text-dark-500 uppercase tracking-wider mb-8 text-center"
          >
            What People Say
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {socialProof.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                className="relative group"
              >
                <div className="h-full p-6 md:p-8 rounded-2xl bg-dark-800/30 border border-dark-700 hover:border-accent-500/30 transition-all duration-300">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-accent-500/30 mb-4" />
                  
                  {/* Quote Text */}
                  <p className="text-dark-300 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="pt-4 border-t border-dark-700">
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-dark-400">{testimonial.role}</div>
                    <div className="text-xs text-primary-400 mt-1">{testimonial.context}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Signals - Third Scroll Authority */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-dark-800/50 to-dark-800/30 border border-dark-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Trusted By</h3>
            <p className="text-sm text-dark-500">Organizations where I've delivered impact</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialProof.trustSignals.map((signal, i) => (
              <motion.div
                key={signal.text}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-dark-700/30 transition-colors"
              >
                <signal.icon className="w-8 h-8 text-dark-400 mb-3" />
                <div className="font-medium text-dark-300">{signal.text}</div>
                <div className="text-xs text-dark-500">{signal.subtext}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
