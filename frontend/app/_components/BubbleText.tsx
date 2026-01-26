"use client"
import { useEffect,useContext,useState } from "react";
import { RoomContext } from "../_lib/roomContext";
import { MessageType, userData } from "../_lib/definitions";
import { UserContext } from "../_lib/userContext";

export default function BubbleText({message}:{message:MessageType}){
    const user = useContext(UserContext);
    const room = useContext(RoomContext);
    const [userName, setUserName] = useState<string|null>(null);
    const [isMyMessage, setIsMyMessage] = useState<boolean>();

    const formatDate = (time:string) => {
        const date = new Date(time);
        return `${date.getHours()}:${date.getMinutes()}`
    }

    useEffect(() => {
        const sender =  room?.selectedRoom?.participants.find(val => val.id === message.senderId)
        const userName = sender?.name || "username tidak ditemukan";
        setUserName(userName);
        if(sender?.id === user?.id){
            setIsMyMessage(true);
        }
    },[room])

    return (
        <div className={"flex flex-col rounded-lg ".concat(isMyMessage? "items-end": "items-start")}>
            <div className="flex max-w-[150px] items-end gap-1 mb-1">
                <p className="text-md">{userName}</p>
                <small className="text-xs text-gray-500">{formatDate(message.createdAt)}</small>
            </div>
            <div className={"block p-3 rounded-lg mb-2 ".concat(isMyMessage? "bg-[#374957]":"bg-[#C3CDD5]")}>
                <p className={"w-full max-w-[450px] text-pretty overflow-wrap break-word ".concat(isMyMessage?"text-white text-right":"text-[#374957] text-left")}>
                    {message.message}
                </p>
            </div>
        </div>
    )
}