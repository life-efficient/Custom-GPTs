import { registerCall } from "@/utils/server/retell";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    console.log('calling register-call')
    console.log(req.method)
    const response = await registerCall(req.body);
    failedtoregistercallonserver
    console.log('response:', response)
    return NextResponse.json(response)
}