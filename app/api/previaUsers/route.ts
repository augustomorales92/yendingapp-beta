import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/auth.config'

// Ruta para crear un nuevo Usuario de la previa-
export async function POST(req: NextRequest, res:NextResponse) {
  // necesito el dato del usuario que esta solicitando para enviarlo a la db como user_id del solicitante
  const session = await auth()
  const emailWanted = session?.user.email
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { attendands, photos, intentions, previa_id } = await req.json()

    // Validaciones adicionales
    // if (typeof attendands !== 'number' || !Array.isArray(photos) || typeof intentions !== 'string' || typeof previa_id !== 'string') {
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
    const user_data = await prisma.user.findOne({ email: emailWanted })
    if (!user_data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // con estos datos ya es suficiente para la creación PreviaUser
    const updatedData = {
      attendands: attendands,
      photos: photos,
      previa_id: previa_id,
      intentions: intentions,
      user_id: user_data?.user_id
    }

    const newPreviaUser = await prisma.previaUser.create(updatedData)
    console.log('newReq:', newPreviaUser)
    return NextResponse.json({ newPreviaUser })
  } catch (error) {
    return NextResponse.json({ message: 'Error message' }, { status: 500 })
  }
}

//  Trae las solicitudes de union que hizo el usuario que esta logeado
export async function GET(req: NextRequest, res:NextResponse) {
  const session = await auth()
  const emailWanted = session?.user.email
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userJoinRequests = await prisma.previaUser.find({ creator: emailWanted })

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
export async function PUT(req: NextRequest, res:NextResponse) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { previaId, userId, status } = await req.json()

    const previaUser = await prisma.previaUser.findOne({
      previa_id: previaId,
      user_id: userId
    })

    if (!previaUser) {
      return NextResponse.json(
        { message: 'PreviaUser not found' },
        { status: 404 }
      )
    }

    previaUser.status = status
    await previaUser.save()

    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.error('Error updating PreviaUser status:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
