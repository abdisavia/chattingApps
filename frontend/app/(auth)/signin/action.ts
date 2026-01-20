"use server"
import { loginSchema } from "@/app/_lib/definitions"
import z from "zod"
import { createSession, destroySession, getSession } from "@/app/_lib/cookie"
import { redirect } from "next/navigation"


export type Message = {
    email: string,
    password: string,
    message: string
}

export async function signIn(state: any, formData: FormData) {
    try {
        const validationResults = loginSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password")
        })
        
        if (!validationResults.success) {
            return {
                email: z.flattenError(validationResults.error).fieldErrors.email || [],
                password: z.flattenError(validationResults.error).fieldErrors.password || [],
                message: ""
            }
        }
    
        // fetch Login to backend
    
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            })
        })
    
        const data = await result.json();
        
        // check if login is error if error return the message
        if (data.error) return {
            email: [],
            password: [],
            message: data.error
        }

        await createSession(data.data);
    } catch (e:any) {
        console.log(e.message);
        return;
    }
    redirect("/chat")
}