
import { prisma } from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {email} = await req.json();
        const user = await prisma.user.findOne({email}).select("_id");
        console.log('user:', user);
        return NextResponse.json({ user });

    } catch (error) {
        console.log('error', error)
    }
}