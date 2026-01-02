import type { Metadata } from 'next'
import './globals.css'
import { ScrollProgress } from '@/components/AnimationEffects'
import CustomCursor from '@/components/CustomCursor'
import { InteractionProvider } from '@/lib/InteractionIntelligence'
import { ScrollPhaseProvider } from '@/lib/ScrollPhaseEngine'

export const metadata: Metadata = {
  metadataBase: new URL('https://devpatel.dev'),
  title: {
    default: 'Dev Patel – Elite Portfolio | Leadership, IBM Cybersecurity & Cloud, Professional Excellence',
    template: '%s | Dev Patel Portfolio'
  },
  description: 'Explore Dev Patel\'s elite portfolio showcasing leadership as General Secretary, IBM Cybersecurity & Cloud Computing expertise, Starbucks barista experience, and unmatched professional skills. Student leadership meets technical mastery.',
  keywords: [
    'Dev Patel',
    'Dev Patel Portfolio',
    'General Secretary',
    'Student Leadership',
    'IBM Cybersecurity',
    'IBM Cloud Computing',
    'IBM Cloud Projects',
    'Cloud Computing Expert',
    'Starbucks Barista',
    'Full Stack Developer',
    'Technical Leader',
    'Gandhinagar University',
    'GIT General Secretary',
    'Event Management',
    'Leadership Excellence',
    'Professional Portfolio',
    'Cloud Architecture',
    'AWS Certified',
    'Digital Marketing',
    'Team Leadership',
    'Student Achievements',
    'Campus Leadership',
    'Technical Expertise',
    'India'
  ],
  authors: [{ name: 'Dev Patel', url: 'https://devpatel.dev' }],
  creator: 'Dev Patel',
  publisher: 'Dev Patel',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devpatel.dev',
    siteName: 'Dev Patel Elite Portfolio',
    title: 'Dev Patel – Elite Portfolio | Leadership, IBM Cybersecurity & Cloud, Professional Excellence',
    description: 'Explore Dev Patel\'s elite portfolio showcasing leadership as General Secretary, IBM Cybersecurity & Cloud Computing expertise, Starbucks barista experience, and unmatched professional skills.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dev Patel - General Secretary, IBM Cybersecurity & Cloud Expert, Leadership Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Patel – Elite Portfolio | Leadership, IBM Cybersecurity & Cloud, Professional Excellence',
    description: 'Student leadership, IBM Cybersecurity & Cloud Computing projects, and Starbucks barista experience. Explore Dev Patel\'s elite professional portfolio.',
    images: ['/og-image.jpg'],
    creator: '@devpatel',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dev Patel',
  url: 'https://devpatel.dev',
  image: '/media/Images/1.jpg',
  sameAs: [
    'https://linkedin.com/in/devpatel',
    'https://github.com/devpatel',
    'https://twitter.com/devpatel',
    'https://instagram.com/devpatel',
  ],
  jobTitle: 'General Secretary & IBM Cybersecurity & Cloud Computing Specialist',
  worksFor: {
    '@type': 'Organization',
    name: 'Gandhinagar Institute of Technology'
  },
  knowsAbout: [
    'Student Leadership',
    'General Secretary Responsibilities',
    'IBM Cybersecurity',
    'IBM Cloud Computing',
    'Cloud Architecture',
    'AWS Cloud Services',
    'Full Stack Development',
    'React',
    'Next.js',
    'Event Management',
    'Campaign Marketing',
    'Digital Marketing',
    'Team Leadership',
    'Customer Service Excellence'
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Gandhinagar Institute of Technology (GIT)',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'India'
    }
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'IBM Cybersecurity Fundamentals'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'IBM Cloud Computing Fundamentals'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'HubSpot Digital Marketing Certification'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'AWS Solutions Architecture (Forage)'
    }
  ],
  description: 'Dev Patel is the General Secretary at Gandhinagar Institute of Technology, combining student leadership excellence with IBM Cybersecurity, Cloud Computing expertise and professional experience as a Starbucks barista. Bridging organizational leadership with technical mastery.'
}

// Portfolio structured data for projects
const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Dev Patel\'s Portfolio Projects',
  description: 'Elite portfolio showcasing IBM Cybersecurity, Cloud Computing projects, student leadership initiatives, and professional work',
  itemListElement: [
    {
      '@type': 'CreativeWork',
      position: 1,
      name: 'IBM Cybersecurity & Cloud Architecture Solutions',
      description: 'Enterprise-grade cloud infrastructure and cybersecurity using IBM Cloud and AWS best practices'
    },
    {
      '@type': 'CreativeWork',
      position: 2,
      name: 'Student Governance Platform',
      description: 'Leadership project as General Secretary managing 5000+ students'
    },
    {
      '@type': 'CreativeWork',
      position: 3,
      name: 'Event Management System',
      description: 'Comprehensive event orchestration for university cultural festivals'
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="dark" />
        {/* Person Schema - Dev Patel Profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Portfolio Schema - Projects & Work */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <InteractionProvider>
          <ScrollPhaseProvider>
            {/* Elite UI Effects */}
            <CustomCursor />
            <ScrollProgress />
            
            {/* Background Effects */}
            <div className="bg-animated">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="orb orb-3"></div>
            </div>
            <div className="grid-bg"></div>
            <div className="noise"></div>
            
            {children}
          </ScrollPhaseProvider>
        </InteractionProvider>
      </body>
    </html>
  )
}
