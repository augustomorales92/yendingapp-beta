import GroupBtn from '@/components/buttons/GroupBtn';
import MyPreviasCard from '@/components/cards/MyPreviasCard';
import { getSortedPrevias } from '@/lib/utils';
import React, {Suspense} from 'react'
import Loader from '@/components/Loader';
import { getCreatedPrevias } from '@/services/previas';


type MyPreviasContentProps = {
    searchParams: { sortCriteria: string };

}

async function MyPreviasContent ({searchParams}:MyPreviasContentProps) {
    const previas = await getCreatedPrevias();
    const sortedPrevias = await getSortedPrevias({ previas, sortCriteria: searchParams.sortCriteria })
    return (
        <div className='px-12 py-16 md:py-6 min-h-screen'>
        <div>
            <GroupBtn />
        </div>
        <div className='grid grid-cols-3 gap-4'>
            {sortedPrevias?.map((previa, index) => (
                <div className='col-span-3 lg:col-span-1' key={index}>
                    <MyPreviasCard
                        previa_id={previa?.previa_id}
                        location={previa.location}
                        date={previa.date}
                        join_requests={previa?.join_requests}
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
    )

}


export default function Page({
    searchParams,
}: {
    searchParams: { sortCriteria: string };
}) {
 
    return (
        <Suspense fallback={<Loader />}>
            <MyPreviasContent searchParams={searchParams} />
        </Suspense>
    )
}
