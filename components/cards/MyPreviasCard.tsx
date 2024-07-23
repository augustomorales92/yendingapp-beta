'use client'

import { format, isBefore, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import EditPreviaModal from '../forms/EditPreviaModal'
import { BeatLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Creator, Previas } from '@/types/data'
import { revalidatePath } from 'next/cache'
import { today } from '@/lib/constants'
import Loader from '../Loader'
import { Suspense } from 'react'
import { sanitizeImages } from '@/lib/utils'
import { deletePrevia } from '@/lib/actions'
interface PreviaCardProps {
  previa_id?: string
  location?: string
  creator?: Creator
  date?: Date
  startTime?: string
  participants?: string
  place_details?: string
  images_previa_url?: string[] | string
  description?: string
  join_requests?: Object[]
}

export default function MyPreviasCard({
  previa_id,
  location,
  date,
  startTime,
  participants,
  place_details,
  description,
  images_previa_url,
  join_requests
}: PreviaCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Handle date event
  const inputDate = new Date(date as Date)
  const formattedDate = isSameDay(today, inputDate)
    ? 'Today'
    : isBefore(inputDate, today)
    ? 'Due'
    : format(inputDate, "EEEE d 'de' MMMM", { locale: es })

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const editDisabled = isBefore(inputDate, today)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Si el clic es en el fondo (no en el contenido del modal), cerrar el modal
  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleModalClose()
    }
  }

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure to delete this Previa?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#135D66',
      cancelButtonColor: '#77B0AA',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePrevia(previa_id)
        /*   
        try {
        const toastId = toast.loading('Deleting Previa...')
          const response = await fetch('/api/previa', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ previa_id })
          })
          const result = await response.json()
          if (response.ok) {
            console.log('Previa deleted:', result)
            toast.dismiss(toastId)
            //revalidatePath('/dashboard/previas/my-previas')
            setIsModalOpen(false)
            toast.success('Previa deleted!')
          } else {
            console.error('Error deleting previa:', result)
            toast.dismiss(toastId)
          }
        } catch (error) {
          console.error('Error:', error)
        } */
      }
    })
  }

  const images = sanitizeImages(images_previa_url)

  return (
    <Suspense fallback={<Loader />}>
      <div className=" bg-secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[24rem] h-[40rem]">
        <div className="flex justify-center">
          <Image
            width={300}
            height={600}
            src={images?.[0] || '/images/placeholder.jpg'}
            alt="image 1"
            className="rounded-t-lg h-80 w-auto flex items-center justify-center p-2 lg:h-64"
          />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 ">
            <p className="text-secondary">
              {location} - {place_details}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 ">
            <p
              className={`mt-3 ${
                formattedDate === 'Due' ? 'text-red-500' : 'text-primary_b'
              }`}
            >
              {formattedDate}
            </p>
            <p className="mt-3 text-primary_b">At: {startTime}</p>
          </div>
          <p className="mt-3 font-normal text-primary_b">{description}</p>
          <p className="mt-3 text-primary_b">Participants: {participants}</p>
          <p className="mt-3 text-primary_b">
            Requests: {join_requests?.length}
          </p>

          <div className="flex flex-row justify-between mt-3 items-center">
            <div className="flex items-center gap-2">
              <button
                className={` ${editDisabled ? 'btn-secondary' : 'btn-primary'}`}
                onClick={handleEditClick}
                disabled={editDisabled}
              >
                Edit
              </button>
              <button className="btn-primary" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
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
              // onSave={handleSave}
            />
          </div>
        </div>
      )}
    </Suspense>
  )
}
