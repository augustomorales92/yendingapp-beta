'use client'
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function PreviasJoinRequests() {

    return (
        <Link href="/dashboard/previas/manage-requests">
            <Card className="bg-primary_b hover:bg-primary_b/60 text-secondary_b">
                <CardBody>
                    <Typography variant="h4" className="mb-2 text-secondary">
                        JOIN REQUESTS
                    </Typography>
                    <Typography>
                        Users who want to join your Previas!. View the requests you have pending approval and manage their status.
                    </Typography>
                </CardBody>
            </Card>
        </Link>

    );
}