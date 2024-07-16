import { connectMongoDB } from '@/lib/connectMongoose'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/authOptions'

// actualizacion de el model User , añadiendo las previas que ha solicitado unirse .. modificamos el array previa_requests
export async function PUT(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const emailWanted = session?.user.email

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectMongoDB()
    const { previaId } = await req.json()

    const user_data = await User.findOneAndUpdate(
      { email: emailWanted },
      { $push: { previas_requests: previaId } },
      { new: true }
    )

    if (!user_data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user_data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
