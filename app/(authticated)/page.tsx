import "./split.css"
import { SupabaseClient } from "@supabase/supabase-js"
import Link from "next/link"
import { redirect } from "next/navigation"

import withAuth from "../withAuth"

const index = async function ({ supabase }: { supabase: SupabaseClient }) {
  const { data: diary_today } = await supabase
    .from("diaries")
    .select("*")
    .eq("written_date", new Date().toLocaleDateString())

  if (diary_today && diary_today.length > 0) {
    redirect("/calendar")
  }

  return (
    <div className="body">
      <div className="split-text">
        <h1>今日も1日お疲れ様でした。</h1>
      </div>
      <div className="select-container">
        <Link href="/diary/new" className="text-inherit no-underline">
          <div className="diary-container">
            <div className="diary-image">
              <img
                src="https://cdn.glitch.global/4c0c94a2-9f5f-4698-8dcd-6d4403259f05/12929.png?v=1698996258943"
                alt="woman"
              ></img>
            </div>
            <div className="diary-text-wrapper">
              <p className="diary-text">日記を書く</p>
              <p className="diary-text-explain">
                今日あった良いことも悪いことも
                <br />
                全てあなたの思い出です。
                <br />
                記録して大切に保管しましょう。
              </p>
            </div>
          </div>
        </Link>
        <div className="question-container">
          <Link href="/questions" className="text-inherit no-underline">
            <div className="question-image">
              <img
                src="https://cdn.glitch.global/4c0c94a2-9f5f-4698-8dcd-6d4403259f05/7543_color.png?v=1698996068414"
                alt="man"
              ></img>
            </div>
            <div className="question-text-wrapper">
              <p className="question-text">質問に答える</p>
              <p className="question-text-explain">
                質問に答えて、
                <br />
                自分にとことん向き合ってみましょう。
                <br />
                自分の本当の価値観を深く理解できるはずです。
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withAuth(index)
