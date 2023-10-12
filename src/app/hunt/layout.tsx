'use client'
import Countdown from "@/components/Countdown"
import UserCard from "@/components/UserCard"
import AuthProvider from "@/lib/providers/authProvider"
import { endTime, isHackathonStarted } from "@/lib/utils/consts"
import Link from "next/link"


export default function HuntLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col w-screen h-screen">
        <div className="w-full h-28 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href={'/'}>
              <span className="text-2xl">hello, <br/> ready player <span className="text-red-500">ttu</span></span>
            </Link>
            {isHackathonStarted && <span><Countdown deadline={endTime}/> left!</span>}
          </div>
          <UserCard compact={true} />
        </div>
        {children}
      </div>
    </AuthProvider>
  )
}