import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const values = await req.json();
    console.log(values);
    return NextResponse.json({ok: true, from: "from api folder"})
}