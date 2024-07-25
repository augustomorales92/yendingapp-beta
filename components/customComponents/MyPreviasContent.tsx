'use client'

import { deletePrevia } from '@/lib/actions'
import { editDisabled, handleQueryParams } from '@/lib/utils'
import Swal from 'sweetalert2'
import EditPreviaModal from '../forms/EditPreviaModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface PreviaCardProps {
    previa_id?: string
    location?: string
    date?: Date
    startTime?: string
    participants?: string
    place_details?: string
    images_previa_url?: string[] | string
    description?: string
    join_requests?: Object[]
    searchParams: { sortCriteria: string; modal: string }
  }
  
export const DeleteButton = ({ previa_id }: { previa_id?: string }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure to delete this Previa?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#394867',
      cancelButtonColor: '#9BA4B5',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePrevia(previa_id)
      }
    })
  }
  return (
    <button className="btn-primary" onClick={handleDelete}>
      Delete
    </button>
  )
}

export const EditButton = ({ date }: { date?: string | Date }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleModalOpen = () =>
    handleQueryParams({
      value: 'true',
      searchParams,
      pathname,
      replace,
      query: 'modal'
    })

  return (
    <button
      className={` ${editDisabled(date) ? 'btn-secondary' : 'btn-primary'}`}
      onClick={handleModalOpen}
      disabled={editDisabled(date)}
    >
      Edit
    </button>
  )
}

export const Modal = ({
  previa_id,
  location,
  date,
  startTime,
  participants,
  place_details,
  description,
  images_previa_url
}: Partial<PreviaCardProps>) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleModalClose = () =>
    handleQueryParams({
      searchParams,
      pathname,
      replace,
      query: 'modal'
    })

  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleQueryParams({
        searchParams,
        pathname,
        replace,
        query: 'modal'
      })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="p-6 rounded-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <EditPreviaModal
          previa={{
            previa_id,
            location,
            date,
            startTime,
            participants,
            place_details,
            description,
            images_previa_url
          }}
          onClose={handleModalClose}
        />
      </div>
    </div>
  )
}
