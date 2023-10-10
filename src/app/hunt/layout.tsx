import UserCard from "@/components/UserCard"
import AuthProvider from "@/lib/providers/authProvider"


export default function HuntLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col w-screen h-screen">
        <div className="w-full h-24 px-4 py-2 flex items-center justify-between">
          <div className="">
            
          </div>
          <UserCard compact={true} />
        </div>
        {children}
      </div>
    </AuthProvider>
  )
}