"use client";
import LabelInput from "@/app/_components/Input";
import { Icon } from "@iconify/react";
import { useActionState } from "react";
import { signUp } from "./action";

export default function Signup() {
    const [state, action, pending] = useActionState(signUp, null);

    return (
        <form
            className="py-10 px-15 rounded-xl w-200 flex flex-col gap-5 h-auto justify-center bg-white z-20"
            action={action}
        >
            <div>
                <h1 className="font-bold text-3xl">Selamat Datang!</h1>
                <p className="mt-2">Lakukan registrasi untuk mulai berkirim pesan</p>
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
            <div className="flex flex-col gap-2">
                <LabelInput name="confirmPassword" type="password" placeHolder="Masukkan konfirmasi passwordmu disini" />
                {state?.password && state.password.map((val,idx:number) => <p key={idx} className="text-red-500">{ val }</p>) }
            </div>
            <div className="flex flex-col gap-2">
                <LabelInput name="name" type="text" placeHolder="Masukkan namamu disini"/>
                {state?.name && state.name.map((val, idx) => <p key={idx} className="text-red-500">{ val }</p>) }
            </div>
            <button type="submit" className="bg-black py-3 px-5 text-white rounded-full disabled:bg-gray-500" disabled={pending}>
                {pending ? (
                    <span className="flex justify-center items-center gap-2">
                        <Icon icon="mingcute:loading-fill" className="animate-spin" />
                        <p>loading...</p>
                    </span>
                ) : "Login"}
            </button>           
            <div className="flex justify-center items-center text-sm text-gray-500 gap-1">
                <p>sudah punya akun?</p>
                <a href="/signin">Login disini</a>
            </div>
        </form>
    )
}