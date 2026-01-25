"use client"
import { Icon } from "@iconify/react"
import { useState,useEffect, useRef, useContext } from "react"
import InputEmailAnggota from "../inputEmailAnggota.";
import { ParticipantType, roomType } from "@/app/_lib/definitions";
import { getUserByEmail } from "@/app/_lib/userActions";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/_lib/roomActions";
import { getSession } from "@/app/_lib/cookie";
import { UserContext } from "@/app/_lib/userContext";


export default function PersonalModal({closeModal}:{closeModal:() => void}) {
    const userContext = useContext(UserContext);
    const memberRef = useRef<HTMLInputElement|null>(null);
    const [userData, setUserData] = useState<ParticipantType|null>({
        email:"",
        err:null
    })
    const [message, setMessage] = useState<string|null>(null);
    const router = useRouter();

    const changeUserStatus = (data:ParticipantType) => {
        setUserData(data);
    }

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();

        if(userData === null) return setMessage("Data tidak valid");

        if(userData.err !== null || userData.email === "") {
            return setMessage("Data tidak valid");
        }

        const userName = await getUserByEmail(userData.email);
        
        if(userName?.error == "UNAUTHORIZE") {
            return router.replace("/signin");
        }

        const data:roomType = {
            participants: [userData.email],
            type: "personal"
        }

        try{   
            const token = await getSession();
            if(!token) return router.replace("/signin");

            const result = await createRoom(token,data);
            console.log(result);

            if(result.error == "UNAUTHORIZE") {
                setUserData(null);
                return router.replace("/signin");
            }

            if(result.error){
                return setMessage(result.error);
            }

            if(!userContext) throw new Error("User context not found");
            else if (!userContext.socket) throw new Error("Socket not found in user context");
            else userContext.socket.emit("join_room", result.id);

        }catch(e:any){
            setMessage(e.message);
            return; 
        }
        clearAll();
        closeModal();
        return router.refresh();
    }

    const clearAll = () => {
        setUserData({
            email:"",
            err:null
        });
        setMessage(null);
        if(memberRef.current) memberRef.current.value = "";
    }

    return (
        <form className="flex flex-col justify-end" onSubmit={handleSubmit}>
            <InputEmailAnggota  name="email" onChange={changeUserStatus} ref={memberRef}/>
            <div>
                {message && <p className="text-red-500 text-sm">{message}</p>}
            </div>
            <div className="flex gap-2 justify-end">
                <button type="button" className="border px-2 py-1 rounded-md border border-red-500 hover:bg-red-500 hover:text-white text-red-500 cursor-pointer" >Tutup</button>
                <button type="submit" className={"border px-2 py-1 rounded-md text-white font-semibold ".concat((userData?.email === "" || userData?.err !== null)? "bg-gray-500" :  "cursor-pointer bg-green-700")} disabled={(userData?.email === "" || userData?.err !== null)}>Buat</button>
            </div>
        </form>
    )
}