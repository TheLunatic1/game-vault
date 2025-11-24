// src/app/api/games/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET: Fetch all games (or limited number)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : null;

  try {
    const client = await clientPromise;
    const db = client.db("gamevault");

    let query = db.collection("games").find({}).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const games = await query.toArray();

    return NextResponse.json(games);
  } catch (error) {
    console.error("GET /api/games error:", error);
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}

// POST: Add a new game
export async function POST(request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const newGame = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("gamevault");
    const result = await db.collection("games").insertOne(newGame);

    return NextResponse.json(
      { ...newGame, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/games error:", error);
    return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
  }
}