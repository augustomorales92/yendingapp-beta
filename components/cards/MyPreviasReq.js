'use client'
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function MyPreviasReq() {

    return (
        <Link href="/dashboard/previas/my-requests">
            <Card className="bg-primary_b hover:bg-primary_b/60 text-secondary_b">
                <CardBody>
                    <Typography variant="h4" className="mb-2 text-secondary">
                        MY REQUESTS
                    </Typography>
                    <Typography>
                        {`View the Previas you've applied to join and find out their status, participants and more.`}
                    </Typography>
                </CardBody>
            </Card>
        </Link>

    );
}