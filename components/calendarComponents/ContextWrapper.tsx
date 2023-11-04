    import React, { useReducer, useState, useEffect, ReactNode, Dispatch } from "react";
    import GlobalContext from "./GlobalContext";
    import dayjs from "dayjs";

    type Event = {
    id: number;
    title: string;
    // 他のプロパティをここに追加
    };

    type GlobalContextType = {
    monthIndex: number;
    setMonthIndex: Dispatch<React.SetStateAction<number>>;
    daySelected: dayjs.Dayjs | null ;
    setDaySelected: Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    showEventModal: boolean;
    setShowEventModal: Dispatch<React.SetStateAction<boolean>>;
    selectedEvent: Event | null;
    setSelectedEvent: Dispatch<React.SetStateAction<Event | null>>;
    dispatchCalEvent: Dispatch<CalEventAction>;
    savedEvents: Event[];
    };

    type CalEventAction =
    | { type: "push"; payload: Event }
    | { type: "update"; payload: Event }
    | { type: "delete"; payload: Event };

    const saveEventsReducer = (state: Event[], action: CalEventAction): Event[] => {
    switch (action.type) {
        case "push":
        return [...state, action.payload];
        case "update":
        return state.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
        );
        case "delete":
        return state.filter((evt) => evt.id !== action.payload.id);
        default:
        throw new Error("Unsupported action type");
    }
    };

    const initEvents = (): Event[] => {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
    };

    type ContextWrapperProps = {
    children: ReactNode;
    };

    const ContextWrapper = (props: ContextWrapperProps) => {
    const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
    const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [savedEvents, dispatchCalEvent] = useReducer(
        saveEventsReducer,
        [],
        initEvents
    );

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        if (!showEventModal) {
        setSelectedEvent(null);
        }
    }, [showEventModal]);

    const contextValue: GlobalContextType = {
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        dispatchCalEvent,
        savedEvents,
    };

    return (
            <GlobalContext.Provider value={contextValue}>
                {props.children}
            </GlobalContext.Provider>
        
    );
};

export default ContextWrapper;
