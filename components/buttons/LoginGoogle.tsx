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
      className="btn-primary-flex"
    >
      <>
        <FaGoogle className="h-6" />
        <span>Continue with Google</span>
      </>
    </button>
  )
}
