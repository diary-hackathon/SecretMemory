import React, { createContext, Dispatch, SetStateAction } from "react";
import dayjs,{ Dayjs } from "dayjs";

type GlobalContextType = {
    monthIndex: number;
    setMonthIndex: Dispatch<SetStateAction<number>>;
    daySelected: dayjs.Dayjs | null;
    setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    showEventModal: boolean;
    setShowEventModal: Dispatch<SetStateAction<boolean>>;
    selectedEvent: dayjs.Dayjs | null;
    dispatchCalEvent: (event: { type: string; payload: any }) => void;
    savedEvents: any[]; // 保存されたイベントの型を指定する必要があります
    setSelectedEvent: Dispatch<SetStateAction<dayjs.Dayjs | null>>
    };

    const defaultGlobalContext: GlobalContextType = {
    monthIndex: 0,
    setMonthIndex: () => {},
    daySelected: null,
    setDaySelected: () => {},
    showEventModal: false,
    setShowEventModal: () => {},
    selectedEvent: null,
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    setSelectedEvent: () => {}
};

const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext);

export default GlobalContext;
