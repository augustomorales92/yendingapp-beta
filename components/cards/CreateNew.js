'use client'
import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import Link from "next/link";


export default function CreateNew() {

    return (
        <Link href="/dashboard/previas/new">
            <Card className="bg-primary_b hover:bg-primary_b/60 text-secondary_b">
                <CardBody>
                    <Typography variant="h4" className="mb-2 text-secondary">
                        CREATE A NEW PREVIA
                    </Typography>
                    <Typography>
                        Make your own Previa, set your own conditions and meet with people to breack up the night.
                    </Typography>
                </CardBody>
            </Card>
        </Link>

    );
}