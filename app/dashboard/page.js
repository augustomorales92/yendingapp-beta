'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function page() {

  const { data: session, status } = useSession();
  console.log(session)

  if (status === "loading") {
    return <div className='text-black'>Loading...</div>;
  }

  if (!session) {
    return <div className='text-black'>Please sign in to access the dashboard.</div>;
  }


  return (
    <div>
      <div className='text-black'>
        Hola <span className="font-bold text-black">{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 rounded-lg text-white font-bold px-6 py-2"
      >
        Log Out
      </button>

    </div>

  )
}