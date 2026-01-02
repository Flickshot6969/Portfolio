'use client'

import { useState, useEffect, useCallback } from 'react'
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
import { TheatricalLoader } from '@/components/TheatricalLoader'
import { EliteCursorProvider } from '@/components/EliteCursor'
import { AmbientBackground } from '@/components/AmbientParticles'
import { ScrollDramaProvider } from '@/lib/ScrollDramaEngine'
import { ViewportProvider } from '@/lib/UltraResponsive'
import { NarrativeProvider, ScrollIndicator } from '@/lib/NarrativeScroll'
import { EmotionalProvider } from '@/lib/PsychologicalMotion'

export type ActiveSection = 'home' | 'about' | 'skills' | 'experience' | 'resume' | 'projects' | 'certifications' | 'contact'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎬 CINEMATIC SECTION TRANSITIONS
// Over-engineered transitions that make visitors freeze
// ═══════════════════════════════════════════════════════════════════════════════

const cinematicVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.92,
    filter: 'blur(20px)',
    rotateX: 10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // Dramatic ease-out
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -60,
    scale: 0.95,
    filter: 'blur(15px)',
    rotateX: -5,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home')
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Skip loader if already visited in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('portfolio-loaded')
    if (hasVisited) {
      setIsLoading(false)
      setHasLoaded(true)
    }
  }, [])

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false)
    setHasLoaded(true)
    sessionStorage.setItem('portfolio-loaded', 'true')
  }, [])

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
    <ViewportProvider>
      <EmotionalProvider>
        <EliteCursorProvider enableParticles={true} enableMagnetic={true}>
          <ScrollDramaProvider>
            <NarrativeProvider chapters={['prologue', 'introduction', 'rising', 'climax', 'falling', 'resolution', 'epilogue']}>
              {/* Theatrical Loader - Only shows on first visit */}
              <AnimatePresence>
                {isLoading && (
                  <TheatricalLoader 
                    onComplete={handleLoaderComplete}
                    brandName="Dev Patel"
                    tagline="Crafting Digital Excellence"
                  />
                )}
              </AnimatePresence>

              {/* Main Content - Fades in after loader */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hasLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Scroll Progress Indicator */}
                {hasLoaded && (
                  <ScrollIndicator 
                    position="right"
                    showPercentage={false}
                    showChapters={true}
                    chapters={['Hero', 'About', 'Skills', 'Experience', 'Certifications', 'Contact']}
                  />
                )}

                {/* Global Ambient Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                  <AmbientBackground 
                    particles={true}
                    aurora={true}
                    noise={true}
                    orbs={true}
                    constellation={false}
                  />
                </div>

                <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
                
                <main className="min-h-screen relative z-10" style={{ perspective: '1200px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      variants={cinematicVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {renderSection()}
                    </motion.div>
                  </AnimatePresence>
                </main>
                
                <Footer />
              </motion.div>
            </NarrativeProvider>
          </ScrollDramaProvider>
        </EliteCursorProvider>
      </EmotionalProvider>
    </ViewportProvider>
  )
}
