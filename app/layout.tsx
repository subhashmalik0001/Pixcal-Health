import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { LayoutWrapper } from '@/components/layout-wrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pixcal Health - Healthcare Without Barriers',
  description: 'AI-powered medical triage, 24/7 access, zero wait times. Democratizing healthcare for everyone who can\'t reach a doctor easily.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}

