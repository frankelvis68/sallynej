import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  updateLocalProperty,
  deleteLocalProperty,
  getLocalProperties,
} from "@/lib/admin-store";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const list = getLocalProperties();
  const found = list.find((p) => p.slug === slug);
  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(req: Request, { params }: RouteParams) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("sallynej_admin_auth");

  if (auth?.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const body = await req.json();
    const updated = updateLocalProperty(slug, body);
    if (!updated) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, property: updated });
  } catch (err) {
    console.error("Failed to update property:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("sallynej_admin_auth");

  if (auth?.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const success = deleteLocalProperty(slug);
  if (!success) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
