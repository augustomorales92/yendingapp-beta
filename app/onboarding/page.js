'use client'
import GenderSelect from '@/components/forms/GenderSelected';
import InterestSelected from '@/components/forms/InterestSelected';
import { upload } from '@/lib/upload';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa';
import { IoIosReturnLeft } from "react-icons/io";


export default function onboarding() {
    // eslint-disable-next-line no-unused-vars
    const { data: session, status } = useSession();
    // seteo el estatus inicial del form y con cookies, llamo a la propuedad UserId guardada en el cookies despues de un login
    const [formData, setFormData] = useState({
        name: session?.user?.name || " ",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        about: "",
        age: 0,
        show_interest: false,
        gender_identity: "man",
        previas_interest: "woman",
        previas: [],
        previas_created: [],
        url_img: '',
    });

    const [profileImg, setProfileImg] = useState(null);
    const router = useRouter();

    const fetchData = async () => {
        const params = {
            email: session?.user?.email,
        };
        const queryString = new URLSearchParams(params).toString();
        try {
            const response = await fetch(`/api/user?${queryString}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error('Error al obtener datos del usuario');
            }
            const data = await response.json();
            setFormData(data.user_data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [session]);

    function calculateAge(day_dob, month_dob, year_dob) {
        const day = parseInt(day_dob);
        const month = parseInt(month_dob) - 1;
        const year = parseInt(year_dob);

        const birthDate = new Date(year, month, day);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const handleDobChange = (e) => {
        const { name, value } = e.target;

        // Validaciones
        if (name === "dob_day" && (value < 1 || value > 31)) {
            toast("Please enter a valid day between 1 and 31.");
            return;
        }

        if (name === "dob_month" && (value < 1 || value > 12)) {
            toast("Please enter a valid month between 1 and 12.");
            return;
        }

        const currentYear = new Date().getFullYear();
        if (name === "dob_year" && (value > currentYear - 18)) {
            toast("You must be at least 18 years old.");
            return;
        }


        setFormData((prevState) => {
            const updatedFormData = {
                ...prevState,
                [name]: value,
            };

            const { dob_day, dob_month, dob_year } = updatedFormData;
            if (dob_day && dob_month && dob_year) {
                const age = calculateAge(dob_day, dob_month, dob_year);
                updatedFormData.age = age;
            }

            return updatedFormData;
        });
    };

    const handleChange = (e) => {
        // desesctructuro el target para trabajarlo
        const { name, type, value, checked, files } = e.target;

        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prevState) => ({
            ...prevState,
            [name]: fieldValue,
        }));
    };

    async function handleProfileChange(ev) {
        await upload(ev, link => {
            setProfileImg(link);
            setFormData(prevState => ({
                ...prevState,
                url_img: link
            }));
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        // Asegúrate de que sen un array
        if (!Array.isArray(formData.previas)) {
            formData.previas = [];
        }
        if (!Array.isArray(formData.previas_created)) {
            formData.previas_created = [];
        };
        // Agrega profileImg a formData si existe
        const updatedFormData = {
            ...formData,
            url_img: profileImg || formData.url_img, // Asegúrate de no sobreescribir img_url si profileImg es null
        };

        try {
            const response = await fetch('/api/user', {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ updatedFormData }),
            })
            if (response.status === 200) {
                router.push('/dashboard');
            } else {
                console.error('Failed to update user:', response.status);
            }
        } catch (err) {
            console.log(err)
        }

    };

    if (status === "loading") {
        return <div className='text-black'>Loading...</div>;
    }

    if (!session) {
        return <div className='text-black'>Please sign in to access the dashboard.</div>;
    }

    return (
        <>
            <div className='p-3 flex justify-between items-center align-center'>
                <h2 className='p-3 text-primary font-bold text-xl md:text-3xl'>ONBOARDING PROFILE</h2>
                <Link className='text-2xl text-primary text-bold' href="/dashboard">
                    <IoIosReturnLeft />
                </Link>
            </div>

            <form className='grid grid-cols-3 gap-3 border-t-2 border-primary_b p-5' onSubmit={handleSubmit}>
                <div className="col-span-3 lg:col-span-2">
                    <label htmlFor="name">First Name</label>
                    <input
                        id="name"
                        type='text'
                        name="name"
                        placeholder="First Name"
                        required={true}
                        value={formData.name || " "}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                    <div>
                        <div className='w-full'>Birthday</div>
                        <input
                            id="dob_day"
                            type="number"
                            name="dob_day"
                            placeholder="DD"
                            required={true}
                            value={formData.dob_day || ""}
                            onChange={handleDobChange}
                            className="w-1/4 p-2 border rounded-md"
                            min="1"
                            max="31"
                        />
                        <input
                            id="dob_month"
                            type="number"
                            name="dob_month"
                            placeholder="MM"
                            required={true}
                            value={formData.dob_month || ""}
                            onChange={handleDobChange}
                            className="w-1/4 p-2 border rounded-md"
                            min="1"
                            max="12"
                        />
                        <input
                            id="dob_year"
                            type="number"
                            name="dob_year"
                            placeholder="YYYY"
                            required={true}
                            value={formData.dob_year || ""}
                            onChange={handleDobChange}
                            className="w-1/3 p-2 border rounded-md"
                            min={new Date().getFullYear() - 100} // Optional: Adjust the range of years
                            max={new Date().getFullYear() - 18} // Optional: Adjust the range of years
                        />
                    </div>

                    <div className='w-full gap-3'>
                        <label>Gender</label>
                        <GenderSelect formData={formData} handleChange={handleChange} />
                    </div>
                    <div className='w-full gap-3'>
                        <label>Show Me</label>
                        <InterestSelected formData={formData} handleChange={handleChange} />
                    </div>
                    <div className='flex items-center gap-3 border-b-2 border-t-2 border-primary_b m-2'>
                        <label htmlFor="show_interest">Show Interest on my Profile</label>
                        <input
                            id="show_interest"
                            type="checkbox"
                            name="show_interest"
                            onChange={handleChange}
                            checked={formData.show_interest}
                        />
                    </div>

                    <label htmlFor="about">About me</label>
                    <textarea
                        id="about"
                        type="text"
                        name="about"
                        required={true}
                        placeholder="I like long walks..."
                        value={formData.about || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div className="col-span-3 lg:col-span-1">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <div>
                            {formData.url_img && <img src={formData.url_img} alt="profile pic preview" />}
                        </div>
                        <label className="w-full text-secondary bg-primary_b p-2 border text-center flex flex-col items-center justify-center gap-1 cursor-pointer ">
                            <FaUpload />
                            <div>
                                Upload photo
                            </div>
                            <input
                                type="file"
                                name="url_img"
                                id="url_img"
                                className='hidden'
                                onChange={handleProfileChange}
                            />
                        </label>
                    </div>
                </div>
                <button className='btn-secondary mt-4 col-span-3' type="submit">Save data </button>
            </form>

        </>
    )
}
