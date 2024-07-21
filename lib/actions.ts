'use server'

import { auth, signIn, update } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { calculateAge, getUserValues } from '@/lib/utils'
import { getUser, signUp, updatedUser } from '@/services/users'
import { postPrevia } from '@/services/previas'
import { UpdateSession } from 'next-auth/react'

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

    await signUp({ email, password })

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
 const res = await getUser()
 return res
}



export async function updateUser(
  prevState: void | undefined,
  formData: FormData,
) {
  const session = await auth()
  const user = session?.user
  const newFormData = getUserValues(formData)
  await updatedUser(newFormData)
  await update({...user, userData: newFormData})
  revalidatePath('/dashboard/profile')
  redirect('/dashboard')
}

const CreatePreviaSchema = z.object({
  creator: z.string(),
  date: z.string().transform((e) => new Date(e)),
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
    images_previa_url: Array.isArray(images_previa_url)
      ? images_previa_url
      : [images_previa_url]
  }

  await postPrevia(newFormData)
  revalidatePath('/dashboard/previas')
  redirect('/dashboard/previas')
}
