'use client'
import { signup } from '@/lib/actions'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'

export default function RegisterForm() {
  const handleForm = async (formData: FormData) => {
    const res = await signup(undefined, formData)
    toast.dismiss()
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Profile updated!')
    }
  }
  const errorMessage = false
  return (
    <form action={handleForm} className="flex flex-col gap-3 px-6">
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
      <CustomButton text="Register" />
      <Link className="text-sm mt-3" href={'/auth/login'} scroll={false}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
