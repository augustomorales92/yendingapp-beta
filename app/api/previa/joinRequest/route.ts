import { auth } from '@/auth'
import { prisma } from '@/auth.config'
import { NextRequest, NextResponse } from 'next/server'

// Actualizacion de la propiedad join_request de Previa, cuando se hace una solicitud de union
export async function PUT(req: NextRequest, res:NextResponse) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { previaId, joinRequest } = await req.json()

    const previa_data = await prisma.previa.findOneAndUpdate(
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
