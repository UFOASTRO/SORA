import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SORA - Web & Software Development Agency',
  description: 'Elevate your digital presence with our cutting-edge web and software solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} sky-gradient min-h-screen`}>{children}</body>
    </html>
  )
}

