'use client'
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import LoginForm from '../forms/LoginForm';


const CredentialLogin = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <button onClick={() => setShowLogin(!showLogin)} className="btn-primary-flex">
        <FaUser className="h-6" />
        Continue with Credentials
      </button>

      {showLogin && <LoginForm />}
    </>
  )
}

export default CredentialLogin
