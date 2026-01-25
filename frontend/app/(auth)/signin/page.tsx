"use client";
import { Icon } from "@iconify/react";
import LabelInput from "@/app/_components/Input";
import { useActionState } from "react";
import { signIn } from "./action";

export default function Signin() {
    const [state, action, pending] = useActionState(signIn, null);
    return (
        <form
            className="py-10 px-15 rounded-xl w-200 flex flex-col gap-5 h-auto justify-center bg-white z-20"
            action={action}
        >
            <div>
                <h1 className="font-bold text-3xl">Selamat Datang!</h1>
                <p className="mt-2">Segera Login untuk mulai berkirim pesan</p>
            </div>

            {
                state?.message && (
                    <div className="flex justify-center items-center bg-red-600 p-3 rounded-md">
                        <p className="text-white">{ state?.message }</p>
                    </div>
                )
            }

            <div className="flex flex-col gap-2">
                <LabelInput name="email" type="email" placeHolder="Masukkan emailmu disini"/>
                {state?.email && state.email.map((val, idx) => <p key={idx} className="text-red-500">{ val }</p>) }
                
            </div>
            <div className="flex flex-col gap-2">
                <LabelInput name="password" type="password" placeHolder="Masukkan passwordmu disini" />
                {state?.password && state.password.map((val,idx:number) => <p key={idx} className="text-red-500">{ val }</p>) }
            </div>
            <div className="flex justify-between">
                <div className="flex justify-center items-center gap-1">
                    <input type="checkbox" name="remember" id="" />
                    <label htmlFor="remember" className="text-sm text-gray-500">Ingat saya</label>
                </div>
                <a href="" className="text-sm text-gray-500">Lupa Password?</a>
            </div>
            <button type="submit" className="bg-black py-3 px-5 text-white rounded-full disabled:bg-gray-500" disabled={pending}>
                {pending ? (
                    <span className="flex justify-center items-center gap-2">
                        <Icon icon="mingcute:loading-fill" className="animate-spin" />
                        <p>loading...</p>
                    </span>
                ) : "Login"}
            </button>
            <div className="grid grid-cols-3 justify-center items-center">
                <hr className="border-b-[1.px] border-gray-500 w-full"/>
                <p className="text-sm text-gray-500 w-auto text-center">Atau gunakan akun</p>
                <hr className="border-b-[1.px] border-gray-500 w-full"/>
            </div>
            <a href="" className="text-center flex justify-center items-center gap-2 border border-gray-500 rounded-full py-3 font-semibold text-sm text-gray-500">
                <Icon icon="material-icon-theme:google" width={20} height={20} />
                Lanjutkan dengan Google
            </a>
            <div className="flex justify-center items-center text-sm text-gray-500 gap-1">
                <p>Belum punya akun?</p>
                <a href="/signup">Registrasi disini</a>
            </div>
        </form>
    )
}