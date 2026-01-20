"use server"

import { roomType } from "./definitions";

export async function getAllRooms(token:string) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/room/`,{
        method:"GET",
        headers: {
            "Authorization":token,
            "Content-type":"application/json",
        }
    })
    return await result.json();
}

export async function createRoom(token:string, data:roomType){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/room/`,{
        method:"POST",
        headers:{
            "Authorization":token,
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    return await result.json();
}