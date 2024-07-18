import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/auth.config'


interface AcceptedRequest {
  user_id: string;
  attendands: number;
  intentions: string;
  photos: string[];
  status: string;
  previa_id: string;
  location: string;
  date: Date;
}

interface RejectedRequest extends AcceptedRequest {}

export async function GET() {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const previas = await prisma.previas.findMany({
      where: {
        creator:{
          equals:session?.user?.email || ''
        } 
      }
    })

    const acceptedRequests: AcceptedRequest[] = [];
    const rejectedRequests: RejectedRequest[] = [];

    previas.forEach((previa) => {
      previa.join_requests.forEach((joinReq) => {
        const request = {
          user_id: joinReq.user_id,
          attendands: joinReq.attendands,
          intentions: joinReq.intentions,
          photos: joinReq.photos,
          status: joinReq.status,
          previa_id: previa.previa_id,
          location: previa.location,
          date: previa.date,
        };

        if (joinReq.status === 'accepted') {
          acceptedRequests.push(request);
        } else if (joinReq.status === 'rejected') {
          rejectedRequests.push(request);
        }
      });
    });

    // previas.forEach((previa) => {
    //   previa.join_requests.forEach((joinReq) => {
    //     if (joinReq.status === 'accepted') {
    //       acceptedRequests.push({
    //         ...joinReq.toObject(),
    //         previa_id: previa.previa_id,
    //         location: previa.location,
    //         date: previa.date
    //       })
    //     } else if (joinReq.status === 'rejected') {
    //       rejectedRequests.push({
    //         ...joinReq.toObject(),
    //         previa_id: previa.previa_id,
    //         location: previa.location,
    //         date: previa.date
    //       })
    //     }
    //   })
    // })

    return NextResponse.json({
      acceptedRequests,
      rejectedRequests
    })
  } catch (error) {
    console.error('Error fetching status requests:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
