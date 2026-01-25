"use client"
import { createContext } from "react";
import type { userData } from "./definitions";
import { useState, useEffect, lazy } from "react";
import { destroySession, getSession } from "./cookie";
import { useRouter } from "next/navigation";
import { verifyUser } from "./authActions";
import { Socket } from "socket.io-client";
import { connectSocket } from "./socket";

export const UserContext = createContext<(userData & { socket?: Socket }) | null>(null);



export default function UserProvider({ children }:{children:React.ReactNode}):React.ReactNode{
    const [user, setUser] = useState<(userData & { socket?:Socket }) | null>(null);
    const [userErrorMessage, setUserErrorMessage] = useState<string|null>(null);
        
    const router = useRouter()

    const verifyToken = async () => {

        try{

            const token = await getSession();
            if(!token) return router.replace("/signin");
            
            const result = await verifyUser(token);
            
            if(result?.error) {
                await destroySession();
                return router.replace("/signin");
            };
        
            const data = result?.data;
            setUser(data);
            socketConnect(token);
        }catch(e:any){
            await destroySession();
            return router.replace("/signin");
        }
    }

    const socketConnect = async (token:string) => {
        if(!token) return router.replace("/signin");
        const socket = connectSocket(token);
        if(!socket.connected) { 
            setUserErrorMessage("Gagal menghubungkan ke server socket");
            console.log("Gagal menghubungkan ke server socket");
            return; 
        }
        if(socket.connected) console.log("Socket connected");
        setUser(prev => prev? {...prev, socket} : prev);
        console.log(user);
    }

    useEffect(() => { 
        verifyToken(); 
    },[user?.id])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}