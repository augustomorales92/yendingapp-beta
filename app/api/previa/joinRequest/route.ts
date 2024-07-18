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
    const { previaId, joinRequest } = await req.json();

    const previa_data = await prisma.previas.findUnique({
      where: { previa_id: previaId },
    });

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 });
    }

    const updatedPrevia = await prisma.previas.update({
      where: { previa_id: previaId },
      data: {
        join_requests: {
          push: joinRequest,
        },
      },
    });

    return NextResponse.json({ previa_data: updatedPrevia });
  //   const { previaId, joinRequest } = await req.json()

  //   const previa_data = await prisma.previas.findUnique(
  //     { previa_id: previaId },
  //     { $push: { join_requests: joinRequest } },
  //     { new: true }
  //   )

  //   if (!previa_data) {
  //     return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
  //   }

  //   return NextResponse.json({ previa_data })


  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
