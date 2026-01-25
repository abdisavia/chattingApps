import { Icon } from "@iconify/react";
export default function Loading() {
    return (
        <div className="w-screen h-screen flex justify-center items-center gap-5">
            <Icon icon="mingcute:loading-fill" width={50} height={50} className="animate-spin"></Icon>
            <h1>Loading...</h1>
        </div>
    )
}