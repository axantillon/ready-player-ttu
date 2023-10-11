import UserCard from "@/components/UserCard"
import AuthProvider from "@/lib/providers/authProvider"
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
          <Link href={'/'}>
            <span className="text-2xl">hello, <br/> ready player <span className="text-red-500">ttu</span></span>
          </Link>
          <UserCard compact={true} />
        </div>
        {children}
      </div>
    </AuthProvider>
  )
}