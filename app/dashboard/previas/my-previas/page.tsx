import { auth } from '@/auth';
import GroupBtn from '@/components/buttons/GroupBtn';
import MyPreviasCard from '@/components/cards/MyPreviasCard';
import { compareAsc, parseISO } from 'date-fns';
import React from 'react'

const fetchData = async () => {

    try {
        // ruta que trae las previas creadas por el usuario logeado
        const response = await fetch(`/api/previas/myPrevias`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario');
        }
        const data = await response.json();
        return data.previas
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};


export default async function Page({
    searchParams,
}: {
    searchParams: { sortCriteria: string };
}) {

    const previas = await fetchData();
    const session = await auth();

    const sortCriteria = 'date'

    const sortedMyPrevias = [...previas]?.sort((a, b) => {
        if (sortCriteria === 'date') {
            const dateA = parseISO(a.date)
            const dateB = parseISO(b.date)
            return compareAsc(dateA, dateB)
        } else if (sortCriteria === 'participants') {
            return b.participants - a.participants
        }
        return 0
    })

    if (!session) {
        return (
            <div className="text-secondary px-12 py-16 md:py-6 min-h-screen">
                Please sign in to access the dashboard.
            </div>
        )
    }

    return (
        <div className='px-12 py-16 md:py-6 min-h-screen'>
            <div>
                <GroupBtn />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {sortedMyPrevias?.map((previa, index) => (
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
                ))}
            </div>
            {previas?.length === 0 ? <div className='text-md text-secondary md:text-xl'>{`You haven't created any Previa yet`} </div> : ""}
        </div>
    )
}
