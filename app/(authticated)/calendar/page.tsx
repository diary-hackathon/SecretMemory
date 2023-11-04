// カレンダーページ
"use client"
import withAuthClient from "@/app/withAuthClient"
import { useState, useEffect, useContext } from 'react'

import { getMonth } from "@/components/calendarComponents/util"
import { CalendarHeader } from "@/components/calendarComponents/CalendarHeader"
import { Month } from "@/components/calendarComponents/Month"
import { EventModal } from  "@/components/calendarComponents/EventModal"
import GlobalContext from "@/components/calendarComponents/GlobalContext"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, setMonthIndex, showEventModal } =useContext(GlobalContext);

  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },{monthIndex});

  return (
    <div>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  )
}

export default withAuthClient(Calendar)
