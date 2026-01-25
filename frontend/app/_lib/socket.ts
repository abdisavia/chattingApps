import { io,Socket } from "socket.io-client";

let socket: Socket|null = null;

export function connectSocket(token:string){
    if(socket && socket.connected) return socket;
    
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        auth:{ 
            token: token
        },
        transports: ["websocket"],
        withCredentials:true
    });
    return socket;
}

export function disconnectSocket(){
    if(!socket) return;
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
}