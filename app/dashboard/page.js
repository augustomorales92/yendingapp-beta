'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className='text-primary px-12 py-16 md:py-6 min-h-screen'>Loading...</div>;
  }

  if (!session) {
    return <div className='text-primary px-12 py-16 md:py-6 min-h-screeno'>Please sign in to access the dashboard.</div>;
  }


  return (
    <div className='px-12 py-16 md:py-6 min-h-screen'>
      <div className=' gap-3'>
        <div className='text-primary'>
         
        </div>
      </div>
    </div>

  )
}