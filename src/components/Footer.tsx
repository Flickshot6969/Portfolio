'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  Heart,
  ArrowUp,
  Mail,
  Phone
} from 'lucide-react'
import { downloadResumePDF } from '@/lib/generateResumePDF'

interface SocialLink {
  name: string
  icon: LucideIcon
  href: string
  color: string
  username: string
}

const socialLinks: SocialLink[] = [
  { 
    name: 'GitHub', 
    icon: Github, 
    href: 'https://github.com/devpatel', 
    color: 'hover:bg-gray-700',
    username: '@devpatel'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    href: 'https://linkedin.com/in/devpatel', 
    color: 'hover:bg-blue-600',
    username: 'Dev Patel'
  },
  { 
    name: 'Twitter', 
    icon: Twitter, 
    href: 'https://twitter.com/devpatel', 
    color: 'hover:bg-sky-500',
    username: '@devpatel'
  },
  { 
    name: 'Instagram', 
    icon: Instagram, 
    href: 'https://instagram.com/devpatel', 
    color: 'hover:bg-pink-600',
    username: '@devpatel'
  },
  { 
    name: 'Facebook', 
    icon: Facebook, 
    href: 'https://facebook.com/devpatel', 
    color: 'hover:bg-blue-700',
    username: 'Dev Patel'
  },
  { 
    name: 'Discord', 
    icon: MessageCircle, 
    href: 'https://discord.com/users/devpatel', 
    color: 'hover:bg-indigo-600',
    username: 'devpatel#0000'
  },
  { 
    name: 'Telegram', 
    icon: Send, 
    href: 'https://t.me/devpatel', 
    color: 'hover:bg-blue-500',
    username: '@devpatel'
  },
  { 
    name: 'WhatsApp', 
    icon: Phone, 
    href: 'https://wa.me/your-number', 
    color: 'hover:bg-green-600',
    username: '+91 XXXXX XXXXX'
  },
]

const footerLinks = {
  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
  ],
  resources: [
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '#download-resume', isDownload: true },
  ]
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/95 to-transparent" />
      
      <div className="container-custom relative z-10 py-8 sm:py-12 md:py-16 px-4 md:px-8">
        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h3 className="heading-md mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h3>
          <p className="text-dark-400 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-4 sm:px-0">
            Follow me on social media to stay updated with my latest projects and insights.
          </p>
          
          {/* Social Icons Grid - Uniform & Animated */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 150 }}
                  className="group relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl sm:rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -8,
                    boxShadow: '0 20px 40px -15px rgba(99, 102, 241, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {/* Background glow on hover */}
                  <motion.div 
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl ${social.color.replace('hover:', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-dark-300 group-hover:text-white transition-colors relative z-10" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-dark-800 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
                    {social.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-800 rotate-45" />
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Email CTA - Premium Style */}
          <motion.a
            href="mailto:devpatel170521@gmail.com"
            className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 30px -10px rgba(99, 102, 241, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 group-hover:text-primary-300 transition-colors" />
            <span className="text-dark-200 group-hover:text-white transition-colors text-sm sm:text-base font-medium">devpatel170521@gmail.com</span>
          </motion.a>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12 border-t border-white/5">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#home" className="inline-block mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold font-display">
                <span className="gradient-text">Dev</span>
                <span className="text-white">Patel</span>
              </span>
            </a>
            <p className="text-dark-400 max-w-md mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
              Full Stack Developer & Technical Leader combining technical excellence 
              with strategic leadership to deliver innovative solutions.
            </p>
            <div className="flex items-center gap-2 text-dark-500 text-xs sm:text-sm">
              <span>Available for</span>
              <span className="px-2 py-0.5 sm:py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] sm:text-xs">Opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-dark-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {'isDownload' in link && link.isDownload ? (
                    <button 
                      onClick={downloadResumePDF}
                      className="text-dark-400 hover:text-white transition-colors text-xs sm:text-sm cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-dark-400 hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-dark-400 text-xs sm:text-sm text-center sm:text-left">
            <span>© {new Date().getFullYear()} Dev Patel. Made with</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
            <span>in India</span>
          </div>
          
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 sm:gap-2 text-dark-400 hover:text-white transition-colors text-xs sm:text-sm group"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </footer>
  )
}
