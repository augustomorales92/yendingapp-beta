'use client'

import Navbar from "@/components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function Home() {

  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // si hay token, el boton actua como sign out, sino como sign in
    if (session) {
      await signOut();
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }


  return (
    <>
      <Navbar />
      <div className=" h-screen p-12 flex flex-col min-h-screen">
        <div className="m-auto gap-3">
          <h1 className="text-secondary text-5xl font-bold ">Swipe Right</h1>
          <button
            className={`btn-secondary my-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : session ? 'Sign Out' : "Let's Start"}
          </button>
        </div>

      </div>
    </>

  );
}
