"use server"

export async function verifyUser(token:string):Promise<any> {
    console.log("token" + token);
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,{
        method:"POST",
        headers:{
            "Authorization":token,
            "Content-type":"application/json"
        }
    })
    return await result.json();
}