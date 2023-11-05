"use client"
import dayjs from "dayjs"
import React, { Suspense, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"

import DateBoard from "@/components/calendar/DateBoard"
import { months } from "@/components/calendar/calendar"

export default function Calendar() {
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const [selectDate, setSelectDate] = useState(currentDate)

  return (
    <div className="flex gap-10 sm:divide-x justify-center sm:w-[80%] mx-auto  h-screen items-center sm:flex-row flex-col">
      <div className="w-full h-full ">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1))
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all"
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

        <Suspense fallback={<div>loading....</div>}>
          <DateBoard
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            className="h-full w-full"
          />
        </Suspense>
      </div>
    </div>
  )
}
