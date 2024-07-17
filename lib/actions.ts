'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import { z } from 'zod'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData)
    redirect('/dashboard?sortCriteria=date')
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

const CreateLoginSchema = z.object({
  email: z.string(),
  password: z.string()
})

export async function signup(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('name'),
      password: formData.get('password')
    })

    const res = await fetch('/api/user/userExists', {
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

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
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
    toast.error('Ocurrió un error. Inténtalo de nuevo.')
  }
}
