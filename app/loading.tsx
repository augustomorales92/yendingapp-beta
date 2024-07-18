import React from 'react';
import { ClipLoader } from 'react-spinners'

export default function Loading(){
    return (
        <div className="flex justify-center m-auto">
        <ClipLoader color="white" size={50} />
      </div>
    );
};