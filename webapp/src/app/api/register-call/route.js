import { registerCall } from "@/utils/server/retell";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    console.log('calling register-call')
    console.log(req.method)
    console.log('req body:', req.body)
    const body = JSON.parse((await req.json()).body)
    console.log('body:', body)
    const response = await registerCall(body);
    return NextResponse.json(response)
}