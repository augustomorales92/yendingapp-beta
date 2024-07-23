import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '../customComponents/CustomInput'
import CustomDropDowns from '../customComponents/CustomDropDown'
import { place_details } from '@/lib/data'
import CustomTextArea from '../customComponents/CustomTextArea'
import { useFormState } from 'react-dom'
import { updatePrevia } from '@/lib/actions'
import type { Previas } from '@/types/data'
import { CustomButton } from '../buttons/CustomButton'

type EditPreviaModalProps = {
  previa: Previas
  onClose: () => void
}
function EditPreviaModal({ previa, onClose }: EditPreviaModalProps) {
  const updatePreviaWithId = updatePrevia.bind(null, previa?.previa_id || '')

  const [errorMessage, dispatch] = useFormState(updatePreviaWithId, undefined)

  const handleEdit = (formData: FormData) => {
    dispatch(formData)
    onClose()
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
        action={handleEdit}
      >
        <CustomInput
          label="Location"
          name="location"
          placeholder="Location"
          required={true}
          type="text"
          hasMin={false}
          hasMax={false}
          initialValue={previa.location}
        />

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
                previa.date
                  ? new Date(previa.date).toISOString().slice(0, 10)
                  : previa.date
              }
            />
          </div>
          <div className="w-50 flex flex-col">
            <CustomInput
              label="Start time?"
              name="startTime"
              required={true}
              type="time"
              hasMin={false}
              hasMax={false}
              initialValue={previa.startTime}
            />
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
              initialValue={previa.participants}
            />
          </div>
          <div className="w-50 flex flex-col">
            <CustomDropDowns
              name="place_details"
              label="Where?"
              values={place_details}
              type="select"
              initialValue={previa.place_details}
            />
          </div>
        </div>
        <div>
          <CustomTextArea
            name="description"
            label="Description"
            initialValue={previa.description}
          />
          <CustomButton text="submit" />
        </div>
      </form>
    </div>
  )
}

export default EditPreviaModal
