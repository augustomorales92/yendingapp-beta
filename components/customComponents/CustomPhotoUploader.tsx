import React, { useState } from 'react'
import Image from 'next/image'
import { FaUpload } from 'react-icons/fa'
import { upload } from '@/lib/upload'

type CustomPhotoUploaderProps = {
  name: string
  label: string
  initialValue?: string
}

const CustomPhotoUploader = ({
  name,
  label,
  initialValue
}: CustomPhotoUploaderProps) => {
  const [value, setValue] = useState(initialValue)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    await upload(event, (link) => {
      setValue(link)
    })
  }
  return (
    <>
      <div>
        {value && (
          <Image
            width={500}
            height={500}
            sizes="100vw"
            src={value}
            alt="profile pic preview"
            priority
          />
        )}
      </div>
      <label className="w-full btn-secondary flex flex-col items-center justify-center gap-1 ">
        <FaUpload />
        <div>{label}</div>
        <input
          type="file"
          id={name}
          className="hidden"
          onChange={handleChange}
          value={''}
        />
      </label>
      <input type="hidden" name={name} value={value} />
    </>
  )
}

export default CustomPhotoUploader
