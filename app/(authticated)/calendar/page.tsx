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
  const [ monthIndex, setMonthIndex ] = useState(0);
  // const { showEventModal } =useContext(GlobalContext);
  const [showEventModal,setShowEventModal] = useState(false)

      useEffect(() => {
      const today = new Date();
      const month = today.getMonth(); // 0から始まる月を取得
      setMonthIndex(month);
    }, []);


  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex]);

  return (
    <div>
      {showEventModal && <EventModal showEventModal={showEventModal} setShowEventModal={setShowEventModal}/>}
      <div className="h-screen flex flex-col">
        <CalendarHeader monthIndex={monthIndex} setMonthIndex={setMonthIndex}/>
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  )
}


export default withAuthClient(Calendar)
