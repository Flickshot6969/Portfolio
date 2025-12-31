'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Resume from '@/components/Resume'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export type ActiveSection = 'home' | 'about' | 'skills' | 'experience' | 'resume' | 'projects' | 'certifications' | 'contact'

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home')

  // Handle hash changes for direct linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as ActiveSection
      if (hash && ['home', 'about', 'skills', 'experience', 'resume', 'projects', 'certifications', 'contact'].includes(hash)) {
        setActiveSection(hash)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update URL hash when section changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${activeSection}`)
  }, [activeSection])

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      scale: 0.98,
      transition: {
        duration: 0.3
      }
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero key="hero" />
      case 'about':
        return <About key="about" />
      case 'skills':
        return <Skills key="skills" />
      case 'experience':
        return <Experience key="experience" />
      case 'resume':
        return <Resume key="resume" />
      case 'certifications':
        return <Certifications key="certifications" />
      case 'contact':
        return <Contact key="contact" />
      default:
        return <Hero key="hero" />
    }
  }

  return (
    <>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
