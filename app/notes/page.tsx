import { cookies } from "next/headers"
import { Suspense } from "react"

import { createClient } from "@/utils/supabase/server"

type Note = {
  id: string
  title: string
}

async function NoteLists() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: notes } = (await supabase.from("notes").select()) as {
    data: Note[]
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <h1 className="text-4xl font-bold">Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2 className="text-2xl font-bold">{note.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Notes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NoteLists />
    </Suspense>
  )
}
