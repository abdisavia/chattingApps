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
import { ZodError } from "zod";
import { getAllMessage } from "../_lib/MessageActions";
import z from "zod"
import { getSession } from "../_lib/cookie";


export default function Chat() {
    const room = useContext(RoomContext);
    const user = useContext(UserContext);
    const [message, setMessage] = useState<MessageType[]>([]);

    const getMessageData = async() => {
        try{
            const token = await getSession();
            const roomId = room?.selectedRoom?.id;

            if(!token||!roomId) throw new Error("Token / roomId tidak ditemukan");

            const schema = z.object({
                roomId: z.number(),
                token: z.string()
            });

            const validation =  schema.safeParse({
                roomId:roomId,
                token:token
            });

            if(validation.error) throw new Error(validation.error.message);


            const result = await getAllMessage(room?.selectedRoom?.id, token);
            const data = result.data as MessageType[];
            setMessage(data);
            console.log(message);
        }catch(e:any){
            console.log(e.message);
        }
    }

    useEffect(() => {
        if(!room?.selectedRoom?.id || !user?.socket) return;
        console.log(room?.selectedRoom?.id);
        getMessageData();
        user?.socket?.on('new-message', (data:any) => {
            console.log(data);
            setMessage((prev:MessageType[]) => {
                    const newData = [...prev];
                    newData.push({
                        id:data?.messageId || 0,
                        senderId:data?.senderId || 0,
                        type: data?.type || 'text',
                        message: data?.message || "no message found",
                        attachmentsId: data?.attachmentsId || null,
                        createdAt: data?.createdAt || new Date().toISOString()
                    });
                    return newData
                }
            );
        })
    },[room?.selectedRoom?.id])
    

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