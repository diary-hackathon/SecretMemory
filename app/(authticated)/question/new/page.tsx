// 質問に答えるページ
import withAuth from "@/app/withAuth"

const newQuestion = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">New Question</h1>
    </div>
  )
}

export default withAuth(newQuestion)
