import LoginForm from "@/components/LoginForm"

export default function LoginPage({
  searchParams
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex h-screen">
      {/* 左側の説明部分 */}
      <div className="flex-1 bg-blue-500 text-white">
        <div className="text-4xl mb-4">Welcome to Our Service</div>
        <p className="text-lg">
          ここにサービスの説明を記述できます。ユーザーに魅力を伝えるテキストや画像を追加しましょう。
        </p>
      </div>

      {/* 右側のログインフォーム */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md p-8">
          <LoginForm errorMessage={searchParams.message} />
        </div>
      </div>
    </div>
  )
}
