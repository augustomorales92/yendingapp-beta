import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/auth.config'

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

    const acceptedRequests = []
    const rejectedRequests = []

    previas.forEach((previa) => {
      previa.join_requests.forEach((joinReq) => {
        if (joinReq.status === 'accepted') {
          acceptedRequests.push({
            ...joinReq.toObject(),
            previa_id: previa.previa_id,
            location: previa.location,
            date: previa.date
          })
        } else if (joinReq.status === 'rejected') {
          rejectedRequests.push({
            ...joinReq.toObject(),
            previa_id: previa.previa_id,
            location: previa.location,
            date: previa.date
          })
        }
      })
    })

    return NextResponse.json({
      acceptedRequests,
      rejectedRequests
    })
  } catch (error) {
    console.error('Error fetching status requests:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
