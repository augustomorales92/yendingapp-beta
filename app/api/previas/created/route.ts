import { NextResponse } from 'next/server'
import { prisma } from '@/auth.config'
import { auth } from '@/auth'

export const GET = auth(async function (req) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  const email = session?.user?.email || ''

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const previas = await prisma.previas.findMany({
      where: {
        creator: {
          is: {
            email: email,
          }
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
})
