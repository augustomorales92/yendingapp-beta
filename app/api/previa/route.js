
import { connectMongoDB } from "@/lib/connectMongoose";
import Previa from "@/models/Previa";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const { v4: uuidv4 } = require('uuid');


export async function POST(req) {

  const session = await getServerSession(authOptions);
  const creator_email = session?.user.email;

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const { formData } = await req.json();
    const generated_previa_id = uuidv4(); 
    const generated_pass_code = uuidv4();
    const creator = creator_email;

    // Crear un objeto updatedData combinando formData y age
    const updatedData = {
      ...formData,
      previa_id: generated_previa_id,
      creator: creator,
      pass_code: generated_pass_code,
    };

    const newPrevia = await Previa.create(updatedData);
    console.log('previa:', newPrevia);
    return NextResponse.json({ newPrevia });

  } catch (error) {
    console.log('error', error)
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const previa_id = searchParams.get('previa_id');

  if (!previa_id) {
    return NextResponse.json(
      { message: "Something happen" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const previa_data = await Previa.findOne({ previa_id });

    if (!previa_data) {
      return NextResponse.json(
        { message: "Previa not found" },
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


export async function PUT(req) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const { formData } = await req.json();
    const previaId = formData.previa_id;
    // Actualizamos los datos de la DB con previa_id 
    const previa_data = await Previa.findOneAndUpdate({ previa_id: previaId }, formData, { new: true });

    if (!previa_data) {
      return NextResponse.json(
        { message: "Previa not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ previa_data });

  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { message: "A ocurrido un error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
      return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
      );
  }

  try {
      await connectMongoDB();
      const { previa_id } = await req.json();

      // Eliminar la previa en la base de datos usando previa_id
      const previa_data = await Previa.findOneAndDelete({ previa_id });

      if (!previa_data) {
          return NextResponse.json(
              { message: "Previa not found" },
              { status: 404 }
          );
      }

      return NextResponse.json(
          { message: "Previa deleted successfully" },
          { status: 200 }
      );

  } catch (error) {
      console.log('error', error);
      return NextResponse.json(
          { message: "A ocurrido un error" },
          { status: 500 }
      );
  }
}