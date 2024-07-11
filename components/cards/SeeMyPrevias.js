'use client'
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function SeeMyPrevias() {

    return (
        <Link href="/dashboard/previas/my-previas">
            <Card className="bg-primary_b hover:bg-primary_b/60 text-secondary_b">
                <CardBody>
                    <Typography variant="h4" className="mb-2 text-secondary">
                        MY PREVIAS 
                    </Typography>
                    <Typography>
                        Look at the previews you have created and change conditions if you want to.
                    </Typography>
                </CardBody>
            </Card>
        </Link>

    );
}