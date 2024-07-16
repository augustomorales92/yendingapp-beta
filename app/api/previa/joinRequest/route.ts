import { connectMongoDB } from '@/lib/connectMongoose'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Previa from '@/models/Previa'
import { NextResponse } from 'next/server'

// Actualizacion de la propiedad join_request de Previa, cuando se hace una solicitud de union
export async function PUT(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectMongoDB()
    const { previaId, joinRequest } = await req.json()

    const previa_data = await Previa.findOneAndUpdate(
      { previa_id: previaId },
      { $push: { join_requests: joinRequest } },
      { new: true }
    )

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
    }

    return NextResponse.json({ previa_data })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
