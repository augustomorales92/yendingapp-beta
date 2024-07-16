import { connectMongoDB } from '@/lib/connectMongoose'
import Previa from '@/models/Previa'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/authOptions'
import User from '@/models/User'

export async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const emailWanted = session?.user.email
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectMongoDB()
    const previas = await Previa.find({ creator: emailWanted })

    return NextResponse.json({ previas }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}
