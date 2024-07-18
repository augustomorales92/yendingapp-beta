'use server'

import { auth, signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { baseUrl } from '@/lib/constants'
import { calculateAge } from '@/lib/utils'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
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
  redirect('/dashboard?criteria=date')
}

const CreateLoginSchema = z.object({
  email: z.string(),
  password: z.string()
})

export async function signup(prevState: void | undefined, formData: FormData) {
  try {
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })
    const res = await fetch(`${baseUrl}/api/user/userExists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    if (!res.ok) {
      throw new Error('Error verificando el usuario.')
    }

    //  VALIDAMOS USUARIO
    const { user } = await res.json()
    if (user) {
      toast.error('Usuario existente')
      return
    }

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
    // Iniciar sesión automáticamente después del registro
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    if (result.error) {
      throw new Error('Error iniciando sesión.')
    }

    redirect('/onboarding')
  } catch (error) {
    console.error('Error:', error)
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
  show_interest: z.boolean(),
  gender_identity: z.string(),
  previas_interest: z.string(),
  previas_requests: z.array(z.string()),
  previas_created: z.array(z.string()),
  url_img: z.string(),
  previas: z.array(z.string())
})

const CreateUserFromSchema = CreateUserSchema.pick({
  dob_day: true,
  dob_month: true,
  dob_year: true
})

export async function updateUser(
  prevState: void | undefined,
  formData: FormData
) {
  try {
    const { dob_day, dob_month, dob_year } = CreateUserFromSchema.parse({
      dob_day: formData.get('dob_day'),
      dob_month: formData.get('dob_month'),
      dob_year: formData.get('dob_year')
    })

    const calculatedAge = calculateAge({ dob_day, dob_month, dob_year })
    const newFormData = { ...formData, age: calculatedAge }
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
