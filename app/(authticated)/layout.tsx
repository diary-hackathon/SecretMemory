import { Sidebar } from "@/components/Sidebar"

export default function AuthticatedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex flex-col flex-1 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
