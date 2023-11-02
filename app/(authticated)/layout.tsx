import { Sidebar } from "@/components/Sidebar"

export default function AuthticatedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <div className="container p-10 mx-auto">{children}</div>
    </>
  )
}
