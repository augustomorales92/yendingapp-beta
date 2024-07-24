'use client'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Spinner from '@/components/spinner'

export function CustomButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  useEffect(() => {
    let toastId: string
    if (pending) {
      toastId = toast.loading('Loading...')
    }
  }, [pending])
  return (
    <button className="btn-login">
      <span>{pending ? <Spinner /> : text}</span>
    </button>
  )
}
