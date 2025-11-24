import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gamevault");

    // Total games
    const totalGames = await db.collection("games").countDocuments();

    // Total unique users
    const totalUsers = await db.collection("games").distinct("userId").then(arr => arr.length);

    // Most popular genre
    const genreStats = await db.collection("games").aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();

    const topGenre = genreStats[0]?._id || "Unknown";

    return NextResponse.json({
      totalGames,
      totalUsers,
      topGenre,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ totalGames: 0, totalUsers: 0, topGenre: "N/A" });
  }
}