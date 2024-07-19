'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react'
import { format, isBefore, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import EditPreviaModal from '../forms/EditPreviaModal'
import { BeatLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Previas } from '@/types/data'
import { revalidatePath } from 'next/cache'
import { today } from '@/lib/constants'
import Loader from '../Loader'
import { Suspense } from 'react'
import { sanitizeImages } from '@/lib/utils'
interface PreviaCardProps {
  previa_id: string
  location: string
  creator?: string
  date?: Date
  startTime?: string
  participants?: number
  place_details?: string
  images_previa_url?: string[]
  description?: string
  join_requests: Object[]
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

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  // Si el clic es en el fondo (no en el contenido del modal), cerrar el modal
  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleModalClose()
    }
  }

  // Logica para el envio y petición del backend para generar una nueva previa
  const handleSave = async (updatedData: any) => {
    let toastId: string
    try {
      toastId = toast.loading('Changing data...')
      const response = await fetch('/api/previa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData: { ...updatedData, previa_id } })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Updated previa:', data)
        toast.dismiss(toastId)
        revalidatePath('/dashboard/previas/my-previas')
      } else {
        console.error('Failed to update previa')
      }
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
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
            revalidatePath('/dashboard/previas/my-previas')
            setIsModalOpen(false)
            toast.success('Previa deleted!')
          } else {
            console.error('Error deleting previa:', result)
            toast.dismiss(toastId)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    })
  }

  const images = sanitizeImages(images_previa_url)

  return (
    <Suspense fallback={<Loader />}>
      <Card
        className="bg-secondary max-w-[24rem]  h-[30rem] flex flex-col justify-between overflow-hidden mt-3 "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none p-2 h-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Image
            width={300}
            height={600}
            src={images?.[0] || '/images/placeholder.jpg'}
            alt="image 1"
            className=" w-full  h-fullaspect-square"
          />
        </CardHeader>
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-wrap items-center gap-2 ">
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="h6"
              className="text-secondary_b"
            >
              {location} - {place_details}
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2 ">
            <Typography
              variant="h6"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className={`mt-3 ${
                formattedDate === 'Due' ? 'text-red-500' : 'text-primary_b'
              }`}
            >
              {formattedDate}
            </Typography>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              variant="h6"
              className="mt-3 text-primary_b"
            >
              At: {startTime}
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
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h6"
            className="mt-3 text-primary_b"
          >
            Participants: {participants}
          </Typography>
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h6"
            className="mt-3 text-primary_b"
          >
            Requests: {join_requests?.length}
          </Typography>
        </CardBody>
        <CardFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <button className="btn-primary" onClick={handleEditClick}>
              {/* isLoading ? <BeatLoader color="white" /> : */ 'Edit'}
            </button>
            <button className="btn-primary" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </CardFooter>
      </Card>
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
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </Suspense>
  )
}
