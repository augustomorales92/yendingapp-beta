import { prisma } from '@/auth.config'
import { NextResponse, NextRequest } from 'next/server'

// Trae todas las previas que estan registradas
export async function GET(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  const id = session?.user?.userData.user_id || ''
  try {
    const previas = await prisma.previas.findMany({
      where: {
        creator: {
          isNot: {
            user_id: id
          }
        }
      }
    })

    //console.log(previas)
    return NextResponse.json({ previas }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}
