import { connectMongoDB } from "@/lib/connectMongoose";
import Previa from "@/models/Previa";
import { NextResponse } from "next/server";

// Trae todas las previas que estan registradas
export async function GET() {
  
    try {
      await connectMongoDB();
      const previas = await Previa.find();
  
      return NextResponse.json(
        { previas },
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

  // Ruta a la cual envio el array de los Ids de previas request de determinado user y me trae la info de la previa
  export async function POST(req) {
    try {
      const { previas_ids } = await req.json();
  
      if (!Array.isArray(previas_ids) || previas_ids.length === 0) {
        return NextResponse.json(
          { message: "No IDs provided" },
          { status: 400 }
        );
      }
  
      await connectMongoDB();
      const previa_data = await Previa.find({ previa_id: { $in: previas_ids } });
  
      if (!previa_data || previa_data.length === 0) {
        return NextResponse.json(
          { message: "Previa not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { previa_data },
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