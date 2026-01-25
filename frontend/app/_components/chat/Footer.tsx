"use client";
import { Icon } from "@iconify/react";
export default function ChatFooter() {
    

    const handleSendMessage = () => {

    }

    return(
        <div className="flex gap-2 h-[60px] w-full px-4 py-2">
            <input type="text" placeholder="Masukkan pesanmu disini" className=" w-full bg-blue px-2 rounded-md"/>
            <button className="aspect-square w-auto h-full p-2 rounded-full hover:bg-[#374957] hover:text-white">
                <Icon icon={"ic:round-plus"} className="w-full h-full "></Icon>
            </button>
            <button className="aspect-square w-auto h-auto border p-2 rounded-full bg-[#374957]" onClick={handleSendMessage}>
                <Icon icon={"mingcute:send-fill"} className="w-full h-full text-white"></Icon>
            </button>
        </div>
    )
}