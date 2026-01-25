"use client"
import { Icon } from "@iconify/react"
import { useState, useRef, useEffect } from "react"
import { getUserByEmail } from "../_lib/userActions";
import { useRouter } from "next/navigation";

export default function InputEmailAnggota(
    {
        name, 
        onChange,
        isDuplicate,
        ref
    }
    :
    {
        name:string, 
        onChange:Function,
        isDuplicate?:boolean
        ref: React.RefCallback<HTMLInputElement|null> | React.RefObject<HTMLInputElement|null>;
    }
) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const timer = useRef<NodeJS.Timeout>(null)
    const [isUserExist, setIsUserExist] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const router = useRouter();

    const UserIcon = () => {
        if(isLoading){
            return (
                <div className={"w-auto h-full rounded-sm bg-gray-700 p-2"}>
                    <Icon icon={"mingcute:loading-fill"} className="w-full h-full text-white animate-spin"/>
                </div>
            )
        }else{
            return (
                <div className={"w-auto h-full rounded-sm ".concat((isUserExist&&!isDuplicate)?"bg-green-700":"bg-red-500")}>
                    <Icon icon={(isUserExist&&!isDuplicate)?"mdi:user-check":"mdi:user-block"} className="w-full h-full text-white"/>
                </div>
            )
        }
    }

    const debounceInput = (email:string) => {
        if(timer.current) clearTimeout(timer.current);
        setIsLoading(true);
        const currentTimer = setTimeout(async () => {
            try{
                const result = await getUserByEmail(email);
                
                setIsLoading(false);

                if(result?.error == "UNAUTHORIZE"){
                    return router.replace("/signin");
                }

                if(result.error) {
                    setIsUserExist(false);
                    setErrorMessage(result.error);
    
                    onChange({
                        email:email,
                        err:result.error
                    })
                    return;
                }
                
                setIsUserExist(true);
                setErrorMessage(null);
                
                onChange({
                    email:email,
                    err:null
                })
    
                return;
            }catch(e:any){
                console.log(e.message);
            }
        }, 800)
        timer.current = currentTimer;
        return;
    }

    useEffect(() => {
        console.log(ref);
    },[])

    const onInputChange = (e:React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const email = target.value;
        if(!email) return setErrorMessage("Email tidak boleh kosong");
        debounceInput(email);
    }

    const setDuplicateError = () => {
        setErrorMessage("Email ini sudah dimasukkan sebelumnya");
    }

    useEffect(() => {
        if(isDuplicate) setDuplicateError();
        else if(isUserExist) setErrorMessage(null);
    },[isDuplicate])

    return(
        <div className="flex flex-col gap-1 w-full">
            <p className="text-sm">Email</p>
            <div className="flex gap-2 items-center h-[40px]">
                <input 
                    type="email" 
                    name={name} 
                    className="w-full h-full border-b text-md p-2" 
                    placeholder="Masukkan Email" 
                    onChange={ onInputChange }
                    ref={ref}
                />
                <UserIcon/>
            </div>
            <small className={"text-sm ".concat(errorMessage?"text-red-500":"text-gray-500")}>{ errorMessage? errorMessage : "masukkan alamat email lawan bicaramu" }</small>
        </div>
    )
}