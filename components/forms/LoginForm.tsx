import { Input } from '@material-tailwind/react'
import toast from 'react-hot-toast'
import BeatLoader from 'react-spinners/BeatLoader'
import {useFormState} from 'react-dom'
import { authenticate } from '@/lib/actions'

export default function LoginForm() {
  const [errorMessage, dispatch, isPending] = useFormState(
    authenticate,
    undefined
  )
  return (
    <form action={dispatch} className="flex flex-col mt-3 gap-3">
      <Input
        id="email"
        type="email"
        name="email"
        label="Email"
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        name="password"
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <button className="btn-primary">
        <span>{isPending ? <BeatLoader color="white" /> : 'Login'}</span>
      </button>

      {errorMessage && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
