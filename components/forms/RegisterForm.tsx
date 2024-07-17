'use client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Input } from '@material-tailwind/react'
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
      <Input
        type="email"
        name="email"
        color="white"
        label="Put your email"
        error={!!errorMessage}
        aria-errormessage={errorMessage ? 'This field is required' : ''}
        className={errorMessage ? 'border-red-500 text-white' : ''}
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Input
        type="password"
        name="password"
        color="white"
        label="Choose your password"
        error={!!errorMessage}
        aria-errormessage={errorMessage ? 'This field is required' : ''}
        className={errorMessage ? 'border-red-500 text-white' : ''}
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <CustomButton notify={notify} text="Register" />
      <Link className="text-sm mt-3" href={'/auth/login'}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
