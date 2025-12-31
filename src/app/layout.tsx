import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Dev Patel | Full Stack Developer & Technical Leader',
    template: '%s | Dev Patel Portfolio'
  },
  description: 'Portfolio of Dev Patel - A dynamic Full Stack Developer and Technical Leader with expertise in Web Development, Cloud Computing, Cybersecurity, and Product Management. Combining technical excellence with strategic leadership to deliver innovative solutions.',
  keywords: [
    'Dev Patel',
    'Full Stack Developer',
    'Technical Leader',
    'Product Manager',
    'Project Manager',
    'Web Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'AWS Certified',
    'Cloud Computing',
    'Cybersecurity',
    'Digital Marketing',
    'Team Leadership',
    'Agile',
    'Scrum',
    'India',
    'Portfolio'
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
    siteName: 'Dev Patel Portfolio',
    title: 'Dev Patel | Full Stack Developer & Technical Leader',
    description: 'Portfolio showcasing technical expertise in Full Stack Development, Cloud Computing, and leadership in Product & Project Management.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dev Patel - Full Stack Developer & Technical Leader',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Patel | Full Stack Developer & Technical Leader',
    description: 'Portfolio showcasing technical expertise in Full Stack Development, Cloud Computing, and leadership in Product & Project Management.',
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
  jobTitle: 'Full Stack Developer & Technical Leader',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Available for Opportunities'
  },
  knowsAbout: [
    'Full Stack Development',
    'React',
    'Next.js',
    'Node.js',
    'AWS',
    'Cloud Computing',
    'Cybersecurity',
    'Product Management',
    'Project Management',
    'Team Leadership',
    'Digital Marketing'
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University'
  },
  description: 'A dynamic Full Stack Developer and Technical Leader combining technical excellence with strategic leadership to deliver innovative solutions.'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Background Effects */}
        <div className="bg-animated">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="grid-bg"></div>
        <div className="noise"></div>
        
        {children}
      </body>
    </html>
  )
}
