'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { MagneticButton, BlurReveal } from './AnimationEffects'
import { Card3D, SectionReveal } from './EliteEffects'
// ⚡ NEW: Psychological Motion & Tactile Systems
import { 
  AweReveal, 
  GrandEntrance,
  HeartbeatElement,
  FocusPull,
  BreathingContainer,
  DopamineHit
} from '@/lib/PsychologicalMotion'
import { 
  TactileCard, 
  TactileButton,
  MagneticElement,
  TactileRipple,
  PressureSensitive
} from '@/lib/TactileSystem'
import { DramaticReveal, ScrollSpotlight } from '@/lib/NarrativeScroll'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'devpatel170521@gmail.com',
    href: 'mailto:devpatel170521@gmail.com'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: '#'
  },
  {
    icon: MessageSquare,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: '#'
  }
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // EmailJS configuration - You'll need to set these up
      // Service ID, Template ID, and Public Key should be added to env variables
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'
      )

      if (result.status === 200) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or email directly.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section id="contact" className="section-padding relative overflow-hidden aurora-bg">
      {/* Background Effects with Breathing */}
      <BreathingContainer breathIntensity={0.4}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/15 to-accent-500/15 rounded-full blur-3xl opacity-50 vegas-glow" />
      </BreathingContainer>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header - Elite with Grand Entrance */}
        <GrandEntrance delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <HeartbeatElement intensity={0.6}>
              <motion.span 
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-elite text-primary-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4 magnetic-glow breathing-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Sparkles className="w-4 h-4" />
                Get In Touch
              </motion.span>
            </HeartbeatElement>
            {/* H1 for Contact - SEO */}
            <h1 className="heading-lg mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Collaboration{' '}
              </motion.span>
              <FocusPull intensity={1.2}>
                <motion.span 
                  className="gradient-shimmer"
                  initial={{ opacity: 0, rotateX: -40 }}
                  animate={inView ? { opacity: 1, rotateX: 0 } : {}}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                >
                  & Opportunities
                </motion.span>
              </FocusPull>
            </h1>
          <motion.p 
            className="text-body max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Connect with Dev Patel, a General Secretary and IBM Cloud professional, for portfolio projects, 
            mentorship, or collaboration opportunities. Let&apos;s create something amazing together!
          </motion.p>
        </motion.div>
        </GrandEntrance>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-4 sm:space-y-8"
          >
            {/* Info Cards - Elite */}
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={itemVariants}
                  className="flex items-center gap-3 sm:gap-4 glass-elite rounded-lg sm:rounded-xl p-3 sm:p-4 group premium-card-hover"
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.div 
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 group-hover:text-primary-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-xs sm:text-sm text-dark-400 group-hover:text-dark-300 transition-colors">{info.label}</p>
                    <p className="text-white font-medium text-sm sm:text-base">{info.value}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-dark-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            {/* Quick Message - Love Card */}
            <motion.div
              variants={itemVariants}
              className="card-love p-4 sm:p-6"
            >
              <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base relative z-10">Prefer Quick Communication?</h4>
              <p className="text-dark-400 text-xs sm:text-sm mb-3 sm:mb-4 relative z-10">
                Feel free to reach out directly via email or connect with me on social media platforms.
              </p>
              <motion.a
                href="mailto:devpatel170521@gmail.com"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-primary-400 font-medium text-xs sm:text-sm relative z-10"
                whileHover={{ x: 5, scale: 1.05 }}
              >
                Send Direct Email
                <Send size={12} className="sm:w-[14px] sm:h-[14px]" />
              </motion.a>
            </motion.div>

            {/* Map/Location Image Placeholder */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl sm:rounded-2xl p-1.5 sm:p-2 overflow-hidden hidden lg:block"
            >
              <div className="aspect-video rounded-lg sm:rounded-xl bg-dark-800/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-primary-400 mx-auto mb-1.5 sm:mb-2" />
                  <p className="text-dark-400 text-sm sm:text-base">Based in India</p>
                  <p className="text-xs sm:text-sm text-dark-500">Available for Remote Work</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Elite */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <div className="glass-elite rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-primary-500/20 relative overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-cyan-500/10 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-400" />
                  Send a Message
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-dark-300 mb-1.5 sm:mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field text-sm sm:text-base focus-ring-elite"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-dark-300 mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field text-sm sm:text-base focus-ring-elite"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-dark-300 mb-1.5 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field text-sm sm:text-base"
                    placeholder="Project Inquiry / Job Opportunity"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-dark-300 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input-field resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Hidden fields for EmailJS */}
                <input type="hidden" name="to_email" value="devpatel170521@gmail.com" />

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs sm:text-sm"
                  >
                    <CheckCircle size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm"
                  >
                    <AlertCircle size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary btn-premium w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 sm:py-4 ripple-effect"
                  whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin sm:w-5 sm:h-5" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </>
                  )}
                </motion.button>
              </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
