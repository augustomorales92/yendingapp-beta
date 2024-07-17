import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import BeatLoader from 'react-spinners/BeatLoader'
import { Input } from '@material-tailwind/react'
import {useFormState} from 'react-dom'
import { signup } from '@/lib/actions'

export default async function RegisterForm() {

  const [errorMessage, dispatch, isPending] = useFormState(
    signup,
    undefined
  )

 /*  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // handle errors
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isError = false
    if (!email) {
      setEmailError(true)
      isError = true
    } else {
      setEmailError(false)
    }

    if (!password) {
      setPasswordError(true)
      isError = true
    } else {
      setPasswordError(false)
    }

    if (isError) {
      toast.error('Missing data')
      return
    }

    let toastId
    try {
      setIsLoading(true)
      toastId = toast.loading(
        "We're registering the user... you'll be redirected soon..."
      )

      const res = await fetch('/api/user/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      if (!res.ok) {
        throw new Error('Error verificando el usuario.')
      }

      //  VALIDAMOS USUARIO
      const { user } = await res.json()
      if (user) {
        toast.error('Usuario existente')
        toast.dismiss(toastId)
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok) {
        throw new Error('Error en el registro.')
      }
      // Iniciar sesión automáticamente después del registro
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (result.error) {
        throw new Error('Error iniciando sesión.')
      }

      const form = e.target
      router.push('/onboarding')
      form.reset()
      toast.dismiss(toastId)
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Ocurrió un error. Inténtalo de nuevo.')
      setIsLoading(false)
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  } */

  return (
    <form action={dispatch} className="flex flex-col gap-3 px-6">
      <Input
        type="email"
        name="email"
        color="white"
        label="Put your email"
        error={!!errorMessage}
        aria-errormessage={errorMessage ? 'This field is required' : null}
        className={errorMessage ? 'border-red-500 text-white' : ''}
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Input
        type="password"
        name="password"
        color="white"
        label="Choose your password"
        error={!!errorMessage}
        aria-errormessage={errorMessage ? 'This field is required' : null}
        className={errorMessage ? 'border-red-500 text-white' : ''}
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <button className="btn-register">
        {isPending ? (
          <span>
            <BeatLoader color="white" />
          </span>
        ) : (
          <>
            <FaUserAlt className="h-6" />
            <span>{`I'm Ready`}</span>
          </>
        )}
      </button>
      <Link className="text-sm mt-3" href={'/auth/login'}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
