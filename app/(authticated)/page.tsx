import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { createClient } from "@/utils/supabase/server"

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: diaries } = await supabase.from("diaries").select("*")
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <pre>{JSON.stringify(diaries, null, 2)}</pre>
    </Suspense>
  )
}
