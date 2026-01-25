"use client";
import { Icon } from "@iconify/react"

export default function ModalCreateRoom({closeModal, children}:{closeModal:Function, children:React.ReactNode}) {
    

    return(
        <div className="absolute w-full h-full bg-black/50 flex justify-center items-center">
            <div className="flex flex-col gap-2 w-[500px] h-auto bg-white rounded-xl p-5">
                <div className="pb-3 flex justify-between text-gray-500">
                    <h1 className="text-xl">Create Room</h1>
                    <button 
                    className="w-[25px] h-[25px] p-1 text-red-500 hover:bg-red-500 hover:text-white rounded-full"
                    type="button"
                    onClick={
                        (e) => {
                            e.preventDefault();
                            closeModal()
                        }
                        }>
                        <Icon icon="line-md:close" className="w-full"></Icon>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}