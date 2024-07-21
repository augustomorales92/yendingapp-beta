'use client'
import Image from 'next/image'
import React from 'react'
import { Creator } from '@/types/data'
import { formattedDate, sanitizeImages } from '@/lib/utils'
import { Tooltip } from '@material-tailwind/react'
import Loader from '../Loader'
import { FaShare } from 'react-icons/fa'
import RequestJoinModal from '../forms/RequestJoinModal'
import { useState, Suspense } from 'react'

interface PreviaCardProps {
  index?: number
  previa_id?: string
  location: string
  creator?: Creator
  date?: Date
  startTime?: string
  participants?: string
  place_details?: string
  images_previa_url?: string[]
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
      <div className=" bg-secondary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[24rem]  h-[40rem]">
        <div className="flex justify-center">
          <Suspense fallback={<Loader />}>
            <Image
              className="rounded-t-lg h-80 w-auto flex items-center justify-center p-2 lg:h-64"
              src={images?.[0] || '/images/placeholder.jpg'}
              alt="photo"
              width={500}
              height={500}
            />
          </Suspense>
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center justify-around lg:h-24">
            <div className="flex-shrink-0 mr-2">
              <Tooltip content={creator?.name}>
                <Image
                  className="w-8 h-8 rounded-full"
                  src={creator?.photo || '/images/placeholder.jpg'}
                  alt="Neil image"
                  width={32}
                  height={32}
                />
              </Tooltip>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row text-xl tracking-tight dark:text-white text-secondary_b">
                {location}
              </div>
              <p className="font-normal text-lg text-primary_b dark:text-gray-400">
                {`${formattedDate({ date, inputDate })} at ${startTime}`}
              </p>
            </div>
          </div>
          <p className="mb-3 font-normal text-lg text-primary_b dark:text-gray-400 text-ellipsis lg:h-32 h-24">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 ">
            <Tooltip content="Participants">
              <span className="cursor-pointer me-2 px-2.5 py-0.5 rounded bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                + {participants}
              </span>
            </Tooltip>
            <Tooltip content="Where">
              <span className="cursor-pointer me-2 px-2.5 py-0.5 rounded  bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                {place_details}
              </span>
            </Tooltip>
          </div>
          <div className="flex flex-row justify-between mt-3 items-center">
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg hover:btn-secondary focus:ring-4 focus:outline-none focus:btn-secondary  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btn-primary"
              onClick={handleJoinClick}
            >
              Join
            </button>
            <Tooltip content="Share">
              <span className="cursor-pointer rounded-full bg-primary_b p-3 text-primary transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                <FaShare />
              </span>
            </Tooltip>
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
                creatorName: creator?.name,
                location,
                startTime
              }}
              onClose={handleModalClose}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default NewPreviaCard
