
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/connectMongoose";
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require('uuid');

export async function PUT(request) {

  const session = await getServerSession(authOptions);
  const emailWanted = session?.user.email

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { updatedFormData,previaId } = await request.json();

    // Conexión a la base de datos MongoDB
    await connectMongoDB();
    const user_data = await User.findOne({ email: emailWanted });

    if (!user_data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    };

    // Crear updatedData dependiendo de si user_id ya existe o no
    let updatedData;

    // Verificar si user_id ya existe en user_data
    if (user_data.user_id === null) {
      updatedData = {
        ...updatedFormData,
        user_id: uuidv4(),
      };
    } else {
      updatedData = {
        ...updatedFormData,
      };
    }

    // Actualizar el usuario en la base de datos
    await User.findByIdAndUpdate(user_data._id, updatedData, { new: true });

    // If previaId is provided, update the previas_created array
    if (previaId) {
      await User.findByIdAndUpdate(user_data._id, { $push: { previas_created: previaId } }, { new: true });
    }

    return NextResponse.json(
      { user_data },
      { message: "Usuario modificado" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "A ocurrido un error" },
      { status: 500 }
    );
  }
}



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const user_data = await User.findOne({ email });

    if (!user_data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user_data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Ha ocurrido un error" },
      { status: 500 }
    );
  }
}


