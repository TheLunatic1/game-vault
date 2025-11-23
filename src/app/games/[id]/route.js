import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("gamevault");
    const game = await db.collection("games").findOne({ _id: new ObjectId(id) });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
  }
}