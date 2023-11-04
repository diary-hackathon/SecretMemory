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
        <div className="min-h-full flex flex-col">{children}</div>
      </body>
    </html>
  )
}
