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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
        {sortedPrevias.length ? (
          sortedPrevias?.map((previa, index) => (
            <div
              key={index}
              className="flex justify-center items-center transition-transform duration-300 ease-in-out"
            >
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
