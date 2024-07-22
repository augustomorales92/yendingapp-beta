'use client'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import BeatLoader from 'react-spinners/BeatLoader'

export function CustomButton({
  errorMessage,
  text
}: {
  text: string
  errorMessage?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button className="btn-login">
      <span>{pending ? <BeatLoader color="white" /> : text}</span>
    </button>
  )
}
