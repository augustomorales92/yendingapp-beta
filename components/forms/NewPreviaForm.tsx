'use client'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { auth } from '@/auth'
import { useFormState } from 'react-dom'
import { createPrevia } from '@/lib/actions'
import CustomInput from '../customComponents/CustomInput'
import CustomTextArea from '../customComponents/CustomTextArea'
import { CustomButton } from '../buttons/CustomButton'
import CustomPhotoUploader from '../customComponents/CustomPhotoUploader'
import CustomDropDowns from '../customComponents/CustomDropDown'

type Validations = {
  date?: string
  participants?: string
  location?: string
  place_details?: string
  description?: string
  startTime?: string
  images_previa_url?: string
}

const place_details = [
  {
    label: 'In a bar',
    value: 'In a bar'
  },
  {
    label: 'In a house',
    value: 'In a house'
  },
  {
    label: 'On the beach',
    value: 'On the beach'
  },
  {
    label: `We'll move`,
    value: `We'll move`
  }
]

export default function NewPreviaForm() {
  /*   
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
  } */

  const notify = (isPending: boolean) => {
    if (isPending) {
      toast.loading("We're creating a new previa... pleas wait")
    }
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }

  const [errorMessage, dispatch] = useFormState(createPrevia, undefined)


  

  return (
      <form className="grid grid-cols-3 gap-3" action={dispatch}>
        <div className="col-span-3 lg:col-span-2">
          <div className="my-2">
            <CustomInput label="Location" name="location" required={true} />
          </div>

          <div className="flex flex-wrap justify-start gap-3  ">
            <div className="w-50 my-3">
              <CustomInput
                label="Date"
                name="date"
                type="date"
                required={true}
              />
            </div>
          </div>

          <div className="w-50 my-3">
            <CustomInput
              label="Start Time"
              name="startTime"
              type="time"
              required={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-3">
          <div className="w-50 my-3">
            <CustomInput
              label="How many are there?"
              name="participants"
              type="number"
              required={true}
            />
          </div>
          <div className="w-50 my-3">
            <CustomDropDowns
              name="place_details"
              label="Where is it?"
              values={place_details}
              type="select"
            />
          </div>
        </div>
        <div className="flex items-center text-secondary gap-3 border-b-2 border-t-2 border-primary_b m-2">
          <CustomDropDowns
            name="show_location"
            label="Show location"
            type="checkbox"
          />
        </div>
        <div className="my-2">
          <CustomTextArea
            label="Description"
            name="description"
            required={true}
          />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-secondary">
              <CustomPhotoUploader
                label="Upload photo"
                name="images_previa_url"
              />
            </div>
          </div>
        </div>
        {!!errorMessage && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {errorMessage}
          </div>
        )}
        <CustomButton text="Create Previa" notify={notify} />
      </form>
  )
}
