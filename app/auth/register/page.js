
'use client'

import RegisterForm from '@/components/forms/RegisterForm';

export default function register() {

  return (
    <div className="p-8 m-8 mx-auto max-w-xs">
      <h1 className="text-4xl font-bold text-center mb-2">
        Create account
      </h1>
      <p className="text-center mb-6 text-gray-500">
        Choose an user name and your own password to enjoy previapp
      </p>
      <RegisterForm />
    </div>
  )
}