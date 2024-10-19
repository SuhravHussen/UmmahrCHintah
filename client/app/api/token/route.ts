import { NextResponse } from "next/server";

import { getAccessToken } from "@auth0/nextjs-auth0";
export async function GET() {
  try {
    const token = await getAccessToken();
    return NextResponse.json(token);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      statusCode: 401,
      devMessage: "No token found",
      clientMessage: "Unauthorized",
    });
  }
}
