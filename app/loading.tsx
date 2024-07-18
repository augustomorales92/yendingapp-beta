import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="flex items-center justify-center m-auto min-h-screen">
      <ClipLoader color="white" size={50} />
    </div>
  )
}
