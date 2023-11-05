import dayjs from "dayjs"
import Link from "next/link"

import { generateDate } from "./calendar"
import cn from "./cn"

import { createClient } from "@/utils/supabase/client"

type DateBoardProps = {
  selectDate: dayjs.Dayjs
  setSelectDate: (date: dayjs.Dayjs) => void
  className: string
}

type DateCellProps = {
  date: dayjs.Dayjs
  currentMonth: boolean
  selectDate: dayjs.Dayjs
  setSelectDate: (date: dayjs.Dayjs) => void
  diary_id: string | null
}

const CalendarHeader = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"]
  return (
    <div className="grid grid-cols-7 ">
      {days.map((day, index) => {
        return (
          <h1
            key={index}
            className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
          >
            {day}
          </h1>
        )
      })}
    </div>
  )
}

const DateCell = ({
  date,
  currentMonth,
  selectDate,
  setSelectDate,
  diary_id
}: DateCellProps) => {
  const today = dayjs()
  return (
    <div className="p-2 text-center h-full w-full flex flex-col items-start justify-start text-sm border-t">
      <h1
        className={cn(
          currentMonth ? "" : "text-gray-400",
          today.toDate().toDateString() === date.toDate().toDateString()
            ? "bg-red-600 text-white"
            : "",
          selectDate.toDate().toDateString() === date.toDate().toDateString()
            ? "bg-black text-white"
            : "",
          "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
        )}
        onClick={() => {
          setSelectDate(date)
        }}
      >
        {date.date()}
      </h1>
      <div>
        {diary_id && <Link href={`/diary/${diary_id}`}>日記を見る</Link>}
      </div>
    </div>
  )
}

export default async function DateBoard({
  selectDate,
  setSelectDate,
  className
}: DateBoardProps) {
  const today = dayjs()
  const supabase = createClient()
  const { data: diaries } = await supabase.from("diaries").select("*")

  return (
    <div className={className}>
      <CalendarHeader />
      <div className=" grid grid-cols-7 h-full">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth }, index) => {
            return (
              <DateCell
                key={index}
                date={date}
                currentMonth={currentMonth}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                diary_id={
                  diaries?.find(
                    (diary) =>
                      dayjs(diary.written_date).format("YYYY-MM-DD") ===
                      date.format("YYYY-MM-DD")
                  )?.id || null
                }
              />
            )
          }
        )}
      </div>
    </div>
  )
}
