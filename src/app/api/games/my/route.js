import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("gamevault");
    const games = await db
      .collection("games")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch your games" }, { status: 500 });
  }
}