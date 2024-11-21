import { NextResponse } from "next/server";

import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({
        statusCode: 401,
        devMessage: "No token found",
        clientMessage: "Unauthorized",
      });
    }

    if (
      session.accessTokenExpiresAt &&
      session.accessTokenExpiresAt * 1000 < Date.now()
    ) {
      const token = await getAccessToken();
      return NextResponse.json({
        accessToken: token,
      });
    } else {
      const token = session.accessToken;
      return NextResponse.json({
        accessToken: token,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      statusCode: 401,
      devMessage: "No token found",
      clientMessage: "Unauthorized",
    });
  }
}
