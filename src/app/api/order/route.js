import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      address,
      mainQty,
      addonQty,
      includeAddon,
      totalAmount,
    } = body;

    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("kidorabazar");

    const orderId = "KIDO-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      orderId,
      name,
      phone,
      address,
      mainQty,
      addonQty: includeAddon ? addonQty : 0,
      includeAddon,
      totalAmount,
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(newOrder);

    return NextResponse.json(
      { success: true, orderId: orderId, result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
