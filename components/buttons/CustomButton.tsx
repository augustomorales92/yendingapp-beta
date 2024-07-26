'use client'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import Spinner from '@/components/spinner'

export function CustomButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  useEffect(() => {
    if (pending) {
       toast.loading('Loading...')
    }
  }, [pending])
  return (
    <button className="btn-secondary-flex">
      <span>{pending ? <Spinner /> : text}</span>
    </button>
  )
}
