import { connectMongoDB } from '@/lib/connectMongoose'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Previa from '@/models/Previa'
import { NextRequest, NextResponse } from 'next/server'

// Actualizacion de la propiedad join_request de Previa, cuando se hace una solicitud de union
export async function PUT(req: NextRequest, res:NextResponse) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectMongoDB()
    const { previaId, userId, status } = await req.json()

    const previa_data = await Previa.findOne({ previa_id: previaId })

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
    }

    // Ensure the logged-in user is the creator of the previa
    if (previa_data.creator !== session.user.email) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    // Find the join request by user_id
    const joinRequest = previa_data.join_requests.find(
      (req) => req.user_id === userId
    )
    if (!joinRequest) {
      return NextResponse.json(
        { message: 'Join request not found' },
        { status: 404 }
      )
    }

    joinRequest.status = status
    await previa_data.save()

    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
