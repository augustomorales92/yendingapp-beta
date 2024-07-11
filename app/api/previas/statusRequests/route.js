import { connectMongoDB } from "@/lib/connectMongoose";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Previa from "@/models/Previa";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        await connectMongoDB();
        const previas = await Previa.find({ creator: session.user.email });

        const acceptedRequests = [];
        const rejectedRequests = [];

        previas.forEach(previa => {
            previa.join_requests.forEach(joinReq => {
                if (joinReq.status === 'accepted') {
                    acceptedRequests.push({
                        ...joinReq.toObject(),
                        previa_id: previa.previa_id,
                        location: previa.location,
                        date: previa.date,
                    });
                } else if (joinReq.status === 'rejected') {
                    rejectedRequests.push({
                        ...joinReq.toObject(),
                        previa_id: previa.previa_id,
                        location: previa.location,
                        date: previa.date,
                    });
                }
            });
        });

        return NextResponse.json({
            acceptedRequests,
            rejectedRequests,
        });

    } catch (error) {
        console.error('Error fetching status requests:', error);
        return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 }
        );
    }
}