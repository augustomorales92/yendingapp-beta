'use client'
import React from 'react'
import { useFormStatus } from "react-dom";
import BeatLoader from 'react-spinners/BeatLoader'

export function CustomButton({notify, text}: {notify: (isPending: boolean,) => void, text: string}) {
    const { pending } = useFormStatus();
  
    return (
        <button className="btn-primary" onClick={() => notify(pending)}>
        <span>{pending ? <BeatLoader color="white" /> : text}</span>
      </button>
    );
  }