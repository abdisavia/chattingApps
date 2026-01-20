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
        
    const router = useRouter()

    const verifyToken = async () => {
        const token = await getSession();
        if(!token) return router.replace("/signin");
        
        const result = await verifyUser(token);
        
        if(result.error) {
            await destroySession();
            return router.replace("/signin");
        };

        const data = result?.data;
        setUser(data);
    }

    const socketConnect = async () => {
        if(!user) return;
        const token = await getSession();
        if(!token) return router.replace("/signin");
        const socket = connectSocket(token);

        setUser(prev => prev? {...prev, socket} : prev);
    }

    useEffect(() => { 
        verifyToken(); 
        socketConnect();
    },[user?.id])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}