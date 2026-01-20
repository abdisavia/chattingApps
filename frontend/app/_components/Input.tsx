"use client"
import { useRef, useState } from "react";

export default function LabelInput({name, type, placeHolder}:{name:string, type:string, placeHolder:string}) {
    return (
        <div>
            <label htmlFor={name} className="block">{name}</label>
            <input
                type={type}
                name={name}
                className="w-full py-2 px-3 border-b rounded-md"
                placeholder={placeHolder}
                required />
        </div>
    )
}