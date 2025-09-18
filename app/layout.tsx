import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'Kerala MigrantCare',
    template: '%s | Kerala MigrantCare'
  },
  description: 'Digital Health Records Management System for Migrant Workers in Kerala',
  keywords: ['Kerala', 'Health Records', 'Migrant Workers', 'Digital Health', 'Government Initiative'],
  authors: [{ name: 'Government of Kerala' }],
  creator: 'Kerala Health Department',
  metadataBase: new URL('https://kerala-migrantcare.gov.in'),
  
  // Enhanced OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kerala-migrantcare.gov.in',
    title: 'Kerala MigrantCare',
    description: 'Digital Health Records Management System for Migrant Workers in Kerala',
    siteName: 'Kerala MigrantCare',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kerala MigrantCare - Digital Health Records',
      }
    ],
  },
  
  // Enhanced Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala MigrantCare',
    description: 'Digital Health Records Management System for Migrant Workers in Kerala',
    images: ['/twitter-image.jpg'],
    creator: '@KeralaGov',
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
  category: 'Healthcare',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} bg-gradient-to-br from-slate-50 via-white to-stone-50`}>
      <body className={`${inter.className} antialiased min-h-screen text-slate-900 bg-gradient-to-br from-slate-50 via-white to-stone-50`}>
        <div id="root">
          {children}
        </div>
        
        {/* Production scripts */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Add analytics or other production scripts here
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
