import React from 'react'
import Spinner from './spinner'

export default function Loader() {
  return (
    <div className="flex items-center justify-center m-auto min-h-screen">
      <Spinner />
    </div>
  )
}
