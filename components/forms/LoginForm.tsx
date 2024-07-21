'use client'
import { Input } from '@material-tailwind/react'
import { useFormState } from 'react-dom'
import { authenticate } from '@/lib/actions'
import { CustomButton } from '@/components/buttons/CustomButton'

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className="flex flex-col mt-3 gap-3">
      <Input
        id="email"
        type="email"
        name="email"
        label="Email"
        onPointerLeaveCapture={undefined}
        onPointerEnterCapture={undefined}
        crossOrigin={undefined}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        name="password"
        onPointerLeaveCapture={undefined}
        onPointerEnterCapture={undefined}
        crossOrigin={undefined}
      />
      <CustomButton errorMessage={errorMessage} text="login" />
      {errorMessage && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
