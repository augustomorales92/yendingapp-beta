import { upload } from '@/lib/upload';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa';

export default function RequestJoinForm() {

    const [attendands, setAttendands] = useState('');
    const [intentions, setIntentions] = useState('');
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handlePhoto(ev) {
        await upload(ev, link => {
            setPhotos(link);
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(attendands, intentions, photos)

        // let toastId;
        // try {
        //     setIsLoading(true);
        //     toastId = toast.loading("We're sending the request...");

        //     const res = await fetch('/api/previaRequest', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ attendands, photos }),
        //     });
        //     if (!res.ok) {
        //         throw new Error('Error verificando el usuario.');
        //     }
        //     //  VALIDAMOS USUARIO
        //     const { newPreviaUser } = await res.json();
        //     console.log(newPreviaUser)

        //     toast.dismiss(toastId);
        //     setIsLoading(false);

        // } catch (error) {
        //     console.error('Error:', error);
        //     toast.error('Ocurrió un error. Inténtalo de nuevo.');
        //     setIsLoading(false);
        //     if (toastId) {
        //         toast.dismiss(toastId);
        //     }

        // }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6">
            <Input
                label='How many are there?'
                id="attendands"
                color='white'
                type="number"
                name='attendands'
                value={attendands}
                onChange={(e) => setAttendands(e.target.value)}
                className={`${attendands ? 'text-white' : 'text-white'}`}
            />
            <div className="w-50 my-3">
                <Select
                    label="What are you looking for?"
                    color='white'
                    id="intentions"
                    name="intentions"
                    value={intentions}
                    className={`${intentions ? 'text-white' : 'text-white'}`}
                    onChange={(e) => setIntentions(e.target.value)}>
                    <Option value='Let it flow'>Let it flow</Option>
                    <Option value='Drink and have fun'>Drink and have fun</Option>
                    <Option value='Go to a disco'>Go to a disco</Option>
                    <Option value='Meet fun people'>Meet fun people</Option>
                    <Option value="Flirting and casual encounters">Flirting and casual encounters</Option>
                </Select>
            </div>
            <div className="col-span-3 lg:col-span-1">
                <div className="flex flex-wrap justify-center items-center gap-2">
                    <div className='text-secondary'>
                        {photos ? <img src={photos} alt="profile pic preview" /> : <img src="" alt="profile pic preview" />}
                    </div>
                    <label className="w-full btn-secondary flex flex-col items-center justify-center gap-1 ">
                        <FaUpload />
                        <div>
                            Upload photo
                        </div>
                        <input
                            type="file"
                            name="url_img"
                            id="url_img"
                            className='hidden'
                            onChange={handlePhoto}
                        />
                    </label>
                </div>
            </div>
            <button className='btn-secondary mt-4 col-span-3' type="submit">{isLoading ? "Requesting..." : "Join"} </button>
        </form>
    )
}
