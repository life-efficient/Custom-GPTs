import { registerCall } from "@/utils/server/retell";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    console.log('calling register-call')
    console.log(req.method)
    // if (req.method === 'POST') {

    //     try {
    return NextResponse.json({ status: 200, message: 'success' })
            // const response = await registerCall(req.body);

            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            // const data = await response.json();
            // res.status(200).json(data);
    //     } catch (error) {
    //         console.error('Error registering call:', error);
    //         res.status(500).json({
    //             message: 'An error occurred while registering the call.',
    //             error: error.message
    //         });
    //     }
    // } else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
}