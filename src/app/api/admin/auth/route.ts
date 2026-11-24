import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("sallynej_admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid administrator credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("sallynej_admin_auth");
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("sallynej_admin_auth");
  return NextResponse.json({ authenticated: auth?.value === "true" });
}
