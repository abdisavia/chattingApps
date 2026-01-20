import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
    return ( 
        <div className="flex flex-row gap-5 h-screen justify-center items-center">
            <img src="/img/2456051-removebg-preview.png" alt="" width={200} height={200} />
            <div className="flex flex-col justify-start items-start gap-5">
                <p className="text-3xl max-w-52">Halaman tidak ditemukan</p>
                <a href="/"
                    className="text-white bg-black rounded-full py-2 px-3 w-full text-center hover:bg-black/50 transition-color duration-75">
                    Kembali</a>
            </div>
        </div>
     )
}