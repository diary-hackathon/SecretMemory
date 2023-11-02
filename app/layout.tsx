import { GeistSans } from "geist/font"

import "@/app/globals.css"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Secret Memory",
  description: "A place to store your secrets"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main className="flex-1 w-full flex">{children}</main>
      </body>
    </html>
  )
}
