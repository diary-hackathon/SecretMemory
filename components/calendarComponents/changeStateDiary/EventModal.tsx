import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import dayjs, { Dayjs } from "dayjs";

interface Event {
    title: string;
    day: Dayjs;
    id: string;
    payload: Event[];
}

interface EventModalProps {
    daySelected: Dayjs;
    setShowEventModal: (show: boolean) => void;
    dispatchCalEvent: (action: { type: string; payload: Event }) => void;
    selectedEvent?: Event;
}

export const EventModal: React.FC<EventModalProps> = ({
    daySelected,
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
}) => {
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const calendarEvent = {
            title: title,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : dayjs().valueOf(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl h-1/2 w-1/2">
                <header className="bg-gray-100 px-4 py-2 flex justify-end">
                    <div className="text-gray-400">
                        {selectedEvent && (
                            <button
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: "delete",
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }}
                            >
                                <MdDeleteForever />
                            </button>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <MdClose />
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div> </div>
                        <textarea
                            rows={10}
                            name="title"
                            placeholder="Add diary"
                            value={title}
                            required
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={handleTitleChange}
                        />
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                        disabled={title.length === 0}
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};
