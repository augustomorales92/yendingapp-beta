'use client'
import GenderSelect from '@/components/forms/GenderSelected'
import InterestSelected from '@/components/forms/InterestSelected'
import { fetchUser, updateUser } from '@/lib/actions'
import { upload } from '@/lib/upload'
import {
  Checkbox,
  Input,
  Option,
  Select,
  Typography
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, Suspense } from 'react'
import { toast } from 'react-hot-toast'
import { FaUpload } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import { useFormState } from 'react-dom'
import { FormState } from '@/types/onboarding'
import { CustomButton } from '../buttons/CustomButton'
import CustomDropDowns from '../customComponents/CustomDropDown'
import CustomInput from '../customComponents/CustomInput'
import { auth } from '@/auth'
import CustomTextArea from '../customComponents/CustomTextArea'
import CustomPhotoUploader from '../customComponents/CustomPhotoUploader'
import { Session } from 'next-auth'

const dob_month_values = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' }
]

const dob_day_values = [
  { label: '1', value: '01' },
  { label: '2', value: '02' },
  { label: '3', value: '03' },
  { label: '4', value: '04' },
  { label: '5', value: '05' },
  { label: '6', value: '06' },
  { label: '7', value: '07' },
  { label: '8', value: '08' },
  { label: '9', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },
  { label: '31', value: '31' }
]

type OnboardingFormProps = {
  user?: FormState
}

export default function OnboardingForm({ user }: OnboardingFormProps) {

  const notify = (isPending: boolean) => {
    if (isPending) {
      toast.loading(
        "We're registering the user... you'll be redirected soon..."
      )
    }
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }
  const [errorMessage, dispatch] = useFormState(updateUser, undefined)

  /*   const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  
  // seteo el estatus inicial del form y con cookies, llamo a la propuedad UserId guardada en el cookies despues de un login
  const [formData, setFormData] = useState({
    name: session?.user?.name || ' ',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    about: '',
    age: 0,
    show_interest: false,
    gender_identity: 'man',
    previas_interest: 'woman',
    previas_requests: [],
    previas_created: [],
    url_img: '',
    previas: []
  })


  const handleDobChange = (e) => {
    const { name, value } = e.target

    // Validaciones
    const currentYear = new Date().getFullYear()
    if (name === 'dob_year' && value > currentYear - 18) {
      toast('You must be at least 18 years old.')
      return
    }

    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: value
      }

      const { dob_day, dob_month, dob_year } = updatedFormData
      if (dob_day && dob_month && dob_year) {
        const age = calculateAge(dob_day, dob_month, dob_year)
        updatedFormData.age = age
      }

      return updatedFormData
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Asegúrate de que sen un array
    if (!Array.isArray(formData.previas)) {
      formData.previas = []
    }
    if (!Array.isArray(formData.previas_created)) {
      formData.previas_created = []
    }
    // Agrega profileImg a formData si existe
    const updatedFormData = {
      ...formData,
      url_img: profileImg || formData.url_img // Asegúrate de no sobreescribir img_url si profileImg es null
    }

    let toastId
    try {
      setIsLoading(true)
      toastId = toast.loading(
        "We're saving the user... you'll be redirected soon..."
      )
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ updatedFormData })
      })
      if (response.status === 200) {
        router.push('/dashboard')
      } else {
        console.error('Failed to update user:', response.status)
        setIsLoading(false)
      }
      toast.dismiss(toastId)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }
 */
  /*  if (status === 'loading') {
    return <div className="text-secondary">Loading...</div>
  } */


  const loader = (
    <div className="flex justify-center items-center align-center">
      {' '}
      <ClipLoader color="white" size={50} />{' '}
    </div>
  )

  return (
    <Suspense fallback={loader}>
      <form className="grid grid-cols-3 gap-3 text-white" action={dispatch}>
        <div className="col-span-3 lg:col-span-2">
          <CustomInput
            label="First name"
            name="name"
            placeholder="First Name"
            required={true}
            type="text"
            hasMin={false}
            hasMax={false}
            initialValue={user?.name}
          />
          <div className="grid grid-cols-3 gap-2 my-3">
            <div className="col-span-3 lg:col-span-1">
              <CustomDropDowns
                name="dob_day"
                label="Day"
                values={dob_day_values}
                type="select"
                initialValue={user?.dob_day}
              />
            </div>
            <div className="col-span-3 lg:col-span-1">
              <CustomDropDowns
                name="dob_month"
                label="Month"
                values={dob_month_values}
                type="select"
                initialValue={user?.dob_month}
              />
            </div>
            <div className="col-span-3 lg:col-span-2">
              <CustomInput
                label="Year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                type="number"
                hasMin={true}
                hasMax={true}
                initialValue={user?.dob_year}
              />
            </div>
          </div>

          <div className="w-full gap-3">
            <label>Gender</label>
            <GenderSelect initialValue={user?.gender_identity}/>
          </div>
          <div className="w-full gap-3">
            <label>Show Me</label>
            <InterestSelected initialValue={user?.previas_interest}/>
          </div>
          <div className="my-3">
            <CustomDropDowns
              name="show_interest"
              label="Show interest"
              type="checkbox"
              initialValue={user?.show_interest}
            />
          </div>
          <div className="my-3 gap-2">
            <CustomTextArea name="about" label="About me" required={true} initialValue={user?.about}/>
          </div>
          <div>
            {user?.previas_created?.length ? (
              <div>Previas created: {user?.previas_created.length}</div>
            ) : (
              <p>{`You haven't created any`}</p>
            )}
            {user?.previas_requests?.length ? (
              <div>Previas you joined: {user?.previas_requests.length}</div>
            ) : (
              <p>{`You haven't joined any`}</p>
            )}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <CustomPhotoUploader label="Upload photo" name="url_img" initialValue={user?.url_img}/>
          </div>
        </div>

        <CustomButton notify={notify} text="Save" />
      </form>
    </Suspense>
  )
}
