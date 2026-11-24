import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getLocalProperties,
  addLocalProperty,
} from "@/lib/admin-store";
import { Property } from "@/types";

export async function GET() {
  const properties = getLocalProperties();
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("sallynej_admin_auth");

  if (auth?.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Auto-generate slug from title if not given
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProperty: Property = {
      id: "prop-" + Date.now(),
      slug,
      title: body.title,
      type: body.type || "house",
      listingType: body.listingType || "sale",
      price: Number(body.price),
      currency: "NGN",
      pricePeriod: body.pricePeriod || "total",
      location: body.location || "Abuja, Nigeria",
      area: body.area || "katampe",
      bedrooms: body.bedrooms ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : undefined,
      sizeSqm: body.sizeSqm ? Number(body.sizeSqm) : undefined,
      description: body.description || "",
      images: Array.isArray(body.images) && body.images.length > 0
        ? body.images
        : [{ src: "/images/hero.jpg", alt: body.title }],
      featured: Boolean(body.featured),
      isSample: false,
    };

    const updated = addLocalProperty(newProperty);
    return NextResponse.json({ success: true, property: newProperty, properties: updated });
  } catch (err) {
    console.error("Error creating property:", err);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
