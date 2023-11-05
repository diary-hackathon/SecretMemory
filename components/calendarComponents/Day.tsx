import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";

interface DayProps {
    day: dayjs.Dayjs;
    rowIdx: number;
}


export const Day: React.FC<DayProps> = (props) => {
    const { day, rowIdx } = props;
    const [dayEvents, setDayEvents] = useState<any[]>([]);
    const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
        useContext(GlobalContext);

    // 今日の日付を色付けする
    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
        ? "bg-blue-600 text-white rounded-full w-7"
        : "";
    };

    // 登録データを日付が一致する日に表示
    useEffect(() => {
        const events = savedEvents.filter(
        (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [savedEvents, day]);

    return (
        <div className="border border-gray-200 flex flex-col">
        <header className="flex flex-col items-center">
            {/* 1行目に曜日を表示 */}
            {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>}
            <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>
            {day.format("DD")}
            </p>
        </header>
        <div
            className="flex-1 cursor-pointer"
            onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
            }}
        >
            {dayEvents.map((evt, idx) => (
            <div
                key={idx}
                onClick={() => setSelectedEvent(evt)}
                className={`bg-neutral-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
                {evt.title}
            </div>
            ))}
            {<div >
                {dayEvents.length > 0 && <AiOutlineCheckCircle className="text-red-500 text-2xl " /> }
            </div>}
        </div>
        </div>
    );
};