"use client";
import React, { useState, createContext } from "react";
import { roomType } from "./definitions";

export const RoomContext = createContext<roomContext|null>(null);

type roomContext = {
    selectedRoom: roomType|null,
    setSelectedRoom: React.Dispatch<React.SetStateAction<roomType|null>>
}

export function RoomProvider({ children }:{children:React.ReactNode}) {
    const [selectedRoom, setSelectedRoom] = useState<roomType|null>(null);

    return (
        <RoomContext.Provider value={{selectedRoom, setSelectedRoom}}>
            {children}
        </RoomContext.Provider>
    )
}