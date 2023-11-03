import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

import { createClient } from "@/utils/supabase/server"

export default function withAuth(WrappedComponent: React.FC) {
  return async (props: React.JSX.IntrinsicAttributes) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/login")
    }

    return <WrappedComponent {...props} />
  }
}
