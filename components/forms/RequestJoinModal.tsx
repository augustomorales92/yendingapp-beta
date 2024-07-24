import { requestJoin } from '@/lib/actions'
import { intentionsValues } from '@/lib/data'
import { Previas } from '@/types/data'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'
import { CustomButton } from '../buttons/CustomButton'
import CustomDropDowns from '../customComponents/CustomDropDown'
import CustomInput from '../customComponents/CustomInput'
import CustomPhotoUploader from '../customComponents/CustomPhotoUploader'

type RequestJoinModalProps = {
  previa: Previas
  onClose: () => void
}

export default function RequestJoinModal({
  previa,
  onClose
}: RequestJoinModalProps) {
  const { creator, previa_id, location, startTime } = previa
  const requestJoinWithId = requestJoin.bind(null, previa_id || '')

  const handleRequestJoin = async (formData: FormData) => {
    const res = await requestJoinWithId(undefined, formData)
    toast.dismiss()
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Request sent!')
    }
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
      <div className="text-secondary text-md my-2">
        <b className="text-secondary_b">{creator?.name}</b>
        {`'s Previa in`} <b className="text-secondary_b">{location}</b> at{' '}
        <b className="text-secondary_b">{startTime}</b>
      </div>
      <form action={handleRequestJoin} className="flex flex-col gap-3 px-6">
        <CustomInput
          name="attendants"
          label="How many are there?"
          type="number"
          required
        />
        <div className="w-50 my-3 flex flex-col">
          <CustomDropDowns
            name="intentions"
            label="What are you looking for?"
            values={intentionsValues}
            type="select"
          />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-secondary">
              <CustomPhotoUploader label="Take a photo" name="url_img" />
            </div>
          </div>
        </div>
        <button className="mt-4 col-span-3" type="submit">
          <CustomButton text="Join"  />
        </button>
      </form>
    </div>
  )
}
