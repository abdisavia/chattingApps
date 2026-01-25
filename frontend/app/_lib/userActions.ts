"use server"

import { redirect } from "next/navigation";
import { getSession } from "./cookie";

export async function getUserByEmail(email:string){
    if(!email) {
        return {
            success:false,
            error:"EMAIL_REQUIRED"
        }
    }
    const token = await getSession();

    if(!token) {
        return {
            success:false,
            error:"UNAUTHORIZED"
        }
    }
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${encodeURIComponent(email)}`,{
        method:"GET",
        headers:{
            "Authorization":token,
            "Content-type":"application/json",
        }
    })
    return result.json();
}
