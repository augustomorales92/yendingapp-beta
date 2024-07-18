import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/auth.config'

export async function GET(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  const emailWanted = session?.user?.email || ''
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const previas = await prisma.previas.findMany({
      where: {
        creator: {
          equals: emailWanted
        }
      }
    })

    return NextResponse.json({ previas }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}
