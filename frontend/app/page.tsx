// import Signin from "./auth/Signin/page";
"use client"
import { destroySession } from "@/app/_lib/cookie";
import { SyntheticEvent } from "react";

export default function Home() {
 

  const handleLogout = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await destroySession();
      return;
    } catch (e:any) {
      console.log(e.message)
    }
  }

  return (
    <button type="button" onClick={ handleLogout }>Logout</button>
  );
}
