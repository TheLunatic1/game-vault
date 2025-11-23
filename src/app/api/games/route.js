import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gamevault");
    const games = await db.collection("games").find({}).limit(50).toArray();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const game = await request.json();
    const client = await clientPromise;
    const db = client.db("gamevault");

    const result = await db.collection("games").insertOne({
      ...game,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId, game },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to save game" }, { status: 500 });
  }
}