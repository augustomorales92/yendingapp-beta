import { auth } from '@/auth'
import { upload } from '@/lib/upload'
import { Input, Option, Select } from '@material-tailwind/react'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTimes, FaUpload } from 'react-icons/fa'

export default function RequestJoinModal({ previa, onClose, setIsModalOpen }) {
  const { creatorName, previa_id, location, startTime } = previa
  // el previa_id debo enviarlo al backend para el model PreviaUser

  const [attendands, setAttendands] = useState('')
  const [intentions, setIntentions] = useState('')
  const [photos, setPhotos] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handlePhoto(ev) {
    await upload(ev, (link) => {
      setPhotos(link)
    })
  }

  const handleAttendans = (e) => {
    const { value } = e.target
    const attendands = value
    if (attendands < 1 || attendands > 10) {
      toast.error('Between 1 and 10 participants')
    } else {
      setAttendands(attendands)
    }
  }

  const handleIntentions = (value) => {
    setIntentions(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // VALIDACIONES UTILIES
    if (!attendands || !intentions || !photos) {
      toast.error('Missing files')
      return
    }
    // if (typeof attendands !== 'number' || !Array.isArray(photos) || typeof intentions !== 'string' || typeof previa_id !== 'string') {
    //     toast.error("Invalid data types");
    //     return;
    // }

    if (
      photos.length === 0 ||
      intentions.trim() === '' ||
      previa_id.trim() === ''
    ) {
      toast.error('All fields must be filled')
      return
    }
    let toastId
    try {
      setIsLoading(true)
      toastId = toast.loading("We're sending the request...")
      const session = await auth()
      const res = await fetch('/api/previaUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.stringify(session)

        },
        body: JSON.stringify({ attendands, photos, intentions, previa_id })
      })
      if (!res.ok) {
        throw new Error('Error verificando el usuario.')
      }
      //  VALIDAMOS USUARIO
      const { newPreviaUser } = await res.json()
      console.log(newPreviaUser)

      // Actualizar la lista de previas_requests en el usuario... le envio el id de la previa para que lo añada al array
      await fetch('/api/user/updatePreviaRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ previaId: previa_id })
      })

      // Actualizar la lista de join_requests en la previa, envio el id de la previa y tambien el id del usuario para hacer push al array
      await fetch('/api/previa/joinRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          previaId: previa_id,
          joinRequest: newPreviaUser
        })
      })

      toast.dismiss(toastId)
      toast.success('Request sent successfully!')
      setIsLoading(false)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Ocurrió un error. Inténtalo de nuevo.')
      setIsLoading(false)
      if (toastId) {
        toast.dismiss(toastId)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-primary_b max-w-full min-h-full my-4 px-8 py-4 mx-auto rounded-md">
      <span
        className="flex justify-end my-2 text-secondary text-xl cursor-pointer font-bold hover:text-primary"
        onClick={onClose}
      >
        <FaTimes />
      </span>
      <div className="text-secondary text-md my-2">
        <b className="text-secondary_b">{creatorName}</b>
        {`'s Previa in`} <b className="text-secondary_b">{location}</b> at{' '}
        <b className="text-secondary_b">{startTime}</b>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6">
        <label className='text-white'>How many are there?</label>
        <input
          id="attendands"
          color="white"
          type="number"
          name="attendands"
          value={attendands}
          onChange={(e) => handleAttendans(e)}
          className={`${attendands ? 'text-white' : 'text-white'}`}
        />
        <div className="w-50 my-3 flex flex-col">
          <label className='text-white' >What are you looking for?</label>
          <select
            color="gray"
            id="intentions"
            name="intentions"
            value={intentions}
            className={`${intentions ? 'text-white' : 'text-white'}`}
            onChange={(value) => handleIntentions(value)}
          >
            <option value="Let it flow">Let it flow</option>
            <option value="Drink and have fun">Drink and have fun</option>
            <option value="Go to a disco">Go to a disco</option>
            <option value="Meet fun people">Meet fun people</option>
            <option value="Flirting and casual encounters">
              Flirting and casual encounters
            </option>
          </select>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-secondary">
              {photos ? (
                <Image
                  width={300}
                  height={300}
                  className="max-w-full max-h-80 object-contain"
                  src={photos}
                  alt="profile pic preview"
                />
              ) : (
                <Image
                  width={300}
                  height={300}
                  src=""
                  alt="pic preview" />
              )}
            </div>
            <label className="w-full btn-secondary flex flex-col items-center justify-center gap-1 ">
              <FaUpload />
              <div>Take a photo</div>
              <input
                type="file"
                name="url_img"
                id="url_img"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
          </div>
        </div>
        <button className="btn-secondary mt-4 col-span-3" type="submit">
          {isLoading ? 'Requesting...' : 'Join'}{' '}
        </button>
      </form>
    </div>
  )
}
