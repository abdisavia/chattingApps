"use client";
import { UserContext } from "@/app/_lib/userContext";
import { RoomContext } from "@/app/_lib/roomContext";
import { Icon } from "@iconify/react";
import { useRef, useContext } from "react";
export default function ChatFooter() {
    const user = useContext(UserContext);
    const room = useContext(RoomContext);
    const messageInput = useRef<HTMLInputElement|null>(null)
    
    const handleSendMessageError = (message:string) => {
        console.log(message)
    }

    const handleSendMessage = (e:React.SyntheticEvent) => {
        e.preventDefault();
        if(!messageInput.current)return;
        const message = messageInput.current.value;
        const roomId = room?.selectedRoom?.id;
        if(message === "" || !user?.socket || !roomId) return;

        user.socket.emit("send-message", {
            roomId: roomId,
            type: "text",
            message: message,
            attachmentsId: null
        }, handleSendMessageError)
        messageInput.current.value = "";
    }


    return(
        <div className="flex gap-2 h-[60px] w-full px-4 py-2">
            <input type="text" ref={messageInput} placeholder="Masukkan pesanmu disini" className=" w-full bg-blue px-2 rounded-md"/>
            <button className="aspect-square w-auto h-full p-2 rounded-full hover:bg-[#374957] hover:text-white">
                <Icon icon={"ic:round-plus"} className="w-full h-full "></Icon>
            </button>
            <button className="aspect-square w-auto h-auto border p-2 rounded-full bg-[#374957]" onClick={handleSendMessage}>
                <Icon icon={"mingcute:send-fill"} className="w-full h-full text-white"></Icon>
            </button>
        </div>
    )
}