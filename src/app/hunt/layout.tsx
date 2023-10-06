import AuthProvider from "@/lib/providers/authProvider"


export default function HuntLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}