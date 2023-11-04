import withAuth from "@/app/withAuth"

// 新しい日記を作成するページ
const NewDiary = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">New Diary</h1>
    </div>
  )
}

export default withAuth(NewDiary)
