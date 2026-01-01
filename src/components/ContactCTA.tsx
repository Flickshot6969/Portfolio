'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ArrowRight,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactCTA() {
  const formRef = useRef<HTMLFormElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_id',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id',
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key'
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left: CTA Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
                  Next Step
                </span>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Let's solve a{' '}
                  <span className="text-primary-400">real problem</span>{' '}
                  together
                </h2>
                
                <p className="text-lg text-dark-400 leading-relaxed">
                  Not looking for "just any opportunity." I'm interested in challenges where 
                  <span className="text-dark-300 font-medium"> execution matters</span>, 
                  teams need leadership, and{' '}
                  <span className="text-dark-300 font-medium">outcomes are measured</span>.
                </p>
              </div>

              {/* What I'm Looking For */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-dark-500 uppercase tracking-wider">What I bring</h3>
                <ul className="space-y-3">
                  {[
                    'Systems thinking over quick fixes',
                    'Ownership mentality, not task completion',
                    'Bias for action with strategic clarity',
                    'Team multiplier, not individual contributor'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/40 border border-dark-700">
                <Clock className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-dark-300 font-medium">Typically respond within 24 hours</p>
                  <p className="text-sm text-dark-500">Serious inquiries only</p>
                </div>
              </div>

              {/* Direct Email */}
              <a
                href="mailto:devpatel170521@gmail.com"
                className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                devpatel170521@gmail.com
              </a>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 rounded-2xl bg-dark-800/40 border border-dark-700">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                    <p className="text-dark-400">I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-dark-600 text-white placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-dark-600 text-white placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        What's the challenge?
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-dark-600 text-white placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors resize-none"
                        placeholder="Describe the problem you're trying to solve..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    {status === 'error' && (
                      <p className="text-red-400 text-sm text-center">
                        Something went wrong. Try emailing directly.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
