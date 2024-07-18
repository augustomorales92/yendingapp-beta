'use client'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'

export default function MyPreviasReq() {
  return (
    <Link href="/dashboard/previas/my-requests" prefetch scroll={false}>
      <Card
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="bg-primary_b hover:bg-primary_b/60 text-secondary_b"
      >
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h4"
            className="mb-2 text-secondary"
          >
            MY REQUESTS
          </Typography>
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {`View the Previas you've applied to join and find out their status, participants and more.`}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  )
}
