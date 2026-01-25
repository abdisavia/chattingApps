"use client";
import { useEffect,useContext, useState } from "react";
import { MessageType } from "../_lib/definitions";
import { RoomContext } from "../_lib/roomContext";
import ChatHeader from "@/app/_components/chat/Header";
import { Icon } from "@iconify/react";
import { UserContext } from "../_lib/userContext";
import ChatMessages from "../_components/chat/Messages";
import msgData from "@/app/_lib/messageData.json";
import ChatFooter from "../_components/chat/Footer";


export default function Chat() {
    const room = useContext(RoomContext);
    const user = useContext(UserContext);
    const [message, setMessage] = useState<MessageType[]>([]);

    useEffect(() => {
        if(!user?.socket) return;
        user?.socket?.on('new-message', (data:any) => {
            // setMessage((prev:MessageType[]) => {
            //         const newData = [...prev];
                    // newData.push({
                    //     message_id:data?.messageId || 0,
                    //     sender_id:data?.sender_id || 0,
                    //     type: data?.type || 'text',
                    //     message: data?.message || "no message found",
                    //     attachment: data?.attachment || [],
                    //     created_at: data?.created_at || new Date().toISOString()
                    // });
            //         return newData
            //     }
            // );
        })
        const data:MessageType[] = msgData.map(val => {
            return {
                message_id: Number(val?.message_id) || 0,
                sender_id: val?.sender_id || 0,
                type: val?.type || 'text',
                message: val?.message || "no message found",
                attachment: val?.attachment,
                created_at: val?.created_at || new Date().toISOString()
            }
        });
        setMessage(data);
    },[room])
    

    return (
        <main className="w-full h-screen flex flex-col bg-white justify-center items-center">
            {
                room?.selectedRoom === null ? 
                    <div className="flex flex-col justify-center items-center gap-4 text-center">
                        <Icon icon="fluent:person-chat-24-filled" className="text-gray-500 w-[100px] h-auto"/>
                        <p className="text-gray-500">Pilih Room untuk mulai chat</p>
                    </div>
                 : 
                    <div className="flex flex-col w-full h-screen">
                        <ChatHeader />
                        <ChatMessages messages={message} />
                        <ChatFooter/>
                    </div>
            }
        </main>
    )
}