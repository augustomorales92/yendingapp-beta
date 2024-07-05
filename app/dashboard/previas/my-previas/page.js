'use client'
import GroupBtnMyPrev from '@/components/buttons/GroupBtnMyPrev';
import MyPreviasCard from '@/components/cards/MyPreviasCard';
import { compareAsc, parseISO } from 'date-fns';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';

export default function page() {

    const { data: session } = useSession();
    const [previas, setPrevias] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('date'); // date or participants


    const fetchData = async () => {
        setIsLoading(true)

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
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const myPrevias = previas?.filter((previa) => session?.user?.email === previa.creator);

    // Ordenar validPrevias según el criterio de ordenación
    const sortedMyPrevias = myPrevias?.sort((a, b) => {
        if (sortCriteria === 'date') {
            const dateA = parseISO(a.date);
            const dateB = parseISO(b.date);
            return compareAsc(dateA, dateB);
        } else if (sortCriteria === 'participants') {
            return b.participants - a.participants;
        }
        return 0;
    });

    return (
        <div className='px-12 py-16 md:py-6 min-h-screen'>
            <div>
                <GroupBtnMyPrev setSortCriteria={setSortCriteria} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {isLoading ? (
                    <div className='col-span-3'><ClipLoader color='white' size={50} /></div>
                ) : (
                    sortedMyPrevias?.map((previa, index) => (
                        <div className='col-span-3 lg:col-span-1' key={index}>
                            <MyPreviasCard
                                previa_id={previa.previa_id}
                                location={previa.location}
                                date={previa.date}
                                join_requests={previa.join_requests}
                                startTime={previa.startTime}
                                participants={previa.participants}
                                place_details={previa.place_details}
                                images_previa_url={previa.images_previa_url}
                                description={previa.description}
                                fetchData={fetchData}
                            />
                        </div>
                    ))
                )}
            </div>
            {myPrevias?.length === 0 ? <div className='text-md text-secondary md:text-xl'>You haven't created any Previa yet </div> : ""}
        </div>
    )
}
