// import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

import { createClient } from "@/utils/supabase/client"

export default function withAuth(WrappedComponent: React.FC) {
  return async () => {
    // const cookieStore = cookies()
    const supabase = createClient()
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/login")
    }

    return <WrappedComponent />
  }
}
