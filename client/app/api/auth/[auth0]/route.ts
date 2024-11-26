import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/",
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: "openid profile email offline_access",
    },
  }),

  logout: handleLogout((req: any) => {
    const returnUrl = [
      `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?`,
      `client_id=${process.env.AUTH0_CLIENT_ID}`,
      `&returnTo=${process.env.AUTH0_BASE_URL}`,
    ];

    const url = new URL(req.url);
    const returnTo = url.searchParams.get("returnTo");
    if (returnTo) {
      return {
        returnTo: `${returnUrl.join("")}/${returnTo}`,
      };
    } else {
      return {
        returnTo: "/",
      };
    }
  }),

  onError: async (req: NextRequest) => {
    // Extract error details from the URL
    const url = new URL(req.url);
    const errorType = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description") || "";

    // Handle email verification error
    if (
      errorType === "access_denied" &&
      errorDescription?.includes("verify your email")
    ) {
      return NextResponse.redirect(
        new URL(`/error/verify-email`, process.env.NEXT_PUBLIC_URL || req.url)
      );
    }

    // For other errors, redirect to a general error page
    return NextResponse.redirect(
      new URL(
        `/auth/error?message=${encodeURIComponent(errorDescription)}`,
        process.env.NEXT_PUBLIC_URL || req.url
      )
    );
  },
});
