'use client'
import toast from 'react-hot-toast'

type ToastNotifyProps = {
  status: 'success' | 'error' | 'loading'
  message?: string
}

const toastNotify = ({ status, message }: ToastNotifyProps) => {
  let toastId: string
  switch (status) {
    case 'success':
      toastId = toast.success(message || 'Success')
      break
    case 'error':
      toastId = toast.error(message || 'Error')
      break
    case 'loading':
      toastId = toast.loading(message || 'Loading')
      break
    default:
      break
  }
}

export default toastNotify
