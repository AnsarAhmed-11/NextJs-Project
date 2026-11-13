import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {

    const { nextUrl } = req;
    const session = req.auth;
    console.log("user session", session)
    console.log("nexturl here", nextUrl)
    const path = nextUrl.pathname
    const isLogin = session?.user
    // Protected routes
    if (
        path.startsWith("/superAdmin") ||
        path.startsWith("/dashboard") ||
        path.startsWith("/superAdmin/products")
    ) {
        //check login status
        if (!isLogin) {
            return NextResponse.redirect(
                new URL("/login", req.url)
            );
        }
        if (path.startsWith("/superAdmin")) {
            if (session?.user?.role !== "Super_Admin" || session?.user?.role === "User" || session?.user?.role === "Admin") {
                return NextResponse.redirect(
                    new URL("/unauthorized", req.url)
                )
            }
        }
        if (path.startsWith("/superAdmin/products")) {
            if (session?.user?.role !== "Super_Admin" && session?.user?.role !== "Admin") {
                return NextResponse.redirect(
                    new URL("/Unauthorized for Users", req.url)
                )
            }
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/admin/:path*",
        "/superAdmin/:path*",
        "/dashboard/:path*",
    ],
};
