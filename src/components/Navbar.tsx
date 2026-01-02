'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, ChevronRight } from 'lucide-react'
import { ActiveSection } from '@/app/page'
// ⚡ NEW: Tactile Systems for Premium Navigation
import { 
  MagneticElement,
  TactileRipple
} from '@/lib/TactileSystem'

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Resume', href: 'resume' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Contact', href: 'contact' },
]

interface NavbarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setActiveSection(href as ActiveSection)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 glass-ultra border-b border-white/10'
            : 'py-5 bg-transparent'
        }`}
      >
        <nav className="container-custom flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl sm:text-2xl font-bold font-display">
              <span className="gradient-text">Dev</span>
              <span className="text-white">Patel</span>
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop Navigation with Magnetic Elements */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <MagneticElement key={link.name} strength={0.15} radius={40}>
                <motion.button
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href
                      ? 'text-white'
                      : 'text-dark-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-white/5 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </MagneticElement>
            ))}
          </div>

          {/* CTA Buttons with Tactile Feedback */}
          <div className="hidden lg:flex items-center gap-4">
            <MagneticElement strength={0.2} radius={50}>
              <TactileRipple rippleColor="rgba(139, 92, 246, 0.3)">
                <motion.a
                  href="/Dev_Patel_Resume.pdf"
                  download
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300 btn-premium jelly-hover tactile-hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  Download CV
                </motion.a>
              </TactileRipple>
            </MagneticElement>
            <MagneticElement strength={0.25} radius={60}>
              <TactileRipple rippleColor="rgba(139, 92, 246, 0.4)">
                <motion.button
                  onClick={() => handleNavClick('contact')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 shadow-lg shadow-primary-500/25 transition-all duration-300 btn-premium tactile-press"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Talk
                  <ChevronRight size={16} />
                </motion.button>
              </TactileRipple>
            </MagneticElement>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-[280px] sm:w-80 bg-dark-900/95 backdrop-blur-xl border-l border-white/10 p-4 sm:p-6 pt-20 sm:pt-24"
            >
              <div className="flex flex-col gap-1 sm:gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium transition-all duration-300 text-left ${
                      activeSection === link.href
                        ? 'text-white bg-white/5'
                        : 'text-dark-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <ChevronRight size={16} className={`sm:w-[18px] sm:h-[18px] ${activeSection === link.href ? 'text-primary-500' : ''}`} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 space-y-3 sm:space-y-4">
                <motion.a
                  href="/Dev_Patel_Resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white text-sm sm:text-base border border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Download Resume
                </motion.a>
                <motion.button
                  onClick={() => handleNavClick('contact')}
                  className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white text-sm sm:text-base bg-gradient-to-r from-primary-600 to-accent-600 shadow-lg shadow-primary-500/25"
                  whileTap={{ scale: 0.95 }}
                >
                  Let&apos;s Talk
                  <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
