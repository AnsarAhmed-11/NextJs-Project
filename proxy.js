import { NextResponse } from "next/server";
import { verifyToken } from "./app/config/auth";

export async function proxy(request) {
    const token = request.cookies.get("token")?.value;
    const path = request.nextUrl.pathname;

    // Protected routes
    if (
        path.startsWith("/admin") ||
        path.startsWith("/superAdmin") ||
        path.startsWith("/dashboard") ||
        path.startsWith("/superAdmin/products")
    ) {
        // No token
        if (!token) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }

        // Verify JWT
        const user = await verifyToken(token);

        if (!user) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }
        // Super Admin can access superAdmin
        if (
            path.startsWith("/superAdmin") &&
            user.role !== "Super_Admin"
        ) {
            return NextResponse.redirect(
                new URL("/unauthorized", request.url)
            );
        }

        // Admin can access admin
        if (
            path.startsWith("/Admin") &&
            user.role !== "Admin" &&
            user.role !== "Super_Admin"
        ) {
            return NextResponse.redirect(
                new URL("/SignIn", request.url)
            );
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/superAdmin/:path*",
        "/dashboard/:path*",
    ],
};
