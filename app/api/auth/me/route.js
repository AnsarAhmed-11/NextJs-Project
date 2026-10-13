
import { NextResponse } from "next/server";
import { verifyToken } from "../../../config/auth";

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null, message: "Not logged in" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { user: null, message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: payload.userId,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      { user: null, message: "Authentication failed" },
      { status: 401 }
    );
  }
}