'use client'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

export default function LoginGoogle() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { redirectTo: '/dashboard' })
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-secondary text-white shadow rounded-md text-center w-full py-4 flex gap-3 items-center justify-center hover:bg-secondary/60 transition duration-300"
    >
      <>
        <FaGoogle className="h-6" />
        <span>Continue with Google</span>
      </>
    </button>
  )
}
