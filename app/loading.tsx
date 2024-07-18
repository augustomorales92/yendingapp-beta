import React from 'react';
import { ClipLoader } from 'react-spinners'

const loading = () => {
    return (
        <div className="flex justify-center m-auto">
        <ClipLoader color="white" size={50} />
      </div>
    );
};

export default loading;