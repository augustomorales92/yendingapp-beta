'use client'

import Header from "@/components/Header";
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
    <div>
      <Header minimal={false} />
      <div className="w-screen h-screen fixed p-5">
        <div className="mt-1">
          <h1 className="text-secondary text-3xl font-bold ">Swipe Right</h1>
          <button className="btn-primary" onClick={handleClick}>
            {session ? 'Singout' : "Let's start"}
          </button>

        </div>
        <div>
          Hola <span className="font-bold">{session?.user?.name}</span>
        </div>
      </div>
    </div>

  );
}
