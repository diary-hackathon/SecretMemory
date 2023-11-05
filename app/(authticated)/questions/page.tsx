"use client"

import { createClient } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import seedrandom from "seedrandom"

import type { Database } from "@/types/supabase"

const saveAnswers = async (
  answers: Database["public"]["Tables"]["answers"]["Row"][]
) => {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
    const user_id = (await supabase.auth.getUser()).data.user?.id // 現在のユーザーを取得

    if (!user_id) {
      throw new Error("User is not authenticated")
    }

    // answers配列の各項目に対してデータベースに保存する処理
    for (const answer of answers) {
      const { error } = await supabase.from("answers").insert({
        user_id: user_id,
        question_id: answer.id,
        written_date: seed,
        answer: answer.answer
      })
      if (error) {
        throw error
      }
    }
  } catch (error) {
    console.error("Error saving answers:", error)
  }
}

const TABLE_NAME = "questions"

// 今日の日付をシード値として使用
const seed = new Date().toISOString().slice(0, 10) // YYYY-MM-DD format
const rng = seedrandom(seed)

// 全てのIDを取得する関数
const getAllQuestionIds = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )
  const { data, error } = await supabase.from(TABLE_NAME).select("id")
  if (error) return []
  return data.map((item) => item.id)
}

// シード値を基にランダムなIDを5つ選択する関数
const selectRandomIds = (allIds: string[]) => {
  const shuffled = allIds.sort(() => 0.5 - rng())
  return shuffled.slice(0, 5)
}

const getRandomQuestions = async () => {
  try {
    const allIds = await getAllQuestionIds()
    const randomSelectedIds = selectRandomIds(allIds)
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .in("id", randomSelectedIds)

    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    console.error("Error fetching questions:", error)
    return []
  }
}

export default function questionPage() {
  const [questions, setQuestions] = useState<
    Database["public"]["Tables"]["questions"]["Row"][]
  >([])
  const [user_id, setUser_id] = useState<string>("")
  const [user_answer, setUserAnswer] = useState<string>("")
  // console.log(`fetchData: ${JSON.stringify(questions, null, 2)}`);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomQuestions()
      setQuestions(data)
    }
    fetchData()
  }, [])

  const handleAnswerChange = (id: string, answer: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, answer } : q
    )
    setQuestions(updatedQuestions)
  }

  const saveAnswers = async (
    answers: {
      id: string
      answer: string
      question_id: string
      user_id: string
      written_date: string
    }[]
  ) => {
    try {
      const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      )
      // answers配列の各項目に対してデータベースに保存する処理
      for (const answer of answers) {
        const { error } = await supabase.from("answers").insert({
          user_id: answer.user_id,
          question_id: answer.question_id,
          written_date: answer.written_date,
          answer: answer.answer
        })
        if (error) {
          throw error
        }
      }
    } catch (error) {
      console.error("Error saving answers:", error)
    }
  }

  const handleSubmit = async () => {
    await saveAnswers(
      questions.map((q) => ({
        id: q.id,
        answer: user_answer,
        question_id: q.id,
        user_id: user_id,
        written_date: seed
      }))
    )
    // 保存後の処理（例：ユーザーに成功メッセージを表示するなど）をここに追加できます。
  }
  return (
    <div className="body">
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-customRed overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
              <h2 className="text-center font-bold">質問回答ページ</h2>
              <div className="px-5">
                {questions.map((question) => (
                  <div key={question.id}>
                    <input type="hidden" name="question_id" />
                    <p>{question.content}</p>
                    <div className="text-center">
                      <textarea
                        className="w-full"
                        rows={3}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                ))}
                <div className="mt-6 px-4 text-center">
                  <button
                    className="rounded text-center p-2 bg-customRed text-white hover:bg-indigo-300 w-full"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
