import GroupBtn from '@/components/buttons/GroupBtn'
import PreviaCard from '@/components/cards/PreviaCard'
import { CardsSkeleton } from '@/components/skeletons/CardSkeleton'
import { getSortedPrevias } from '@/lib/utils'
import { Suspense } from 'react'

const fetchData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/previas`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario')
    }
    const data = await response.json()
    return data.previas
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export default async function Page({
  searchParams
}: {
  searchParams: { sortCriteria: string }
}) {
  const previas = await fetchData()

  const sortedPrevias = await getSortedPrevias({ previas, sortCriteria: searchParams.sortCriteria })

  return (
    <Suspense fallback={<CardsSkeleton />}>
      <div className="px-12 py-16 md:py-6 min-h-screen">
        <div>
          <GroupBtn />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sortedPrevias?.map((previa, index) => (
            <div className="col-span-3 lg:col-span-1" key={index}>
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
          ))}
        </div>
      </div>
    </Suspense>
  )
}
