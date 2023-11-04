import React, { createContext, Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
    type GlobalContextType = {
        monthIndex: number; setMonthIndex: Dispatch<SetStateAction<number>>;
        daySelected: dayjs.Dayjs | null; setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
        showEventModal: boolean; setShowEventModal: Dispatch<SetStateAction<boolean>>; dispatchCalEvent: ({ type, payload }: { type: string; payload: any }) => void;
        savedEvents: any[]; // 保存されたイベントの型を指定する必要があります 
        selectedEvent: any | null; // 選択されたイベントの型を指定する必要があります 
        setSelectedEvent: Dispatch<SetStateAction<any | null>>; // setSelectedEvent の型を指定する必要があります 
    }; 
    const defaultGlobalContext: GlobalContextType = { 
        monthIndex: 0, setMonthIndex: () => {}, 
        daySelected: null, setDaySelected: () => {}, 
        showEventModal: false, setShowEventModal: () => {}, dispatchCalEvent: ({ type, payload }) => {}, 
        savedEvents: [], selectedEvent: null, setSelectedEvent: () => {} 
    }; 
    const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext); 

    export default GlobalContext;