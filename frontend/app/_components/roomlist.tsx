"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_lib/userContext";
import { getSession } from "../_lib/cookie";
import { useRouter } from "next/navigation";
import { getAllRooms } from "../_lib/roomActions";
import { roomType } from "../_lib/definitions";
import { Icon } from "@iconify/react";
import { RoomContext } from "../_lib/roomContext";

export default function RoomList({openModal}:{openModal:Function}){
    const user = useContext(UserContext);
    const room = useContext(RoomContext);
    const [listRoom, setListRoom] = useState<roomType[]|null>(null);
    const router = useRouter();

    const getRooms = async () => {
        try{
            const token = await getSession();
            if(!token) return router.replace("/signin");
    
            const result = await getAllRooms(token);
            if(result.status !== 200) return console.log(result.error);
            const data = result.data;
            changePersonalRoomName(data);
            setListRoom(data);
        }catch(e:any){
            console.log(e.message);
        }
    }

    const changePersonalRoomName = (room:roomType[]) => {
        const personalRooms = room.filter(val => val.type === "personal").map(val => {
            return val.id;
        })
        console.log(personalRooms);
    }

    useEffect(() => {
        getRooms();
    },[])

    return (
        <div className="w-[500px] flex flex-col py-5 px-5 bg-[#C3CDD5]">
            <header className="flex flex-col gap-4 mb-2 ">
                <p className="font-semibold text-xl max-w-[120px] truncate text-[#374957]">{user? user.name:""}</p>
                <div className="flex w-full gap-2 justify-center">
                    <button 
                    className="flex gap-1 justify-center items-center border rounded-md py-2 px-3 text-[#374957] hover:bg-[#374957] hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        openModal("group");
                    }}
                    >
                        <Icon icon="ic:round-plus" width={"25px"} className="font-light "></Icon>
                        <p>Group Chat</p>
                    </button>
                    <button 
                    className="flex gap-1 justify-center items-center border rounded-md py-2 px-3 text-[#374957] hover:bg-[#374957] hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        openModal("personal");
                    }}
                    >
                        <Icon icon="ic:round-plus" width={"25px"} className="font-light "></Icon>
                        <p>Personal Chat</p>
                    </button>
                </div>
            </header>
            <ul>
                {
                    listRoom ? listRoom.map((val,idx) => {
                        return (
                            <li key={idx}>
                                <button 
                                type="button" 
                                className="w-full flex items-center gap-3 border border-[#C3CDD5] hover:border-[#374957] hover:shadow-md px-3 py-2 text-left cursor-pointer rounded-md"
                                onClick={() => {
                                    room?.setSelectedRoom(val? val : null)
                                    console.log(user?.socket);
                                    user?.socket?.emit("join-room", val.id);
                                }}
                                >
                                    <div className="rounded-full w-auto h-[60px] bg-[#374957] p-2">
                                        <Icon icon="mdi:user" width="100%" className="text-white"></Icon>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold mb-1 text-[#374957]">{val.room_name}</h1>
                                        <p className="text-sm text-[#374957]">{val.type}</p>
                                    </div>
                                </button>
                            </li>
                        )
                    }) : ""
                }
            </ul>
        </div>  
    )

}