import { auth } from '@/auth'
import { prisma } from '@/auth.config'
import {  NextResponse } from 'next/server'


export async function GET() {
  const session = await auth()
  const emailWanted = session?.user.email
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const previas = await prisma.previa.find({ creator: emailWanted })

    return NextResponse.json({ previas }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}
