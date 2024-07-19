import { auth } from '@/auth'
import { Previas } from '@/types/data'
import { isBefore, isSameDay, format, compareAsc } from 'date-fns'
import { es } from 'date-fns/locale'
import {today} from '@/lib/constants'

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
  previas?: Previas[]
  sortCriteria?: string
}

const previaValidation = async ({ previas }: SortedPrevias) => {
  const session = await auth()
  return (previas || [])?.filter(
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
}

const parseDates = (date: string | number | Date) => new Date(date)

// Ordenar validPrevias según el previas de ordenación
export const getSortedPrevias = async ({
  previas,
  sortCriteria = 'date'
}: SortedPrevias) => {
  const validPrevias = await previaValidation({ previas })

  return [...validPrevias]?.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = parseDates(a.date)
      const dateB = parseDates(b.date)
      return compareAsc(dateA, dateB)
    } else if (sortCriteria === 'participants') {
      return b.participants - a.participants
    }
    return 0
  })
}

type FormattedDate = {
  date?: Date | string | number
  inputDate: Date

}
export const formattedDate = ({date, inputDate}: FormattedDate) => isSameDay(today, inputDate)
? 'Today'
: format(date as Date, "EEEE d 'de' MMMM", { locale: es });

export const sanitizeImages = (images?: string[]) => images?.filter(image => image)