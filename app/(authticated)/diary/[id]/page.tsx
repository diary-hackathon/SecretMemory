import { Suspense } from "react"
import "./diary.css"

import { createClient } from "@/utils/supabase/client"

const DiaryDetail = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient()

  const { data: diary } = await supabase
    .from("diaries")
    .select("*")
    .eq("id", params.id)
    .single()
  return (
    <>
      {diary && (
        <div className="body">
          <div className="diaries">
            <input
              type="date"
              name="written_date"
              defaultValue={diary.written_date}
              required
            ></input>
            <span className="round_btn"></span>
            <input
              type="text"
              name="title"
              defaultValue={diary.title}
              required
            ></input>
            <textarea name="content" defaultValue={diary.content}></textarea>
          </div>
        </div>
      )}
    </>
  )
}

const diaryDetailPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiaryDetail params={params} />
    </Suspense>
  )
}

export default diaryDetailPage
