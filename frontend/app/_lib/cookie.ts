"use server"
import "server-only"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookie = {
    name: "session",
    options : {
        httpOnly: true,
    },
    duration: 24 * 60 * 60 * 1000
}

export async function createSession(token:string) {
    try {
        const cookieStore = await cookies();
        console.log(cookieStore.getAll())
        if(cookieStore.has(cookie.name)) await destroySession();
        cookieStore.set(cookie.name, token);
        return;
    } catch (e:any) {
        console.log(e.message);
    }
}

export async function getSession() {
    try {
        const cookieStore = await cookies();
        return cookieStore.get(cookie.name)?.value;
    } catch (e:any) {
        console.log(e.message);
    }
}

export async function destroySession() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookie.name)
    } catch (e:any) {
        console.log(e.message);
        return;
    }
    redirect("/signin")
}