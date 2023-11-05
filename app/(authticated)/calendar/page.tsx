"use client"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"

import type { Database } from "@/types/supabase"

import DateBoard from "@/components/calendar/DateBoard"
import { months } from "@/components/calendar/calendar"
import { createClient } from "@/utils/supabase/client"

export default function Calendar() {
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const [selectDate, setSelectDate] = useState(currentDate)
  const [diaries, setDiaries] = useState<
    Database["public"]["Tables"]["diaries"]["Row"][]
  >([])

  useEffect(() => {
    const supabase = createClient()
    const fetchDiaries = async () => {
      const { data: diaries, error } = await supabase
        .from("diaries")
        .select("*")
      if (error) {
        console.error(error)
      } else {
        setDiaries(diaries)
      }
    }
    fetchDiaries()
  })

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-[80%] mx-auto  h-screen items-center sm:flex-row flex-col bg-customRed">
      <div className="w-full h-full ">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-sacramento">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1))
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all font-sacramento"
              onClick={() => {
                setToday(currentDate)
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1))
              }}
            />
          </div>
        </div>

        <DateBoard
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          className="h-full w-full"
          diaries={diaries}
        />
      </div>
    </div>
  )
}
