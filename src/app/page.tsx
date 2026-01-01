'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import HowIThink from '@/components/HowIThink'
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
                    chapters={['Hero', 'Projects', 'Process', 'About', 'Skills', 'Experience', 'Certifications', 'Contact']}
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
                
                {/* FULL SCROLLING LAYOUT - Project-First Flow */}
                <main className="relative z-10">
                  {/* 1. Hero - First Impression */}
                  <section id="home">
                    <Hero />
                  </section>
                  
                  {/* 2. Featured Projects - PROOF FIRST */}
                  <section id="projects">
                    <FeaturedProjects />
                  </section>
                  
                  {/* 3. How I Think - SIGNATURE SECTION */}
                  <section id="process">
                    <HowIThink />
                  </section>
                  
                  {/* 4. About - Build Trust */}
                  <section id="about">
                    <About />
                  </section>
                  
                  {/* 5. Skills - Technical Proof */}
                  <section id="skills">
                    <Skills />
                  </section>
                  
                  {/* 6. Experience - Authority */}
                  <section id="experience">
                    <Experience />
                  </section>
                  
                  {/* 7. Certifications - Credentials */}
                  <section id="certifications">
                    <Certifications />
                  </section>
                  
                  {/* 8. Contact - CTA */}
                  <section id="contact">
                    <Contact />
                  </section>
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
