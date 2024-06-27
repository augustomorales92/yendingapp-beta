'use client'

import Navbar from "@/components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const { data: session } = useSession();

  const router = useRouter();

  const handleClick = () => {
    // si hay token, el boton actua como sign out, sino como sign in
    if (session) {
      signOut()
      return
    }
    router.push("/auth/login")
  }


  return (
    <>
      <Navbar />
      <div className=" h-screen p-12 flex flex-col min-h-screen">
        <div className="m-auto gap-3">
          <h1 className="text-primary text-5xl font-bold ">Swipe Right</h1>
          <button className="btn-primary my-3" onClick={handleClick}>
            {session ? 'Singout' : "Let's start"}
          </button>
        </div>

      </div>
    </>

  );
}
