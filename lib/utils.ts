import { Previas } from '@/types/data'
import { isBefore, isSameDay, parseISO, compareAsc } from 'date-fns'
import { Session } from 'next-auth'

interface calculateAge {
  dob_day: string
  dob_month: string
  dob_year: string
}

export function calculateAge({ dob_day, dob_month, dob_year }: calculateAge) {
  const day = parseInt(dob_day)
  const month = parseInt(dob_month) - 1
  const year = parseInt(dob_year)

  const birthDate = new Date(year, month, day)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

type SortedPrevias = {
  previas: Previas[]
  session: Session | null
  sortCriteria?: string
}
const today = new Date()

const previaValidation = ({ previas, session}: SortedPrevias) =>
  previas?.filter(
    (previa: {
      date: string | number | Date
      creator: string | null | undefined
    }) => {
      const previaDate = new Date(previa.date)
      const isSameDayToday = isSameDay(previaDate, today)
      const isExpired = isBefore(previaDate, today)
      const isCreator = session?.user?.email === previa.creator
      return (!isExpired || isSameDayToday) && !isCreator
    }
  )

// Ordenar validPrevias según el previas de ordenación
export const getSortedPrevias = ({ previas, session, sortCriteria = 'date'  }: SortedPrevias) => {
  const validPrevias = previaValidation({ previas, session })
  return [...validPrevias]?.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = a.date
      const dateB = b.date
      return compareAsc(dateA, dateB)
    } else if (sortCriteria === 'participants') {
      return b.participants - a.participants
    }
    return 0
  })
}
