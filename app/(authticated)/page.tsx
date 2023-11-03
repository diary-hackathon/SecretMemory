import { cookies } from "next/headers"
import { Suspense } from "react"

import withAuth from "@/app/withAuth"
import { createClient } from "@/utils/supabase/server"

async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: diaries } = await supabase.from("diaries").select("*")
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <pre>{JSON.stringify(diaries, null, 2)}</pre>
    </Suspense>
  )
}

export default withAuth(Index)
