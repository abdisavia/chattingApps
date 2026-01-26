"use server"

export async function getAllMessage(roomId:number|undefined, token:string){
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/message/${roomId}`,{
        method:"GET",
        headers:{
            "Authorization":token,
            "Content-Type":"application/json",
        },
    })
    return await result.json();
}