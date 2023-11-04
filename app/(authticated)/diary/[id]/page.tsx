import { SupabaseClient } from "@supabase/supabase-js"
import "./diary.css"


const diaryDetailPage = ({ supabase }: { supabase: SupabaseClient }) => {
  return (
  <div className="body">
      <div className="diaries">
      <input type="date" name="written_date" required></input>
      <span className="round_btn"></span>
      <input type="text" name="title" placeholder="タイトル" required></input>
        <textarea name="content">
        </textarea>
      </div>
  </div>
  )
}

export default diaryDetailPage
