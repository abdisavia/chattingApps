import { Icon } from "@iconify/react"
export default function Loading() {
    return (
        <section className="w-screen h-screen relative flex flex-row justify-center items-center">
            <Icon icon="mingcute:loading-fill" className="animate-spin w-52 h-52"/>
            <h1>Loading...</h1>
        </section>
    )
}