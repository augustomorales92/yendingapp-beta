'use client'

import toast from 'react-hot-toast'
import { useFormState } from 'react-dom'
import { createPrevia } from '@/lib/actions'
import CustomInput from '../customComponents/CustomInput'
import CustomTextArea from '../customComponents/CustomTextArea'
import { CustomButton } from '../buttons/CustomButton'
import CustomPhotoUploader from '../customComponents/CustomPhotoUploader'
import CustomDropDowns from '../customComponents/CustomDropDown'

/* type Validations = {
  date?: string
  participants?: string
  location?: string
  place_details?: string
  description?: string
  startTime?: string
  images_previa_url?: string
}
 */
const place_details = [
  {
    label: 'In a bar',
    value: 'In a bar'
  },
  {
    label: 'In a house',
    value: 'In a house'
  },
  {
    label: 'On the beach',
    value: 'On the beach'
  },
  {
    label: `We'll move`,
    value: `We'll move`
  }
]

export default function NewPreviaForm() {

  const notify = (isPending: boolean) => {
    if (isPending) {
      toast.loading("We're creating a new previa... pleas wait")
    }
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }

  const [errorMessage, dispatch] = useFormState(createPrevia, undefined)


  

  return (
      <form className="grid grid-cols-3 gap-3" action={dispatch}>
        <div className="col-span-3 lg:col-span-2">
          <div className="my-2">
            <CustomInput label="Location" name="location" required={true} />
          </div>

          <div className="flex flex-wrap justify-start gap-3  ">
            <div className="w-50 my-3">
              <CustomInput
                label="Date"
                name="date"
                type="date"
                required={true}
              />
            </div>
          </div>

          <div className="w-50 my-3">
            <CustomInput
              label="Start Time"
              name="startTime"
              type="time"
              required={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-3">
          <div className="w-50 my-3">
            <CustomInput
              label="How many are there?"
              name="participants"
              type="number"
              required={true}
            />
          </div>
          <div className="w-50 my-3">
            <CustomDropDowns
              name="place_details"
              label="Where is it?"
              values={place_details}
              type="select"
            />
          </div>
        </div>
        <div className="flex items-center text-secondary gap-3 border-b-2 border-t-2 border-primary_b m-2">
          <CustomDropDowns
            name="show_location"
            label="Show location"
            type="checkbox"
          />
        </div>
        <div className="my-2">
          <CustomTextArea
            label="Description"
            name="description"
            required={true}
          />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-secondary">
              <CustomPhotoUploader
                label="Upload photo"
                name="images_previa_url"
              />
            </div>
          </div>
        </div>
        {!!errorMessage && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {errorMessage}
          </div>
        )}
        <CustomButton text="Create Previa" errorMessage={errorMessage || ''} />
      </form>
  )
}
