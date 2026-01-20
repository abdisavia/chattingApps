import React, { Suspense } from "react";
import { Icon } from "@iconify/react";
import Loading from "./loading";

export default function layout({children}:{children:React.ReactNode}) {
    return (
        <Suspense fallback={<Loading/>}>
            <div className="relative h-screen flex jusitfy-items-center p-2  bg-end bg-cover bg-[url(/img/sebastian-pichler-8CCQ-55MTUw-unsplash.jpg)]">
                <div className="w-full z-10 px-10 py-5 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                        <Icon icon="iconoir:multi-bubble-solid" width={30} height={30} className="text-white" />
                        <h1 className="text-2xl text-white font-bold">Chat's</h1>
                    </div>
                    <div className="w-125">
                        <h1 className="font-bold text-2xl text-white mb-2">Terhubung. Dimanapun. Kapanpun.</h1>
                        <p className="text-sm text-white">Berkomunikasi dengan lancar menggunakan pesan instan yang cepat, aman, dan andal di semua perangkat Anda.</p>
                    </div>
                </div>
                {children}
                <div className="absolute top-0 left-0 w-screen h-screen border bg-black/40 z-0"></div>
            </div>
        </Suspense>
    )
}