'use client'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function LoginButton({ session }) {
  const handleLink = () => {
    // si hay token, el boton actua como sign out, sino como sign in
    if (session) {
      signOut()
      redirect('/')
    } else {
      redirect('/auth/login')
    }
  }

  return (
    <div
      className={`btn-secondary my-3 max-w-32 ${
        false ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={() => handleLink()}
    >
      {session ? 'Sign Out' : "Let's Start"}
    </div>
  )
}
