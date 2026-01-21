"use client";

export default function ChatHeader({room_name, participantCount}:{room_name:string|null, participantCount?:number}) {
    return (
        <header className="bg-[#374957] text-white p-4">
            <h1 className="text-xl font-semibold capitalize">{room_name}</h1>
            <p>{participantCount} participants</p>
        </header>
    )
}