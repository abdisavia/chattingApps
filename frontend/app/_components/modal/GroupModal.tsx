"use client"
import { useRef, useEffect, useState, ChangeEvent, SyntheticEvent } from "react"
import { getSession } from "../../_lib/cookie";
import { createRoom } from "../../_lib/roomActions";
import { ParticipantType, roomType } from "../../_lib/definitions";
import { useRouter } from "next/navigation";
import InputEmailAnggota from "../inputEmailAnggota.";

type messages = {
    nama_room?:string,
    jumlahAnggota?: string,
    emailAnggota?: string,
    duplicateEmail?: boolean[],
}

export default function GroupModal({closeModal}:{closeModal:() => void}) {
    const timer = useRef<NodeJS.Timeout>(null);
    const participantInputRef = useRef<(HTMLInputElement|null)[]>([]);
    const [participants, setParticipants] = useState<ParticipantType[]|null>([])
    const [participantCount,setParticipantCount] = useState<number|null>(null);
    const [message,setMessage] = useState<messages|null>(null)
    const router = useRouter();

    useEffect(() => {
        if(!participantCount) return setMessage((prev) => ({
            ...prev,
            jumlahAnggota:"Jumlah anggota belum diatur"
        }));
        setParticipants(Array<ParticipantType>(participantCount).fill({
            email:"",
            err:""
        }));
    },[participantCount])

    useEffect(() => {
       checkDuplicate()
    },[participants])

    useEffect(() => {
        console.log(Object.keys(message || {}).length === 0);
        console.log(participants)
        console.log((participants?.every(val => val.err === null) && Object.keys(message || {}).length === 0));
    },[message])

    const handleCountOnChange = (e:ChangeEvent) => {
        const target = e.target as typeof e.target & { 
            value:Number
         }
        const count = Number(target.value) 
         console.log(message);
        if(count > 50 || count < 2) {
            console.log("more than 50 or less than 2")
            if(timer.current)   clearTimeout(timer.current);
            setParticipantCount(0);
            setParticipants(null);
            return setMessage({
                ...message,
                jumlahAnggota:"harus lebih dari 1 atau kurang dari 50"
            });
        }
        if(timer.current) clearTimeout(timer.current);
         
        const currentTimer = setTimeout( () => {
            setParticipantCount(count); 
            setMessage(prev => {
                const newValue = { ...prev };
                delete newValue.jumlahAnggota;
                return newValue;
            });
            timer.current = null;
           }, 800);
        timer.current = currentTimer;
    }

    const handleOnSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();
        console.log("executed");
        const form = e.target as HTMLFormElement;
        const room_name = (form.room_name as HTMLInputElement).value;
        if(!participants) {
            return setMessage({
                ...message,
                emailAnggota:"Email anggota masih kosong"
            })
        } 
        
        if(!participants?.every(val => val.err === null)){
            return setMessage({
                ...message,
                emailAnggota:"Masih terdapat email yang tidak ditemukan"
            })
        }
        
        const data:roomType = {
            room_name: room_name,
            participants: participants.filter(val => val.email !== "").map(val => val.email),
            type: "group"
        }

        let result;
        try{
            const token = await getSession();
            if(!token)throw new Error("Token doesn't Exist");
            result = await createRoom(token, data);
            console.log(result);
            result = result.data;
        }catch(e:any){
            console.log(e.message);
            return;
        }
        closeModal();
        router.refresh();
    }   

    const onChangeInputMembers = (data:ParticipantType, idx:number) => {
        if(!participantCount) return setMessage((prev) => ({
            ...prev,
            jumlahAnggota:"Jumlah anggota belum diatur"
        }));
        setParticipants((prev) => {
            if(!prev) return Array<ParticipantType>(participantCount).fill({
                email:"",
                err:""
            });

            const copy = [...prev];
            copy[idx] = data;
            return copy;
        })
    }

    const checkDuplicate = () => {
        if(!participants)return -1;
        const uniqueValue = new Map<string, number>();
        let indexDuplicate: number | null = null;

        participants.forEach((val, idx) => {
            if (!val?.email) return -1;
            if (uniqueValue.has(val.email)) {
                indexDuplicate = idx;
            } else {
                uniqueValue.set(val.email, idx);
            }
        });

        if (indexDuplicate !== null && participantInputRef.current && participantInputRef.current[indexDuplicate]) {
            participantInputRef.current[indexDuplicate]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            setMessage((prev) => ({
                ...prev,
                duplicateEmail: participants.map((_, i) => i === indexDuplicate)
            }));
            return indexDuplicate;
        } else {
            setMessage((prev) => {
                const newValue = { ...prev };
                delete newValue.duplicateEmail;
                return newValue;    
            });
            return -1;
        }
    }

    return (
        <form className="flex flex-col justify-center gap-5 h-full px-2" onSubmit={handleOnSubmit}>
            <div className="flex gap-5">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="room_name" className="text-sm">Nama Room</label>
                    <input type="text" name="room_name" className="w-full border-b text-md p-2" placeholder="masukkan nama room"/>
                </div>
                <div className="flex flex-col gap-1 w-[150px]">
                    <label htmlFor="count" className="text-sm">Jumlah anggota</label>
                    <input type="number" name="count" className="w-[150px] border-b text-md p-2" min={0} onChange={handleCountOnChange}/>
                    <small className="text-red-500 text-xs">{message && message.jumlahAnggota}</small>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Email Anggota</p>
                    {
                        message?.duplicateEmail ? <small className="text-red-500 text-xs">{message.duplicateEmail}</small> : ""
                    }
                    <ul className="list-disc px-10 max-h-[200px] overflow-y-auto">
                        {
                            participants && participants.map((val,idx) => {
                                return (
                                    <li className="mt-2" key={idx}>
                                        <InputEmailAnggota 
                                            name={`participant_${idx}`}
                                            onChange={ (data:ParticipantType) => onChangeInputMembers(data,idx) }
                                            isDuplicate={message?.duplicateEmail ? message.duplicateEmail[idx]: false}
                                            ref={(el) => { participantInputRef.current![idx] = el }}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="flex gap-2 justify-end">
                <button type="button" className="border px-2 py-1 rounded-md border border-red-500 text-red-500">Tutup</button>
                <button type="submit" className={"border px-2 py-1 rounded-md text-white font-semibold ".concat((participants?.every(val => val.err === null) && Object.keys(message || {}).length === 0) ? "bg-green-500" : "bg-gray-500")} disabled={ !(participants?.every(val => val.err === null) && Object.keys(message || {}).length === 0) }>Buat</button>                
            </div>
        </form>
    )
}