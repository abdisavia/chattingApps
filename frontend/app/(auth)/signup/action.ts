"use server"
import { createSession } from "@/app/_lib/cookie";
import { regisSchema } from "@/app/_lib/definitions";
import { redirect } from "next/navigation";
import z from "zod";

export async function signUp(state: any, formData: FormData) {
    try {
        
        // validate formData
        const validationResult = regisSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
            konfPassword: formData.get("confirmPassword"),
            name: formData.get("name")
        })
    
        if (!validationResult.success) {
            return {
                ...z.flattenError(validationResult.error).fieldErrors,
                message:""
            };
        }
    
        // fetch signup to backend
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
                name: formData.get("name"),
                role: "customer"
            })
        })
    
        const data = await result.json();
        // if doesn't succeed return error message
        if (data.error) return {
            email: [],
            password: [],
            name: [],
            message: data.error
        }
        // set session to cookies
        await createSession(data.token);
    } catch (e:any) {
        console.log(e.message);
        return;
    }
        // redirect to /
        redirect("/signup")
}