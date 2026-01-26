"use client";
import BubbleText from "../BubbleText";
import { MessageType } from "@/app/_lib/definitions";
import { useRef,useEffect, useState } from "react";


export default function ChatMessages({messages}:{messages:MessageType[]}){
    const container = useRef<HTMLDivElement>(null);
    const messageContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(container.current && messageContainer.current){
            const height = messageContainer.current.scrollHeight
            container.current.scrollTo({
                top:height,
                behavior:"smooth"
            })
        }
    },[messages])
    
    return (
        <div className="flex-1 overflow-y-auto p-4 h-full overflow-y-auto" ref={container}>
            <div className="flex flex-col gap-4" ref={messageContainer}>
                {
                    messages.length > 0 && messages.map((val,idx) => {
                        return <BubbleText message={val} key={idx}/>
                    })
                }
            </div>
        </div>
    )
}