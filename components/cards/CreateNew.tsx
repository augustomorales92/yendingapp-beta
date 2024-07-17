import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";
import Link from "next/link";


export default function CreateNew() {

    return (
        <Link href="/dashboard/previas/new">
            <Card className="bg-primary_b hover:bg-primary_b/60 text-secondary_b"
             placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Typography variant="h4" className="mb-2 text-secondary"
                     placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        CREATE A NEW PREVIA
                    </Typography>
                    <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Make your own Previa, set your own conditions and meet with people to break up the night.
                    </Typography>
                </CardBody>
            </Card>
        </Link>

    );
}