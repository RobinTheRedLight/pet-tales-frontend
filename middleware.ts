import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");

  if (!authCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Parse the auth data
    const authData = JSON.parse(authCookie.value);
    console.log(authData);
    // Optionally, validate the token here
    const { user, token } = authData;

    if (!user || !token) {
      throw new Error("Invalid auth data");
    }

    // Proceed with the request
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // Invalid auth data, redirect to login
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
