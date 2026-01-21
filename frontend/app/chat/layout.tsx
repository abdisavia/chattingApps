"use client";
import React, { useState } from "react";
import UserProvider from "@/app/_lib/userContext";
import ModalCreateRoom from "../_components/modal";
import dynamic from "next/dynamic";
import GroupModal from "@/app/_components/modal/GroupModal";
import PersonalModal from "../_components/modal/PersonalModal";
import { roomType } from "../_lib/definitions";
import { RoomProvider } from "../_lib/roomContext";

const Sidebar = dynamic(() => import("@/app/_components/sidebar") )
const RoomList = dynamic(() => import("@/app/_components/roomlist"),{
    ssr:false
});

type ModalType = "group" | "personal"

type childProps = {
    data: number|null
}

export default function Layout({children}:{children:React.ReactNode}) {
    const [modalState, setModalState] = useState<ModalType|null>();
    const handleCloseModal = () => {
        setModalState(null);
        setModalState(null);
    }

    const handleOpenModal = (val:ModalType) => {
        setModalState(val);
    }
    return(
        <div className="relative flex">
            <UserProvider>
                <RoomProvider>
                    <Sidebar />
                    <RoomList openModal={handleOpenModal}/>
                    { 
                        children
                    }
                    {
                        modalState &&  (
                            <ModalCreateRoom closeModal={handleCloseModal}>
                                { modalState === "group" ? <GroupModal closeModal={handleCloseModal}/> : <PersonalModal closeModal={handleCloseModal}/> }
                            </ModalCreateRoom>
                        )
                    }
                 </RoomProvider>
            </UserProvider>
        </div>
    )
}