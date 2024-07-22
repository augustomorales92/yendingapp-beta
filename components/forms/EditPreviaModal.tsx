
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function EditPreviaModal({ previa, onClose, onSave }) {
  const [formData, setFormData] = useState({
    location: previa.location,
    date: previa.date,
    startTime: previa.startTime,
    participants: previa.participants,
    description: previa.description,
    place_details: previa.place_details,
    images_previa_url: previa.images_previa_url,
    about: previa.about
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-primary_b max-w-full min-h-full my-4 px-8 py-4 mx-auto rounded-md">
      <span
        className="flex justify-end my-2 text-secondary text-xl cursor-pointer font-bold hover:text-primary"
        onClick={onClose}
      >
        <FaTimes />
      </span>
      <form
        className="flex flex-wrap gap-3 md:grid md:grid-rows-3 md:gap-2"
        onSubmit={handleSubmit}
      >
        <label className='text-white'>Location</label>
        <input
          color="white"
          id="location"
          type="text"
          name="location"
          value={formData.location || ' '}
          onChange={handleChange}
          className={`${formData.location ? 'text-white' : 'text-white'}`}
        />
        <div className="flex flex-wrap justify-start gap-3 ">
          <div className="w-50 flex flex-col">
            <label className='text-white'>Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={
                formData.date
                  ? new Date(formData.date).toISOString().slice(0, 10)
                  : formData.date
              }
              onChange={handleChange}
              className={` ${formData.date ? 'text-white' : 'text-white'}`}
            />
          </div>
          <div className="w-50 flex flex-col">
            <label className='text-white'>Start time?</label>
            <input
              id="startTime"
              color="white"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className={`${formData.startTime ? 'text-white' : 'text-white'}`}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-2">
          <div className="w-50 flex flex-col">
            <label className='text-white'>How many are there?</label>
            <input
              id="participants"
              color="white"
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className={`${formData.participants ? 'text-white' : 'text-white'
                }`}
            />
          </div>
          <div className="w-50 flex flex-col">
            <label className='text-white'>Where?</label>
            <select
              color="gray"
              id="place_details"
              name="place_details"
              value={formData.place_details}
              className={`${formData.place_details ? 'text-white' : 'text-white'
                }`}
              onChange={(value) =>
                handleChange({ target: { name: 'place_details', value } })
              }
            >
              <option value="In a bar">In a bar</option>
              <option value="In a house">In a house</option>
              <option value="On the beach">On the beach</option>
              <option value="We'll move">{`We'll move`}</option>
            </select>
          </div>
        </div>
        <div>
          <label className='text-white'>Description</label>
          <textarea
            color="white"
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className={`bg-transparent border border-white rounded-2 my-2 w-full ${formData.about ? 'text-white' : 'text-white'
              }`}
          />
          <button className="btn-secondary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPreviaModal
