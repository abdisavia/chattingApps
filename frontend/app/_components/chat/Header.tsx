"use client";
import { RoomContext } from "@/app/_lib/roomContext";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { UserContext } from "@/app/_lib/userContext";

export default function ChatHeader() {
    const room = useContext(RoomContext);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(room?.selectedRoom?.room_name) {
            setTimeout(() => setIsLoading(false), 1000);
        }
    },[room?.selectedRoom])


    return (
        <header className="bg-[#374957] text-white p-4 flex items-center gap-4 relative">
            <div className="w-[60px] h-[60px] rounded-full p-2 bg-white">
                <Icon icon="mdi:user" width={"100%"} className="text-[#374957]"></Icon>
            </div>
            {
                isLoading ? 
                (
                    <div className="animate-pulse flex flex-col gap-2">
                        <div className="w-[250px] h-8 bg-gray-500 rounded-md"></div> 
                        <div className="w-[150px] h-5 bg-gray-500 rounded-md "></div> 
                    </div>
                )
                :
                (
                    <div>
                        <h1 className="text-xl font-semibold capitalize">{room?.selectedRoom?.room_name}</h1>
                        <p>{room?.selectedRoom?.participants.length} participants</p>
                    </div>
                )
            }
        </header>
    )
}