import { cn } from '@/lib/utils/cn'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'

const font = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ready Player TTU',
  description: 'Get Ready To Join The Hunt!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'text-lg')}>{children}</body>
    </html>
  )
}
