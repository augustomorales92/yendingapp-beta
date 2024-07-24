'use client'
import React from 'react'
import { FaSortNumericDownAlt } from 'react-icons/fa'
import { MdGroupAdd } from 'react-icons/md'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function GroupBtn() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (criteria: string | undefined) => {
    const params = new URLSearchParams(searchParams)
    if (criteria) {
      params.set('criteria', criteria)
    } else {
      params.delete('criteria')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex justify-end space-x-4 mb-4">
      <div className="hidden md:flex space-x-4">
        <div className="flex justify-flex items-center border rounded-md border-none gap-3">
          <button
            onClick={() => handleSearch('date')}
            className="flex text-xl text-primary hover:bg-secondary/80 rounded-md p-3  focus:bg-secondary/80 bg-secondary"
          >
            <FaSortNumericDownAlt />
            Sort by date
          </button>
          <button
            onClick={() => handleSearch('participants')}
            className="flex text-xl text-primary hover:bg-secondary/80 rounded-md p-3  focus:bg-secondary/80 bg-secondary"
          >
            <MdGroupAdd />
            Sort by participants
          </button>
        </div>
      </div>
      <div className="md:hidden w-full flex flex-col">
        <label className="text-secondary">Sort By</label>
        <select
          className="text-secondary"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSearch(e.target.value)
          }
        >
          <option value="date">Date</option>
          <option value="participants">Participants</option>
        </select>
      </div>
    </div>
  )
}
