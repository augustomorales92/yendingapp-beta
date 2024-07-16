import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/auth.config'
const { v4: uuidv4 } = require('uuid')

export async function POST(req: NextRequest, res:NextResponse) {
  const session = await auth()
  const creator_email = session?.user.email

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { formData } = await req.json()
    const generated_previa_id = uuidv4()
    const generated_pass_code = uuidv4()
    const creator = creator_email

    // Crear un objeto updatedData combinando formData y age
    const updatedData = {
      ...formData,
      previa_id: generated_previa_id,
      creator: creator,
      pass_code: generated_pass_code
    }

    const newPrevia = await prisma.previa.create(updatedData)
    console.log('previa:', newPrevia)
    return NextResponse.json({ newPrevia })
  } catch (error) {
    console.log('error', error)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const previa_id = searchParams.get('previa_id')

  if (!previa_id) {
    return NextResponse.json({ message: 'Something happen' }, { status: 400 })
  }

  try {
    const previa_data = await prisma.previa.findOne({ previa_id })

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
    }

    return NextResponse.json({ previa_data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, res:NextResponse) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { formData } = await req.json()
    const previaId = formData.previa_id
    // Actualizamos los datos de la DB con previa_id
    const previa_data = await prisma.previa.findOneAndUpdate(
      { previa_id: previaId },
      formData,
      { new: true }
    )

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
    }

    return NextResponse.json({ previa_data })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(
      { message: 'A ocurrido un error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, res:NextResponse) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { previa_id } = await req.json()

    // Eliminar la previa en la base de datos usando previa_id
    const previa_data = await prisma.previa.findOneAndDelete({ previa_id })

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Previa deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log('error', error)
    return NextResponse.json(
      { message: 'A ocurrido un error' },
      { status: 500 }
    )
  }
}
