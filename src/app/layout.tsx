import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import '@/styles/globals.css'
import { GithubIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import Link from 'next/link'

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
      <body className={cn(font.className, 'text-lg relative')}>
        {children}
        <div className="z-10 absolute bottom-2 right-2">
          <Link href={'https://github.com/ttu-cr-stl/ready-player-ttu'}>
            <GithubIcon className='w-10 h-10 border p-2 rounded-full hover:bg-black/5'/>
          </Link>
        </div>
      </body>
    </html>
  )
}
