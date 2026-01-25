import z from "zod";

export const loginSchema = z.object({
    email: z.email("Format email salah"),
    password: z.string().max(12, "Password maksimal 12 huruf"),
})

export const regisSchema = z.object({
    email: z.email("Format email salah"),
    password: z.string().min(8, "Password minimal 8 huruf").max(12, "Password maksimal 8 huruf"),
    konfPassword: z.string().min(8, "Password minimal 8 huruf").max(12, "Password maksimal 8 huruf"),
    name: z.string().min(2,"Nama minimal 2 huruf").max(12, "Nama maksimal 12 huruf")
}).refine((data) => data.password === data.konfPassword, {
    message: "Konfirmasi & Password harus sama",
    path: ["konfPassword"]
})

export type userData = {
    id: number,
    name: string,
    role: string
}

export type roomType = {
    id?: number,
    room_name?:string|null,
    participants: string[],
    type?:string
}

export type ParticipantType = {
    email:string,
    err:string|null
}