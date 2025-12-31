'use client'

import { motion } from 'framer-motion'
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
  Mail
} from 'lucide-react'

const socialLinks = [
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
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ), 
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
    { name: 'Resume', href: '/Dev_Patel_Resume.pdf' },
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
      
      <div className="container-custom relative z-10 py-16 px-4 md:px-8">
        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="heading-md mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h3>
          <p className="text-dark-400 max-w-xl mx-auto mb-8">
            Follow me on social media to stay updated with my latest projects and insights.
          </p>
          
          {/* Social Icons Grid */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-4 rounded-2xl glass-card transition-all duration-300 ${social.color}`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {typeof social.icon === 'function' ? (
                  <social.icon />
                ) : (
                  <social.icon className="w-5 h-5 text-dark-300 group-hover:text-white transition-colors" />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-dark-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {social.name}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark-800 rotate-45" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Email CTA */}
          <motion.a
            href="mailto:devpatel170521@gmail.com"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card hover:border-primary-500/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-5 h-5 text-primary-400" />
            <span className="text-dark-200 group-hover:text-white transition-colors">devpatel170521@gmail.com</span>
          </motion.a>
        </motion.div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-12 border-t border-white/5">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="inline-block mb-4">
              <span className="text-2xl font-bold font-display">
                <span className="gradient-text">Dev</span>
                <span className="text-white">Patel</span>
              </span>
            </a>
            <p className="text-dark-400 max-w-md mb-6">
              Full Stack Developer & Technical Leader combining technical excellence 
              with strategic leadership to deliver innovative solutions.
            </p>
            <div className="flex items-center gap-2 text-dark-500 text-sm">
              <span>Available for</span>
              <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">Opportunities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-dark-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-dark-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 text-dark-400 text-sm">
            <span>© {new Date().getFullYear()} Dev Patel. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>in India</span>
          </div>
          
          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm group"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </footer>
  )
}
