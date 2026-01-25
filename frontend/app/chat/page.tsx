"use client";
import { useEffect,useContext, useState } from "react";
import { roomType } from "../_lib/definitions";
import { RoomContext } from "../_lib/roomContext";
import ChatHeader from "@/app/_components/chat/Header";
import { Icon } from "@iconify/react";
import { UserContext } from "../_lib/userContext";


export default function Chat() {
    const room = useContext(RoomContext);
    const user = useContext(UserContext);
    const [message, setMessage] = useState<string|null>(null);

    useEffect(() => {
        console.log("Selected Room ID changed:", room?.selectedRoom);
        if(!user?.socket) return;
        console.log(`Setting up socket listener for new-message ${user?.socket?.connected}`);
        user?.socket?.on('new-message', (data:any) => {
            console.log("New message received:", data);
            setMessage(data.message);
        })
    },[room?.selectedRoom])

    return (
        <main className="w-full h-screen flex flex-col bg-white justify-center items-center">
            {
                room?.selectedRoom === null ? 
                    <div className="flex flex-col justify-center items-center gap-4 text-center">
                        <Icon icon="fluent:person-chat-24-filled" className="text-gray-500 w-[100px] h-auto"/>
                        <p className="text-gray-500">Pilih Room untuk mulai chat</p>
                    </div>
                 : 
                    <div className="w-full h-full">
                        <ChatHeader room_name={room?.selectedRoom ? room.selectedRoom?.room_name : "No Room Selected"} participantCount={3} />
                        <p>Selected Room ID: {room?.selectedRoom.id}</p>
                        <p>{message}</p>
                    </div>
            }
        </main>
    )
}