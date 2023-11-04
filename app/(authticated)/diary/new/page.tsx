import "./making-diaries.css"
import { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import withAuth from "@/app/withAuth"
import { createClient } from "@/utils/supabase/server"

const postDiary = async (formData: FormData) => {
  "use server"
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const written_date = formData.get("written_date") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const user_id = (await supabase.auth.getUser()).data.user?.id

  const { error } = await supabase.from("diaries").insert([
    {
      user_id,
      written_date,
      title,
      content
    }
  ])

  if (error) {
    console.error(user_id, written_date, title, content)
    console.error(error)
    return redirect("/diary/new?message=Could not post diary")
  }
  return redirect("/calender")
}

const makeDiaries = function ({ supabase }: { supabase: SupabaseClient }) {
  return (
    <div className="body">
      <form action={postDiary} className="diaries">
        <input type="date" name="written_date" required></input>
        <input type="text" name="title" placeholder="タイトル" required></input>
        <textarea
          placeholder="今日はどんな1日でしたか？"
          name="content"
        ></textarea>
        <input type="submit" value="送信"></input>
      </form>
    </div>
  )
}

export default withAuth(makeDiaries)
