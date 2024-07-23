
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../customComponents/CustomInput'
import CustomDropDowns from '../customComponents/CustomDropDown'
import { place_details } from '@/lib/data'
import CustomTextArea from '../customComponents/CustomTextArea'

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
        <CustomInput
          label="Location"
          name="location"
          placeholder="Location"
          required={true}
          type="text"
          hasMin={false}
          hasMax={false}
          initialValue={formData.location} />

        <div className="flex flex-wrap justify-start gap-3 ">
          <div className="w-50 flex flex-col">
            <CustomInput
              label="Date"
              name="date"
              required={true}
              type="date"
              hasMin={false}
              hasMax={false}
              initialValue={
                formData.date
                  ? new Date(formData.date).toISOString().slice(0, 10)
                  : formData.date
              } />

          </div>
          <div className="w-50 flex flex-col">
            <CustomInput
              label="Start time?"
              name="startTime"
              required={true}
              type="time"
              hasMin={false}
              hasMax={false}
              initialValue={formData.startTime} />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-2">
          <div className="w-50 flex flex-col">
            <CustomInput
              label="How many are there?"
              name="participants"
              required={true}
              type="number"
              hasMin={false}
              hasMax={false}
              initialValue={formData.participants} />
          </div>
          <div className="w-50 flex flex-col">
            <CustomDropDowns
              name="place_details"
              label="Where?"
              values={place_details}
              type="select"
              initialValue={formData.place_details}
            />

          </div>
        </div>
        <div>
          <CustomTextArea
            name="description"
            label="Description"
            initialValue={formData.description}
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
