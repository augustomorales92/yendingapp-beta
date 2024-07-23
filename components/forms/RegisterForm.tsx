'use client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useFormState } from 'react-dom'
import { signup } from '@/lib/actions'
import { CustomButton } from '../buttons/CustomButton'

export default function RegisterForm() {
  const [errorMessage, dispatch] = useFormState(signup, undefined)

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
  return (
    <form action={dispatch} className="flex flex-col gap-3 px-6">
      <label>Put your email</label>
      <input
        type="email"
        name="email"
        color="white"
        aria-errormessage={errorMessage ? 'This field is required' : ''}
        className={errorMessage ? 'border-red-500 text-white' : ''}
      />
      <label>Choose your password</label>
      <input
        type="password"
        name="password"
        color="white"
        aria-errormessage={errorMessage ? 'This field is required' : ''}
        className={errorMessage ? 'border-red-500 text-white' : ''}
      />
      <CustomButton errorMessage={errorMessage || ''} text="Register" />
      <Link className="text-sm mt-3" href={'/auth/login'} scroll={false}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
