import GroupBtn from '@/components/buttons/GroupBtn'
//import PreviaCard from '@/components/cards/PreviaCard'
import { getSortedPrevias } from '@/lib/utils'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { getPrevias } from '@/services/previas'
import NewPreviaCard from '@/components/cards/NewPreviaCard'

async function DashboardContent({
  searchParams
}: {
  searchParams: { sortCriteria: string }
}) {
  const previas = await getPrevias()
  const sortedPrevias = await getSortedPrevias({
    previas,
    sortCriteria: searchParams.sortCriteria
  })

  return (
    <div className="px-4 py-16 md:py-6 min-h-screen">
      <div>
        <GroupBtn />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 
        {sortedPrevias?.map((previa, index) => (
            <div className="" key={index}> */}
        {/*  <PreviaCard
              previa_id={previa?.previa_id}
              location={previa.location}
              creator={previa?.creator}
              date={previa.date}
              startTime={previa.startTime}
              participants={previa.participants}
              place_details={previa.place_details}
              images_previa_url={previa.images_previa_url}
              description={previa.description}
            /> 
            <NewPreviaCard
            index={index}
            previa_id={previa?.previa_id}
            location={previa.location}
            creator={previa?.creator}
            date={previa.date}
            startTime={previa.startTime}
            participants={previa.participants}
            place_details={previa.place_details}
            images_previa_url={previa.images_previa_url}
            description={previa.description}
            />
            </div> 
          ))}
          */}

        {/*   <PreviaCard
          previa_id={previas?.[0]?.previa_id}
          location={previas?.[0].location}
          creator={previas?.[0]?.creator}
          date={previas?.[0].date}
          startTime={previas?.[0].startTime}
          participants={previas?.[0].participants}
          place_details={previas?.[0].place_details}
          images_previa_url={previas?.[0].images_previa_url}
          description={previas?.[0].description}
        /> */}

        {sortedPrevias.length ? (
          sortedPrevias?.map((previa, index) => (
            <div key={index} className="flex justify-center items-center ">
              <NewPreviaCard
                previa_id={previa?.previa_id}
                location={previa?.location}
                creator={previa?.creator}
                date={previa.date}
                startTime={previa.startTime}
                participants={previa.participants}
                place_details={previa.place_details}
                images_previa_url={previa?.images_previa_url}
                description={previa.description}
              />
            </div>
          ))
        ) : (
          <div className="text-md text-secondary md:text-xl">
            {`No Previas available nearby`}{' '}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Page({
  searchParams
}: {
  searchParams: { sortCriteria: string }
}) {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  )
}
