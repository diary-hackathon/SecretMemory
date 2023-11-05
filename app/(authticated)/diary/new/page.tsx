import "./making-diaries.css"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import axios from 'axios';

import { createClient } from "@/utils/supabase/server"

const getTranslation = async (inputText) => {
  try {
    const result = await axios.get(process.env.DEEPL_URL as string, {
      params: {
        auth_key: process.env.DEEPL_AUTH_KEY as string,
        target_lang: "EN",
        text: inputText,
      },
    });

    return result.data.translations[0].text;
  } catch (error) {
    console.error("Error fetching translation:", error);
    return null;
  }
};

const postDiary = async (formData: FormData) => {
  "use server"
  console.log("enter postDiary");
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const written_date = formData.get("written_date") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const user_id = (await supabase.auth.getUser()).data.user?.id
  console.log(content);
  const translatedText = await getTranslation(content);
  console.log(translatedText);

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

const makeDiaries = function () {
  console.log("welcome!");
  return (
    <div className="body">
      <form action={postDiary} className="diaries">
        <input type="date" name="written_date" required></input>
        <input type="text" name="title" placeholder="タイトル" required></input>
        <textarea
          placeholder="今日はどんな1日でしたか？"
          name="content"
        ></textarea>
        <input type="submit" className="rounded text-center p-1 bg-gray-900 text-gray-100 w-64 hover:bg-gray-700" value="送信"></input>
      </form>
    </div>
  )
}

export default makeDiaries
