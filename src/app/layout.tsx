import '@/styles/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const font = localFont({
  src: '../lib/assets/font/rdp.ttf',
  display: 'swap'
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
      <body className={font.className}>{children}</body>
    </html>
  )
}
