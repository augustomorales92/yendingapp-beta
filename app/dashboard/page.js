'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className='text-primary flex justify-center align-center'>Loading...</div>;
  }

  if (!session) {
    return <div className='text-primary flex justify-center'>Please sign in to access the dashboard.</div>;
  }


  return (
    <div className='px-12 py-24 flex flex-col min-h-screen'>
      <div className=' gap-3'>
        <div className='text-black'>
          Hola <span className="font-bold text-black">{session?.user?.email}</span>
        </div>
      </div>
    </div>

  )
}