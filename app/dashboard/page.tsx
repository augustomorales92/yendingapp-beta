import { auth } from '@/auth'
import GroupBtn from '@/components/buttons/GroupBtn'
import PreviaCard from '@/components/cards/PreviaCard'
import { isBefore, isSameDay, parseISO, compareAsc } from 'date-fns'

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
  searchParams,
}: {
  searchParams: { sortCriteria: string };
}) {
  const session = await auth()
  const previas = await fetchData()

  // PRIMERO me aseguro que las previas no esten vencidas y que no sean del creador para filtrar
  const today = new Date()
  const sortCriteria = 'date'
  const validPrevias = (previas || []).filter((previa: { date: string | number | Date; creator: string | null | undefined }) => {
    const previaDate = new Date(previa.date)
    const isSameDayToday = isSameDay(previaDate, today)
    const isExpired = isBefore(previaDate, today)
    const isCreator = session?.user?.email === previa.creator
    return (!isExpired || isSameDayToday) && !isCreator
  })

  // Ordenar validPrevias según el criterio de ordenación
  const sortedPrevias = [...validPrevias]?.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = parseISO(a.date)
      const dateB = parseISO(b.date)
      return compareAsc(dateA, dateB)
    } else if (sortCriteria === 'participants') {
      return b.participants - a.participants
    }
    return 0
  })

 /*  if (status === 'loading') {
    return (
      <div className="text-secondary px-12 py-16 md:py-6 min-h-screen">
        Loading...
      </div>
    )
  } */

  if (!session) {
    return (
      <div className="text-secondary px-12 py-16 md:py-6 min-h-screen">
        Please sign in to access the dashboard.
      </div>
    )
  }

  return (
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
  )
}
