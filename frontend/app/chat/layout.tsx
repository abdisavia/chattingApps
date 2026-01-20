"use client";
import UserProvider from "@/app/_lib/userContext";
import ModalCreateRoom from "../_components/modal";
// import RoomList from "@/app/_components/roomlist";
import { useState } from "react";
import dynamic from "next/dynamic";
import GroupModal from "@/app/_components/modal/GroupModal";
import PersonalModal from "../_components/modal/PersonalModal";

const Sidebar = dynamic(() => import("@/app/_components/sidebar") )
const RoomList = dynamic(() => import("@/app/_components/roomlist"),{
    ssr:false
});

type ModalType = "group" | "personal"

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
                <Sidebar />
                <RoomList openModal={handleOpenModal}/>
                { children }
                {
                    modalState &&  (
                        <ModalCreateRoom closeModal={handleCloseModal}>
                            { modalState === "group" ? <GroupModal closeModal={handleCloseModal}/> : <PersonalModal closeModal={handleCloseModal}/> }
                        </ModalCreateRoom>
                 )
                }
            </UserProvider>
        </div>
    )
}