"use client"
import { SyntheticEvent, useContext, useState } from "react"
import { UserContext } from "../_lib/userContext"
import { Icon } from "@iconify/react"
import { destroySession } from "../_lib/cookie"
import { useRouter } from "next/navigation"
import { disconnectSocket } from "../_lib/socket"

export default function Sidebar(){
    const [btnState, setBtnState] = useState<string|null>("chat")
    const router = useRouter();

    const handleOnClick = (btnName:string) => {
        setBtnState(btnName);
    }

    const handleLogout = () => {
        destroySession();
        disconnectSocket();
        return router.replace("/signin");
    }

    return (
        <aside className="w-[100px] h-screen bg-[#374957] px-2 flex flex-col items-center justify-between py-5">
            <div className="flex flex-col items-center gap-5">
                <div className="w-[60px] h-[60px] rounded-full p-2 bg-white">
                    <Icon icon="mdi:user" width={"100%"} className="text-[#374957]"></Icon>
                </div>
                <button 
                    className={"w-[50px] h-[50px] rounded-full p-2 "
                                .concat(btnState === "chat" ? 
                                "bg-white text-[#374957]"
                                :
                                "bg-transparent text-white hover:bg-white hover:text-[#374957]"
                                )}
                    onClick={(e) => handleOnClick("chat")}>
                    <Icon icon="lets-icons:chat-fill" width={"100%"} className=""></Icon>
                </button>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button 
                    className={"w-[50px] h-[50px] rounded-full p-2 "
                                .concat(
                                    btnState === "setting" ? 
                                    "bg-white text-[#374957]"
                                    :
                                    "bg-transparent text-white hover:bg-white hover:text-[#374957]"
                                )} 
                    onClick={(e) => handleOnClick("setting")}>
                    <Icon icon="mingcute:settings-1-fill" width={"100%"} className=""></Icon>
                </button>
                <button 
                    className={"w-[50px] h-[50px] rounded-full p-2 "
                                .concat(btnState === "logout" ? 
                                "bg-white text-[#374957]"
                                :
                                "bg-transparent text-white hover:bg-white hover:text-[#374957]"
                                )}
                    onClick={((e) => {
                            handleOnClick("logout")
                            handleLogout();
                        })}>
                    <Icon icon="solar:logout-2-bold" width={"100%"} className=""></Icon>
                </button>
            </div>
        </aside>
    )
}