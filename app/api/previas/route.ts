import { prisma } from '@/auth.config'
import {  NextResponse } from 'next/server'

// Trae todas las previas que estan registradas
export async function GET() {
  try {
    const previas = await prisma.previas.findMany()

    return NextResponse.json({ previas }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Ha ocurrido un error' },
      { status: 500 }
    )
  }
}
