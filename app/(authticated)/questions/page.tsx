"use client"

import { useState, useEffect } from "react"
import seedrandom from "seedrandom"

import { createClient } from "@/utils/supabase/client"

const saveAnswers = async (answers) => {
  try {
    const supabase = createClient()
    const user_id = (await supabase.auth.getUser()).data.user?.id // 現在のユーザーを取得

    if (!user_id) {
      throw new Error("User is not authenticated")
    }

    // answers配列の各項目に対してデータベースに保存する処理
    for (const answer of answers) {
      console.log(answer)
      const { error } = await supabase.from("answers").insert({
        // user_id: user_id,
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
  const supabase = createClient()
  const { data, error } = await supabase.from(TABLE_NAME).select("id")
  if (error) return []
  return data.map((item) => item.id)
}

// シード値を基にランダムなIDを5つ選択する関数
const selectRandomIds = (allIds) => {
  const shuffled = allIds.sort(() => 0.5 - rng())
  return shuffled.slice(0, 5)
}

const getRandomQuestions = async () => {
  try {
    const allIds = await getAllQuestionIds()
    const randomSelectedIds = selectRandomIds(allIds)
    const supabase = createClient()
    // console.log(randomSelectedIds);
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
  const [questions, setQuestions] = useState([])
  // console.log(`fetchData: ${JSON.stringify(questions, null, 2)}`);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomQuestions()
      setQuestions(data)
    }
    fetchData()
  }, [])

  const handleAnswerChange = (id, answer) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, answer } : q
    )
    setQuestions(updatedQuestions)
  }
  const handleSubmit = async () => {
    await saveAnswers(questions)
    // 保存後の処理（例：ユーザーに成功メッセージを表示するなど）をここに追加できます。
  }
  return (
    <div className="body">
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-gray-300 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h2 className="text-center">質問回答ページ</h2>
              <div className="px-5">
                {questions.map((question) => (
                  <div key={question.id}>
                    <input type="hidden" name="question_id" />
                    <p>{question.content}</p>
                    <div className="text-center">
                      <textarea
                        className="w-full"
                        rows="3"
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                      >
                        {question.answer}
                      </textarea>
                    </div>
                  </div>
                ))}
                <div className="mt-6 px-4 text-center">
                  <button
                    className="rounded text-center p-2 bg-gray-900 text-gray-100 w-64 hover:bg-gray-700 w-full"
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
