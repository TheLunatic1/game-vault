import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET: Fetch single game by ID
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
    console.error("GET /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
  }
}

// PUT: Update (Edit) a game
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("gamevault");

    const result = await db.collection("games").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, modified: result.modifiedCount === 1 });
  } catch (error) {
    console.error("PUT /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
  }
}

// DELETE: Remove a game
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid game ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("gamevault");

    const result = await db.collection("games").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Game deleted" });
  } catch (error) {
    console.error("DELETE /api/games/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
  }
}