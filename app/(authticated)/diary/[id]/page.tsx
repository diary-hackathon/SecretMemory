import { SupabaseClient } from "@supabase/supabase-js"

import withAuth from "@/app/withAuth"

const diaryDetailPage = ({ supabase }: { supabase: SupabaseClient }) => {
  return <div>diaryDetailPage</div>
}

export default withAuth(diaryDetailPage)
