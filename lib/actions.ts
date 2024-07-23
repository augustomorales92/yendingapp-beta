'use server'

import { auth, signIn, update } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { calculateAge, getUserValues } from '@/lib/utils'
import { getUser, signUp, updatedUser } from '@/services/users'
import {
  deletedPrevia,
  getStatusRequests,
  postPrevia,
  postRequestJoin,
  putJoinRequest,
  putPrevia
} from '@/services/previas'
import type { UpdateJoinRequest, Previas } from '@/types/data'
import {
  CreateLoginSchema,
  CreatePreviaFromSchema,
  CreateRequestJoinSchema,
  UpdatePreviaFromSchema
} from './schemas'

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

export async function updateUser(
  prevState: void | undefined,
  formData: FormData
) {
  const session = await auth()
  const user = session?.user
  const newFormData = getUserValues(formData)
  await updatedUser(newFormData)
  await update({ ...user, userData: newFormData })
  revalidatePath('/dashboard/profile')
  redirect('/dashboard')
}

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

export async function requestJoin(
  previaId: string,
  prevState: void | undefined,
  formData: FormData
) {
  const { intentions, url_img, attendants } = CreateRequestJoinSchema.parse({
    intentions: formData.get('intentions'),
    url_img: formData.get('url_img'),
    attendants: formData.get('attendants')
  })

  await postRequestJoin({ intentions, url_img, attendants, previaId })
  revalidatePath('/dashboard/previas/my-requests')
}

type StatusRequests = {
  acceptedRequests: any[]
  rejectedRequests: any[]
}

export async function statusRequests(): Promise<StatusRequests> {
  try {
    const response = await getStatusRequests()
    return response
  } catch (error) {
    console.error('Error fetching user data:', error)
    return { acceptedRequests: [], rejectedRequests: [] }
  }
}

export async function updateJoinRequestStatus({
  previaId,
  userId,
  status
}: UpdateJoinRequest) {
  await putJoinRequest({ previaId, userId, status })
  revalidatePath('/dashboard/previas/manage-requests')
}

export async function updatePrevia(
  previaId: string,
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
    show_location
  } = UpdatePreviaFromSchema.parse({
    location: formData.get('location'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    participants: formData.get('participants'),
    description: formData.get('description'),
    place_details: formData.get('place_details'),
    show_location: formData.get('show_location')
  })
  await putPrevia({
    location,
    date,
    startTime,
    participants,
    description,
    place_details,
    show_location,
    previaId
  })
  revalidatePath('/dashboard/previas/my-previas')
}

export async function deletePrevia(previa_id?: string) {
  await deletedPrevia(previa_id)
  revalidatePath('/dashboard/previas/my-previas')
}
