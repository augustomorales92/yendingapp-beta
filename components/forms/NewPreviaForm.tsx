'use client'
import { upload } from '@/lib/upload'
import { Checkbox, Input, Select, Option } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import Image from 'next/image'

type Validations = {
  date?: string
  participants?: string
  location?: string
  place_details?: string
  description?: string
  startTime?: string
  images_previa_url?: string
}

export default function NewPreviaForm() {
  const session = auth()
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [previaImage, setPreviaImage] = useState(null)

  const [validations, setValidations] = useState<Validations>({})

  // seteo el estatus inicial del form y con cookies, llamo a la propuedad UserId guardada en el cookies despues de un login
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    startTime: '',
    participants: 0,
    description: '',
    place_details: '',
    show_location: false,
    images_previa_url: '',
    about: ''
  })

  const handleChange = (e) => {
    // desesctructuro el target para trabajarlo
    const { name, type, value, checked } = e.target

    const fieldValue = type === 'checkbox' ? checked : value
    setFormData((prevState) => ({
      ...prevState,
      [name]: fieldValue
    }))
  }

  async function handlePreviaChange(ev) {
    await upload(ev, (link) => {
      setPreviaImage(link)
      setFormData((prevState) => ({
        ...prevState,
        images_previa_url: link
      }))
    })
  }

  type Error = {
    date?: string
    participants?: string
    location?: string
    place_details?: string
    description?: string
    startTime?: string
    images_previa_url?: string
  }

  const validateForm = () => {
    const newErrors: Error = {}
    const today = new Date().toISOString().split('T')[0]

    if (!formData.date || formData.date < today) {
      newErrors.date = 'The date cannot be in the past'
    }

    const participants = Number(formData.participants)
    if (isNaN(participants) || participants < 2 || participants > 30) {
      newErrors.participants = 'Participants must be between 2 and 30'
    }

    if (!formData.location) {
      newErrors.location = 'Location is mandatory'
    }

    // Validar campo place_details
    if (!formData.place_details) {
      newErrors.place_details = 'Please select a place'
    }

    // Validar campo description
    if (!formData.description) {
      newErrors.description = 'Description cannot be empty'
    }

    // Validar campos vacíos
    if (!formData.startTime) {
      newErrors.startTime = 'Start time cannot be empty'
    }

    if (formData.images_previa_url.length === 0) {
      newErrors.images_previa_url = 'Please upload an image'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setValidations(newErrors)
    } else {
      setValidations({})
      setIsLoading(true)
      let toastId
      try {
        toastId = toast.loading("We're creating a new previa... pleas wait")
        // Creamos la previa
        const response = await fetch('/api/previa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ formData })
        })
        if (!response.ok) {
          throw new Error('Error en la creación.')
        }
        // Extraemos la prop _id de la previa creada
        const previaData = await response.json()
        const previaId = previaData.newPrevia.previa_id

        // enviamos el PUT pàra modificar el usuario
        const userResponse = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            updatedFormData: {},
            previaId
          })
        })

        if (!userResponse.ok) {
          throw new Error('Error updating user.')
        }

        const form = e.target
        form.reset()
        toast.dismiss(toastId)
        setIsLoading(false)
        router.push('/dashboard/previas')
      } catch (err) {
        console.log(err)
        setError('Ocurrió un error. Inténtalo de nuevo.')
        setIsLoading(false)
        if (toastId) {
          toast.dismiss(toastId)
        }
      }
    }
  }

  console.log(previaImage)
  console.log(formData.images_previa_url)

  if (status === 'loading') {
    return <div className="text-secondary">Loading...</div>
  }

  if (!session) {
    return (
      <div className="text-secondary">
        Please sign in to access the dashboard.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center align-center">
        {' '}
        <ClipLoader color="white" size={50} />{' '}
      </div>
    )
  }

  return (
    <>
      <form className="grid grid-cols-3 gap-3" onSubmit={handleSubmit}>
        <div className="col-span-3 lg:col-span-2">
          <div className="my-2">
            <Input
              color="white"
              label="Location"
              id="location"
              type="text"
              name="location"
              value={formData.location || ' '}
              onChange={handleChange}
              className={`${formData.location ? 'text-white' : 'text-white'}`}
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            {validations.location && (
              <p className="text-red-500">{validations.location}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-start gap-3  ">
            <div className="w-50 my-3">
              <Input
                label="Date"
                id="date"
                color="white"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={` ${formData.date ? 'text-white' : 'text-white'}`}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              {validations.date && (
                <p className="text-red-500">{validations.date}</p>
              )}
            </div>

            <div className="w-50 my-3">
              <Input
                label="Start Time"
                id="startTime"
                color="white"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`${formData.startTime ? 'text-white' : 'text-white'
                  }`}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              {validations.startTime && (
                <p className="text-red-500">{validations.startTime}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-3">
            <div className="w-50 my-3">
              <Input
                label="How many are there?"
                id="participants"
                color="white"
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                className={`${formData.participants ? 'text-white' : 'text-white'
                  }`}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              {validations.participants && (
                <p className="text-red-500">{validations.participants}</p>
              )}
            </div>
            <div className="w-50 my-3">
              <Select
                label="Where is it?"
                color="gray"
                id="place_details"
                name="place_details"
                value={formData.place_details}
                className={`${formData.place_details ? 'text-white' : 'text-white'
                  }`}
                onChange={(value) =>
                  handleChange({ target: { name: 'place_details', value } })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option value="In a bar">In a bar</Option>
                <Option value="In a house">In a house</Option>
                <Option value="On the beach">On the beach</Option>
                <Option value="We'll move">{`We'll move`}</Option>
              </Select>
              {validations.place_details && (
                <p className="text-red-500">{validations.place_details}</p>
              )}
            </div>
          </div>
          <div className="flex items-center text-secondary gap-3 border-b-2 border-t-2 border-primary_b m-2">
            <Checkbox
              label="Show previa location"
              id="show_location"
              color="blue"
              name="show_location"
              onChange={handleChange}
              checked={formData.show_location}
              crossOrigin={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
          <div className="my-2">
            <textarea
              color="white"
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className={`bg-transparent border border-white rounded-2 my-2 w-full ${formData.about ? 'text-white' : 'text-white'
                }`}
            />
            {validations.description && (
              <p className="text-red-500">{validations.description}</p>
            )}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-secondary">
              {formData.images_previa_url && (
                <Image
                  width={500}
                  height={500}
                  src={formData.images_previa_url}
                  alt="previa pic preview"
                />
              )}
            </div>
            <label className="w-full btn-secondary flex flex-col items-center justify-center gap-1 ">
              <FaUpload />
              <div>Upload photo</div>
              <input
                type="file"
                name="url_img"
                id="url_img"
                className="hidden"
                onChange={handlePreviaChange}
              />
            </label>
            {validations.images_previa_url && (
              <p className="text-red-500">{validations.images_previa_url}</p>
            )}
          </div>
        </div>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        <button className="btn-secondary mt-4 col-span-3" type="submit">
          {isLoading ? 'Creating...' : 'Save'}{' '}
        </button>
      </form>
    </>
  )
}
