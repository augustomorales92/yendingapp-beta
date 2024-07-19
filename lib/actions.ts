'use server'

import { auth, signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { baseUrl } from '@/lib/constants'
import { calculateAge } from '@/lib/utils'
import toastNotify from '@/components/toastNotify'

const CreateLoginSchema = z.object({
  email: z.string(),
  password: z.string()
})

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function signup(prevState: void | undefined, formData: FormData) {
  try {
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    const response = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    console.log(response)
    if (!response.ok) {
      throw new Error('Error en el registro.')
    }
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/onboarding'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Invalid credentials.')
        default:
          throw new Error('Something went wrong.')
      }
    }
    console.error(error)
    throw error
  }
}

export async function fetchUser() {
  const session = await auth()
  const params = {
    email: session?.user?.email || ''
  }
  const queryString = new URLSearchParams(params).toString()
  try {
    const response = await fetch(`${baseUrl}/api/user?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.stringify(session)
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario')
    }
    const data = await response.json()
    return data.user_data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const CreateUserSchema = z.object({
  name: z.string(),
  dob_day: z.string(),
  dob_month: z.string(),
  dob_year: z.string(),
  about: z.string(),
  age: z.number(),
  show_interest: z.string().transform((e) => e === 'on'),
  gender_identity: z.string(),
  previas_interest: z.string(),
  previas_requests: z.array(z.string()),
  previas_created: z.array(z.string()),
  url_img: z.string().optional(),
  previas: z.array(z.string())
})

const CreateUserFromSchema = CreateUserSchema.omit({
  age: true,
  previas: true,
  previas_requests: true,
  previas_created: true
})

export async function updateUser(
  prevState: void | undefined,
  formData: FormData
) {
  try {
    const {
      dob_day,
      dob_month,
      dob_year,
      name,
      about,
      show_interest,
      gender_identity,
      url_img,
      previas_interest
    } = CreateUserFromSchema.parse({
      dob_day: formData.get('dob_day'),
      dob_month: formData.get('dob_month'),
      dob_year: formData.get('dob_year'),
      name: formData.get('name'),
      about: formData.get('about'),
      show_interest: formData.get('show_interest'),
      gender_identity: formData.get('gender_identity'),
      url_img: formData.get('url_img'),
      previas_interest: formData.get('previas_interest')
    })

    const calculatedAge = calculateAge({ dob_day, dob_month, dob_year })
    const newFormData = {
      name,
      about,
      show_interest,
      gender_identity,
      url_img,
      dob_day,
      dob_month,
      dob_year,
      previas_interest,
      age: calculatedAge
    }
    const session = await auth()
    const response = await fetch(`${baseUrl}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.stringify(session)
      },
      body: JSON.stringify({ updatedFormData: newFormData })
    })
    if (response.status === 200) {
    } else {
      console.error('Failed to update user:', response.status)
    }
  } catch (err) {
    console.log(err)
    throw new Error('Error updating user')
  }
  redirect('/dashboard')
}

export async function getMyPrevias() {
  const session = await auth()

  try {
    const response = await fetch(`${baseUrl}/api/previas/myPrevias`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: JSON.stringify(session)
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener datos de las previas')
    }
    const data = await response.json()
    return data.previas
  } catch (error) {
    console.error('Error fetching previas data:', error)
  }
}

const CreatePreviaSchema = z.object({
  creator: z.string(),
  date: z.string(),
  description: z.string(),
  location: z.string(),
  images_previa_url: z.union([z.string(), z.array(z.string())]),
  participants: z.string(),
  passCode: z.string(),
  place_details: z.string(),
  show_location: z.string().transform((e) => e === 'on'),
  startTime: z.string(),
  previa_id: z.string(),
  v: z.number(),
  createdAt: z.string(),
  id: z.string(),
  updatedAt: z.string()
})

const CreatePreviaFromSchema = CreatePreviaSchema.omit({
  previa_id: true,
  updatedAt: true,
  creator: true,
  createdAt: true,
  v: true,
  id: true,
  passCode: true
})

export async function createPrevia(
  prevState: void | undefined,
  formData: FormData
) {

  console.log('formData', formData)
  try {
    // Creamos la previa
    const session = await auth()
    const {
      location,
      date,
      startTime,
      participants,
      description,
      place_details,
      show_location,
      images_previa_url
    } = CreatePreviaFromSchema.parse({
      location: formData.get('location'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      participants: formData.get('participants'),
      description: formData.get('description'),
      place_details: formData.get('place_details'),
      show_location: formData.get('show_location'),
      images_previa_url: formData.get('images_previa_url')
    })

    const newFormData = {
      location,
      date,
      startTime,
      participants,
      description,
      place_details,
      show_location,
      images_previa_url: Array.isArray(images_previa_url) ? images_previa_url : [images_previa_url]
    }

    const response = await fetch(`${baseUrl}/api/previa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify(session)
      },
      body: JSON.stringify({ formData: newFormData })
    })
    if (!response.ok) {
      throw new Error('Error en la creación.')
    }
    // Extraemos la prop _id de la previa creada
    const previaData = await response.json()
    const previaId = previaData.newPrevia.previa_id
  } catch (err) {
    console.log(err)
    throw new Error('Error creating previa')
  }
  revalidatePath('/dashboard/previas')
  redirect('/dashboard/previas')
}
