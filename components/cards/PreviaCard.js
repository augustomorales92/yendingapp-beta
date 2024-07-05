'use client'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Carousel,
} from "@material-tailwind/react";
import { format, isBefore, isSameDay } from "date-fns";
import { es } from 'date-fns/locale'
import { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa";


export default function PreviaCard({ previa_id, location, creator, date, startTime, participants, place_details, description, images_previa_url }) {

    const [creatorData, setCreatorData] = useState(null);
    
    // Handle date event
    const today = new Date();
    const inputDate = new Date(date);
   

    const fetchData = async () => {
        const params = { email: creator };
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
            setCreatorData(data.user_data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formattedDate = isSameDay(today, inputDate)
    ? 'Today'
    : format(date, "EEEE d 'de' MMMM", { locale: es });


    return (
        <Card className="bg-secondary max-w-[24rem]  h-[30rem] flex flex-col justify-between overflow-hidden mt-3 ">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <Carousel className="rounded-xl">
                    <img
                        src={images_previa_url[0]}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                </Carousel>
            </CardHeader>
            <CardBody>
                <div className="flex items-center gap-2 ">
                    <Tooltip content={creatorData?.name}>
                        <Avatar
                            size="sm"
                            variant="circular"
                            alt="natali craig"
                            src={creatorData?.url_img}
                            className="border-2 border-secondary_b hover:z-10"
                        />
                    </Tooltip>
                    <Typography variant="h6" className="text-secondary_b">
                        {location}
                    </Typography>
                    <Typography className="text-primary_b font-bold">
                        at {startTime}
                    </Typography>
                </div>

                <Typography variant="lead" className="mt-3 font-normal text-primary_b">
                    {description}
                </Typography>
                <div className="flex flex-wrap gap-2 ">
                    <Tooltip content="Participants">
                        <span className="cursor-pointer rounded-full  bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                            +{participants}
                        </span>
                    </Tooltip>
                    <Tooltip content="Where">
                        <span className="cursor-pointer rounded-full  bg-primary_b p-3 text-white transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                            {place_details}
                        </span>
                    </Tooltip>
                </div>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button className="btn-primary">Join</button>
                    <Typography className="text-primary_b text-sm">{formattedDate}</Typography>
                </div>
                <Tooltip content="Share">
                    <span className="cursor-pointer rounded-full bg-primary_b p-3 text-primary transition-colors hover:bg-opacity-70 group-hover:bg-opacity-70">
                        <FaShare />
                    </span>
                </Tooltip>
            </CardFooter>
        </Card >
    );
}