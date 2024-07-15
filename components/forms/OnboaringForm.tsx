'use client'
import GenderSelect from '@/components/forms/GenderSelected'
import InterestSelected from '@/components/forms/InterestSelected'
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
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { FaUpload } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'

export default function OnboardingForm() {
  // eslint-disable-next-line no-unused-vars
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

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

  const [profileImg, setProfileImg] = useState(null)
  const router = useRouter()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const params = {
      email: session?.user?.email
    }
    const queryString = new URLSearchParams(params).toString()
    try {
      const response = await fetch(`/api/user?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Error al obtener datos del usuario')
      }
      const data = await response.json()
      setFormData(data.user_data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [session])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  function calculateAge(day_dob, month_dob, year_dob) {
    const day = parseInt(day_dob)
    const month = parseInt(month_dob) - 1
    const year = parseInt(year_dob)

    const birthDate = new Date(year, month, day)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

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

  const handleChange = (e) => {
    // desesctructuro el target para trabajarlo
    const { name, type, value, checked } = e.target

    const fieldValue = type === 'checkbox' ? checked : value
    setFormData((prevState) => ({
      ...prevState,
      [name]: fieldValue
    }))
  }

  async function handleProfileChange(ev) {
    await upload(ev, (link) => {
      setProfileImg(link)
      setFormData((prevState) => ({
        ...prevState,
        url_img: link
      }))
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
      <form
        className="grid grid-cols-3 gap-3 text-white"
        onSubmit={handleSubmit}
      >
        <div className="col-span-3 lg:col-span-2">
          <Input
            label="First name"
            id="name"
            color="white"
            type="text"
            name="name"
            placeholder="First Name"
            required={true}
            value={formData.name || ' '}
            onChange={handleChange}
            className={`w-full ${
              formData.name ? 'text-white' : 'text-secondary'
            }`}
            crossOrigin={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <div className="grid grid-cols-3 gap-2 my-3">
            <div className="col-span-3 lg:col-span-1">
              <Select
                label="Day"
                color="gray"
                id="dob_day"
                name="dob_day"
                value={formData.dob_day}
                className={`${
                  formData.dob_day ? 'text-white' : 'text-secondary'
                }`}
                onChange={(value) =>
                  handleChange({ target: { name: 'dob_day', value } })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
                <Option value="13">13</Option>
                <Option value="14">14</Option>
                <Option value="15">15</Option>
                <Option value="16">16</Option>
                <Option value="17">17</Option>
                <Option value="18">18</Option>
                <Option value="19">19</Option>
                <Option value="20">20</Option>
                <Option value="21">21</Option>
                <Option value="22">22</Option>
                <Option value="23">23</Option>
                <Option value="24">24</Option>
                <Option value="25">25</Option>
                <Option value="26">26</Option>
                <Option value="27">27</Option>
                <Option value="28">28</Option>
                <Option value="29">29</Option>
                <Option value="30">30</Option>
                <Option value="31">31</Option>
              </Select>
            </div>
            <div className="col-span-3 lg:col-span-1">
              <Select
                label="Month"
                color="gray"
                id="dob_month"
                name="dob_month"
                value={formData.dob_month}
                className={`${
                  formData.dob_month ? 'text-white' : 'text-secondary'
                }`}
                onChange={(value) =>
                  handleChange({ target: { name: 'dob_month', value } })
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option value="01">January</Option>
                <Option value="02">February</Option>
                <Option value="03">March</Option>
                <Option value="04">April</Option>
                <Option value="05">May</Option>
                <Option value="06">June</Option>
                <Option value="07">July</Option>
                <Option value="08">August</Option>
                <Option value="09">September</Option>
                <Option value="10">October</Option>
                <Option value="11">November</Option>
                <Option value="12">December</Option>
              </Select>
            </div>
            <div className="col-span-3 lg:col-span-2">
              <Input
                label="Year"
                color="white"
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year || ''}
                onChange={handleDobChange}
                min={new Date().getFullYear() - 100} // Optional: Adjust the range of years
                max={new Date().getFullYear() - 18} // Optional: Adjust the range of years
                className={`w-full ${
                  formData.dob_year ? 'text-white' : 'text-secondary'
                }`}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          </div>

          <div className="w-full gap-3">
            <label>Gender</label>
            <GenderSelect formData={formData} handleChange={handleChange} />
          </div>
          <div className="w-full gap-3">
            <label>Show Me</label>
            <InterestSelected formData={formData} handleChange={handleChange} />
          </div>
          <div className="my-3">
            <Checkbox
              label={
                <Typography
                  color="blue-gray"
                  className="flex font-medium text-white"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Show my interest on my profile
                </Typography>
              }
              id="show_interest"
              color="gray"
              type="checkbox"
              name="show_interest"
              onChange={handleChange}
              checked={formData.show_interest}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div className="my-3 gap-2">
            <label>About me</label>
            <textarea
              id="about"
              name="about"
              required={true}
              value={formData.about || ''}
              onChange={handleChange}
              className={`bg-transparent border border-white rounded-2 my-2 w-full ${
                formData.about ? 'text-white' : 'text-secondary'
              }`}
            />
          </div>
          <div>
            {formData.previas_created.length > 0 ? (
              <div>Previas created: {formData.previas_created.length}</div>
            ) : (
              <p>{`You haven't created any`}</p>
            )}
            {formData.previas_requests.length > 0 ? (
              <div>Previas you joined: {formData.previas_requests.length}</div>
            ) : (
              <p>{`You haven't joined any`}</p>
            )}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div>
              {formData.url_img && (
                <Image src={formData.url_img} alt="profile pic preview" />
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
                onChange={handleProfileChange}
              />
            </label>
          </div>
        </div>

        <button className="btn-secondary mt-4 col-span-3" type="submit">
          {isLoading ? 'Saving data...' : 'Save'}{' '}
        </button>
      </form>
    </>
  )
}
