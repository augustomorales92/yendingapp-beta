import GroupBtn from '@/components/buttons/GroupBtn'
import PreviaCard from '@/components/cards/PreviaCard'
import { getSortedPrevias } from '@/lib/utils'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { getPrevias } from '@/services/previas'

export default async function Page({
  searchParams
}: {
  searchParams: { sortCriteria: string }
}) {
  const previas = await getPrevias()

  const sortedPrevias = await getSortedPrevias({ previas, sortCriteria: searchParams.sortCriteria })

  return (
    <Suspense fallback={<Loader />}>
      <div className="px-12 py-16 md:py-6 min-h-screen">
        <div>
          <GroupBtn />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sortedPrevias?.map((previa, index) => (
            <div className="col-span-3 lg:col-span-1" key={index}>
              <PreviaCard
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
        </div>
      </div>
      </Suspense>
  )
}
