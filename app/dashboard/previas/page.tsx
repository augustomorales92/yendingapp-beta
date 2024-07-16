'use client'
import CreateNew from '@/components/cards/CreateNew'
import MyPreviasReq from '@/components/cards/MyPreviasReq';
import PreviasJoinRequests from '@/components/cards/PreviasJoinRequests';
import SeeMyPrevias from '@/components/cards/SeeMyPrevias';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function Page() {

  const { data: session, status } = useSession();
 
  if (status === "loading") {
    return <div className='text-secondary px-12 py-16 md:py-6 min-h-screen'>Loading...</div>;
  }

  if (!session) {
    return <div className='text-secondary px-12 py-16 md:py-6 min-h-screen'>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className='px-12 py-16 md:py-6 min-h-screen'>
      <div className='flex flex-wrap justify-center items-center gap-3'>
        <CreateNew/>
        <SeeMyPrevias/>
        <MyPreviasReq/>
        <PreviasJoinRequests/>
      </div>

    </div>
  )
}
