import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/connectMongoose";
import PreviaUser from "@/models/PreviaUser";

export async function POST(req) {

    try {
        await connectMongoDB();
        const { attendands, photos  } = await req.json();

        // Crear un objeto updatedData combinando formData y age
        const updatedData = {
            attendands:attendands,
            photos: photos,
            pass_code: generated_pass_code,
        };

        const newPreviaUser = await PreviaUser.create(updatedData);
        console.log('newReq:', newPreviaUser);
        return NextResponse.json({ newPreviaUser });

    } catch (error) {
        console.log('error', error)
    }
}