import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/auth.config";
const { v4: uuidv4 } = require('uuid');


export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const generated_user_id = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10);

        //  CONEXION A LA BASE DE DATOS MONGO y guardo los mensajes que se mandan 
        await prisma.users.create({ email, password:hashedPassword, user_id:generated_user_id});

        return NextResponse.json(
            { message: "Usuario registrado" },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "A ocurrido un error" },
            { status: 500 }
        )

    }
}