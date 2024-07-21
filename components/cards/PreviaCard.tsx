'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Carousel
} from '@material-tailwind/react'
import { Suspense, useState } from 'react'
import { FaShare } from 'react-icons/fa'
import RequestJoinModal from '../forms/RequestJoinModal'
import Image from 'next/image'
import { formattedDate, sanitizeImages } from '@/lib/utils'
import Loader from '../Loader'
import { Creator } from '@/types/data'

interface PreviaCardProps {
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

export default function PreviaCard({
  previa_id,
  location,
  creator,
  date,
  startTime,
  participants,
  place_details,
  description,
  images_previa_url
}: PreviaCardProps) {
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
  const images = sanitizeImages(images_previa_url)

  return (
    <>
      <Card
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="bg-secondary max-w-[24rem]  h-[30rem] flex flex-col justify-between overflow-hidden mt-3 "
      >
        <CardHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <Suspense fallback={<Loader />}>
            <Carousel
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="rounded-xl"
            >
              <Image
                width={300}
                height={600}
                src={images?.[0] || '/images/placeholder.jpg'}
                alt="image 1"
                className=" w-full  h-fullaspect-square"
              />
              <Image
                width={300}
                height={300}
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </Suspense>
        </CardHeader>
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center gap-2 ">
            <Tooltip content={creator?.name}>
              <Avatar
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                size="sm"
                variant="circular"
                alt="natali craig"
                src={creator?.photo}
                className="border-2 border-secondary_b hover:z-10"
              />
            </Tooltip>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="h6"
              className="text-secondary_b"
            >
              {location}
            </Typography>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="text-primary_b font-bold"
            >
              at {startTime}
            </Typography>
          </div>

          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="lead"
            className="mt-3 font-normal text-primary_b"
          >
            {description}
          </Typography>
          <div className="flex flex-wrap gap-2 ">
            <Tooltip content="Participants">
              <span className="cursor-pointer rounded-full  bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                +{participants}
              </span>
            </Tooltip>
            <Tooltip content="Where">
              <span className="cursor-pointer rounded-full  bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                {place_details}
              </span>
            </Tooltip>
          </div>
        </CardBody>
        <CardFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <button className="btn-primary" onClick={handleJoinClick}>
              Join
            </button>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="text-primary_b text-sm"
            >
              {formattedDate({ date, inputDate })}
            </Typography>
          </div>
          <Tooltip content="Share">
            <span className="cursor-pointer rounded-full bg-primary_b p-3 text-primary transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
              <FaShare />
            </span>
          </Tooltip>
        </CardFooter>
      </Card>
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
