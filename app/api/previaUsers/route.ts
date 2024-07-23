import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/auth.config'

// Ruta para crear un nuevo Usuario de la previa-
export async function POST(req: NextRequest, res: NextResponse) {
  // necesito el dato del usuario que esta solicitando para enviarlo a la db como user_id del solicitante
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  const emailWanted = session?.user?.email || ''
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { attendants, photos, intentions, previa_id } = await req.json()

    // Validaciones adicionales
    // if (typeof attendants !== 'number' || !Array.isArray(photos) || typeof intentions !== 'string' || typeof previa_id !== 'string') {
    //     return NextResponse.json(
    //         { message: "Invalid data types" },
    //         { status: 400 }
    //     );
    // }

    // if (photos.length === 0 || intentions.trim() === '' || previa_id.trim() === '') {
    //     return NextResponse.json(
    //         { message: "All fields must be filled" },
    //         { status: 400 }
    //     );
    // }

    // busco el id del usuario solicitante con el email
    const user_data = await prisma.users.findUnique({
      where: {
        email: emailWanted
      }
    })
    if (!user_data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // con estos datos ya es suficiente para la creación PreviaUser
    const updatedData = {
      attendants: attendants,
      photos: photos,
      previa_id: previa_id,
      intentions: intentions,
      user_id: user_data?.user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Puse estos dos nose que onda
      status: 'sent',
      v: 0
    }

    const newPreviaUser = await prisma.previausers.create({ data: updatedData })
    console.log('newReq:', newPreviaUser)

    await prisma.users.update({
      where: {
        email: emailWanted
      },
      data: {
        previas_requests: {
          push: previa_id // hago el push a la prop previas_requests
        }
      }
    })

    await prisma.previas.update({
      where: { previa_id },
      data: {
        join_requests: {
          push: newPreviaUser
        }
      }
    })

    return NextResponse.json({ newPreviaUser })
  } catch (error) {
    return NextResponse.json({ message: 'Error message' }, { status: 500 })
  }
}

//  Trae las solicitudes de union que hizo el usuario que esta logeado
export async function GET(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  const emailWanted = session?.user?.email || ''
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userJoinRequests = await prisma.previas.findMany({
      where: {
        creator: emailWanted
      }
    })

    return NextResponse.json({ userJoinRequests }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}

//  modifico el status de PreviaUsers cuando el dueño de la previa cambia el mismo
export async function PUT(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userId = session?.user?.id as string

  try {
    const { previaId, status }: { previaId: string; status: string } =
      await req.json()

    const previaUser = await prisma.previausers.findUnique({
      where: {
        user_id: userId
      }
    })

    if (!previaUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updatedStatusPrev = await prisma.previausers.update({
      where: {
        user_id: userId
      },
      data: {
        status: status
      }
    })

    // MONGO

    // const previaUser = await prisma.previausers.findOne({
    //   previa_id: previaId,
    //   user_id: userId
    // })

    // if (!previaUser) {
    //   return NextResponse.json(
    //     { message: 'PreviaUser not found' },
    //     { status: 404 }
    //   )
    // }

    // previaUser.status = status
    // await previaUser.save()

    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.error('Error updating PreviaUser status:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
