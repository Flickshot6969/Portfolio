'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CaseStudies from '@/components/CaseStudies'
import HowIThink from '@/components/HowIThink'
import AuthoritySection from '@/components/AuthoritySection'
import SkillsProof from '@/components/SkillsProof'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'
import { TheatricalLoader } from '@/components/TheatricalLoader'
import { EliteCursorProvider } from '@/components/EliteCursor'
import { AmbientBackground } from '@/components/AmbientParticles'

export type ActiveSection = 'home' | 'projects' | 'process' | 'authority' | 'skills' | 'contact'

/*
 * ══════════════════════════════════════════════════════════════════════════════
 * PORTFOLIO FLOW - Psychological Journey (DO NOT CHANGE ORDER)
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * 1. HERO → Instant credibility (What I do, For whom, Why it matters)
 * 2. CASE STUDIES → Proof of competence (Problem → Approach → Outcome → Learning)
 * 3. HOW I THINK → Depth of thinking (Decision-making transparency)
 * 4. AUTHORITY → Trust signals (Testimonials, metrics, validation)
 * 5. SKILLS → Technical proof (With receipts, not lists)
 * 6. CONTACT → Clear next step (Earned CTA)
 * 
 * This flow is designed for 15-second scan clarity:
 * - First scroll: PROOF (metrics, outcomes)
 * - Second scroll: DEPTH (thinking, decisions)
 * - Third scroll: TRUST (testimonials, authority)
 * - Final scroll: ACTION (contact)
 * 
 * ══════════════════════════════════════════════════════════════════════════════
 */

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home')
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Skip loader if already visited
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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'process', 'authority', 'skills', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as ActiveSection)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <EliteCursorProvider enableParticles={false} enableMagnetic={true}>
      {/* Theatrical Loader */}
      <AnimatePresence>
        {isLoading && (
          <TheatricalLoader 
            onComplete={handleLoaderComplete}
            brandName="Dev Patel"
            tagline="Problem Solver. System Builder."
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Subtle Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <AmbientBackground 
            particles={false}
            aurora={true}
            noise={true}
            orbs={false}
            constellation={false}
          />
        </div>

        {/* Navigation */}
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* 
         * PSYCHOLOGICAL FLOW - Each section earns the next
         * ─────────────────────────────────────────────────
         */}
        <main className="relative z-10">
          {/* 1. INSTANT CREDIBILITY */}
          <section id="home">
            <HeroSection />
          </section>
          
          {/* 2. PROOF OF COMPETENCE */}
          <section id="projects">
            <CaseStudies />
          </section>
          
          {/* 3. DEPTH OF THINKING */}
          <section id="process">
            <HowIThink />
          </section>
          
          {/* 4. AUTHORITY & TRUST */}
          <section id="authority">
            <AuthoritySection />
          </section>
          
          {/* 5. TECHNICAL PROOF */}
          <section id="skills">
            <SkillsProof />
          </section>
          
          {/* 6. CLEAR NEXT STEP */}
          <section id="contact">
            <ContactCTA />
          </section>
        </main>
        
        <Footer />
      </motion.div>
    </EliteCursorProvider>
  )
}
