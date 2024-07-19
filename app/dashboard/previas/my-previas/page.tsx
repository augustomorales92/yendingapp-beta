import GroupBtn from '@/components/buttons/GroupBtn';
import MyPreviasCard from '@/components/cards/MyPreviasCard';
import { baseUrl } from '@/lib/constants';
import { getSortedPrevias } from '@/lib/utils';
import React, {Suspense} from 'react'
import Loader from '@/components/Loader';
import { auth } from '@/auth';
import { Previas } from '@/types/data';

const fetchData = async (): Promise<Previas[] |undefined> => {
    try {
        const session = await auth();

        // ruta que trae las previas creadas por el usuario logeado
        const response = await fetch(`${baseUrl}/api/previas/myPrevias`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: JSON.stringify(session),

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
    const sortedPrevias = await getSortedPrevias({ previas, sortCriteria: searchParams.sortCriteria })
    return (
        <Suspense fallback={<Loader />}>
        <div className='px-12 py-16 md:py-6 min-h-screen'>
            <div>
                <GroupBtn />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {sortedPrevias?.map((previa, index) => (
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
                        />
                    </div>
                ))}
            </div>
            {previas?.length === 0 ? <div className='text-md text-secondary md:text-xl'>{`You haven't created any Previa yet`} </div> : ""}
        </div>
        </Suspense>
    )
}
