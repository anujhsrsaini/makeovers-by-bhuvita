import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Makeovers by Bhuvita - Professional Bridal Makeup Artist',
  description: 'Professional bridal makeup artist in India specializing in creating stunning, personalized looks for your special day',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}