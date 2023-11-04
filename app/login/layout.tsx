export default function UnauthticatedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="w-screen h-screen flex justify-center">{children}</div>
    </>
  )
}
