import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import dayjs from "dayjs";
import { db } from "Supabase";

interface CalendarProps {
    events: any[];
}


export const Calendar: React.FC<CalendarProps> = (props) => {
    const { events } = props;
    const [daySelected, setDaySelected] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const dayEventsRef = useRef([]);

    // 今日の日付を色付けする
    const getCurrentDayClass = () => {
        return dayjs().format("DD-MM-YY") === daySelected.format("DD-MM-YY")
        ? "bg-blue-600 text-white rounded-full w-7"
        : "";
    };

    // 登録データを日付が一致する日に表示
    useEffect(() => {
        const events = db.from("events").select().where("day", daySelected).fetch();
        dayEventsRef.current = events;
    }, [daySelected]);

    // イベントを追加する
    const handleAddEvent = () => {
        const newEvent = {
            title: "",
            body: "",
            day: daySelected,
        };
        setSelectedEvent(newEvent);
        setShowEventModal(true);
    };

    // イベントを削除する
    const handleDeleteEvent = () => {
        db.from("events").where("id", selectedEvent.id).delete();
        setShowEventModal(false);
    };

    return (
        <div className="flex flex-col">
            <header className="flex flex-col items-center">
                <h1>カレンダー</h1>
            </header>
            <div className="flex flex-wrap">
                {events.map((event, idx) => (
                    <Day
                        day={event.day}
                        rowIdx={idx}
                        events={events}
                        dayEvents={dayEventsRef.current}
                        setDaySelected={setDaySelected}
                        setShowEventModal={setShowEventModal}
                        setSelectedEvent={setSelectedEvent}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="bg-blue-600 text-white rounded-full w-100 px-4 py-2"
                    onClick={handleAddEvent}
                >
                    イベントを追加
                </button>
            </div>
        </div>
    );
};