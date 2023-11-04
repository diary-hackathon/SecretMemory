import { SupabaseClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import React from "react"

import { createClient } from "@/utils/supabase/client"

export default function withAuth(
    WrappedComponent: React.FC<{ supabase: SupabaseClient }>
    ) {
    return async () => {
        const supabase = createClient()
        const {
        data: { session }
        } = await supabase.auth.getSession()

        if (!session) {
        redirect("/login")
        }

        return <WrappedComponent supabase={supabase} />
    }
}
