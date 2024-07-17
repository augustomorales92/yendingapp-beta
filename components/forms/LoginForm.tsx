'use client'
import { Input } from '@material-tailwind/react'
import toast from 'react-hot-toast'
import BeatLoader from 'react-spinners/BeatLoader'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions'

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(
    authenticate,
    undefined
  )

  const notify = (isPending: boolean) => {
    if (isPending) {
      toast.loading("We're working on in... you'll be redirected soon...")
    }
    if(errorMessage){
      toast.error(errorMessage)
    }
  } 

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
      <LoginButton notify={notify} />
      {errorMessage && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  )
}

function LoginButton({notify}: {notify: (isPending: boolean) => void}) {
    const { pending } = useFormStatus();
  
    return (
        <button className="btn-primary" onClick={() => notify(pending)}>
        <span>{pending ? <BeatLoader color="white" /> : 'Login'}</span>
      </button>
    );
  }