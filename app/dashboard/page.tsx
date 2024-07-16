'use client'

import GroupBtn from '@/components/buttons/GroupBtn';
import PreviaCard from '@/components/cards/PreviaCard';
import { isBefore, isSameDay, parseISO, compareAsc } from 'date-fns';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react';



export default function Page() {

  const { data: session, status } = useSession();
  const [previas, setPrevias] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [sortCriteria, setSortCriteria] = useState('date'); // date or participants

  const fetchData = async () => {
    setLoadingData(true)

    try {
      const response = await fetch(`/api/previas`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario');
      }
      const data = await response.json();
      setPrevias(data.previas)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingData(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // PRIMERO me aseguro que las previas no esten vencidas y que no sean del creador para filtrar 
  const today = new Date();
  
  const validPrevias = (previas || []).filter((previa) => {
    const previaDate = new Date(previa.date);
    const isSameDayToday = isSameDay(previaDate, today);
    const isExpired = isBefore(previaDate, today);
    const isCreator = session?.user?.email === previa.creator;
    return (!isExpired || isSameDayToday) && !isCreator;
  });

  // Ordenar validPrevias según el criterio de ordenación
  const sortedPrevias = [...validPrevias]?.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = parseISO(a.date);
      const dateB = parseISO(b.date);
      return compareAsc(dateA, dateB);
    } else if (sortCriteria === 'participants') {
      return b.participants - a.participants;
    }
    return 0;
  });


  if (status === "loading") {
    return <div className='text-secondary px-12 py-16 md:py-6 min-h-screen'>Loading...</div>;
  }

  if (!session) {
    return <div className='text-secondary px-12 py-16 md:py-6 min-h-screen'>Please sign in to access the dashboard.</div>;
  }


  return (
    <div className='px-12 py-16 md:py-6 min-h-screen'>
      <div>
        <GroupBtn setSortCriteria={setSortCriteria} />
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {loadingData ? (
          <p className='text-secondary'>Loading...</p>
        ) : (
          sortedPrevias?.map((previa, index) => (
            <div className='col-span-3 lg:col-span-1' key={index}>
              <PreviaCard
                previa_id={previa.previa_id}
                location={previa.location}
                creator={previa.creator}
                date={previa.date}
                startTime={previa.startTime}
                participants={previa.participants}
                place_details={previa.place_details}
                images_previa_url={previa.images_previa_url}
                description={previa.description}
              />
            </div>
          ))
        )}

      </div>
    </div>
  )
}