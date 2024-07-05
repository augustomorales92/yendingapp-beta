import { connectMongoDB } from "@/lib/connectMongoose";
import Previa from "@/models/Previa";
import { NextResponse } from "next/server";

export async function GET(request) {
  
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