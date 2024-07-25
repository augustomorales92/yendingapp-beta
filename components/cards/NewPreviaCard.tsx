'use client'
import Image from 'next/image'
import React from 'react'
import { Creator } from '@/types/data'
import { formattedDate, sanitizeImages } from '@/lib/utils'
import Loader from '../Loader'
import { FaShare } from 'react-icons/fa'
import RequestJoinModal from '../forms/RequestJoinModal'
import { useState, Suspense } from 'react'

interface PreviaCardProps {
  index?: number
  previa_id?: string
  location?: string
  creator?: Creator
  date?: Date
  startTime?: string
  participants?: string
  place_details?: string
  images_previa_url?: string[] | string
  description?: string
}

const NewPreviaCard = ({
  previa_id,
  location,
  creator,
  date,
  startTime,
  participants,
  place_details,
  description,
  images_previa_url
}: PreviaCardProps) => {
  const images = sanitizeImages(images_previa_url)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle date event
  const inputDate = new Date(date as Date)

  // Seteo el formato de fecha para que figure bien

  // LOGICA DEL MODAL PARA SOLICITAR UNIRSE A PREVIA
  const handleJoinClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Si el clic es en el fondo (no en el contenido del modal), cerrar el modal
  const handleBackdropClick = (event: any) => {
    if (event.target === event.currentTarget) {
      handleModalClose()
    }
  }

  return (
    <>
      <div className=" bg-casal-200 border border-gray-200 rounded-lg shadow dark:bg-secondary dark:border-gray-700 w-[25rem]  h-[32rem]">
        <div className="flex justify-center">
          <Suspense fallback={<Loader />}>
            <Image
              className="rounded-t-lg h-64 w-auto flex items-center justify-center p-2 lg:h-48"
              src={images?.[0] || '/images/placeholder.jpg'}
              alt="photo"
              width={500}
              height={500}
            />
          </Suspense>
        </div>
        <div className="p-3">
          <div className="mb-2 flex items-center justify-around lg:h-20">
            <div className="flex-shrink-0 mr-2">
              <div className="group relative w-max">
                <Image
                  className="w-8 h-8 rounded-full"
                  src={creator?.photo || '/images/placeholder.jpg'}
                  alt="Neil image"
                  width={32}
                  height={32}
                />
                <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                  {creator?.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row text-lg tracking-tight dark:text-secondary_b text-secondary_b">
                {location}
              </div>
              <p className="font-normal text-sm text-primary_b dark:text-primary_b">
                {`${formattedDate({ date, inputDate })} at ${startTime}`}
              </p>
            </div>
          </div>
          <p className="mb-3 font-normal text-lg text-primary_b dark:text-primary_b text-ellipsis lg:h-24 h-20">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 ">
            <div className="group relative w-max">
              <button className='cursor-pointer me-2 px-2.5 py-0.5 rounded bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70'>
                + {participants}
              </button>
              <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                Participants
              </span>
            </div>
            <div className="group relative w-max">
              <button className='cursor-pointer me-2 px-2.5 py-0.5 rounded bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70'>
                {place_details}
              </button>
              <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                Where
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-3 items-center">
            <button
              className="btn-primary inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg "
              onClick={handleJoinClick}
            >
              Join
            </button>
            <div className="group relative w-max">
              <button className='cursor-pointer rounded-full bg-primary_b p-3 text-primary transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70'>
                <FaShare color='white'/>
              </button>
              <span className="pointer-events-none absolute -top-9 left-0 w-max rounded bg-gray-900 px-2 py-1 my-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                Share
              </span>
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
            className="p-6 rounded-lg max-w-3xl w-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RequestJoinModal
              previa={{
                previa_id,
                creator,
                location,
                startTime
              }}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default NewPreviaCard
