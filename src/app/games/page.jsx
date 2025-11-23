"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AllGames() {
  const [games, setGames] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch ALL games from MongoDB
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Filter games when search/category changes
  useEffect(() => {
    let result = games;

    if (search) {
      result = result.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((g) => g.genre === category);
    }

    setFiltered(result);
  }, [search, category, games]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">All Games</h1>
        <p className="text-center text-xl mb-10 opacity-80">
          Discover games added by the community
        </p>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          <input
            type="text"
            placeholder="Search games..."
            className="input input-bordered input-lg w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered select-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Genres</option>
            <option>RPG</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Simulation</option>
            <option>Strategy</option>
            <option>Horror</option>
            <option>Roguelike</option>
            <option>Metroidvania</option>
          </select>
        </div>

        {/* Games Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl opacity-60">No games found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((game) => (
              <Link key={game._id} href={`/games/${game._id}`}>
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer">
                  <figure className="h-64 overflow-hidden">
                    <Image
                      src={game.image || "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg"}
                      alt={game.title}
                      width={400}
                      height={600}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="card-title text-lg">{game.title}</h2>
                    <div className="flex justify-between text-sm opacity-70">
                      <span>{game.genre || "Unknown"}</span>
                      <span>{game.platform || "PC"}</span>
                    </div>
                    <div className="mt-3 text-xs opacity-60">
                      Added by {game.userName?.split(" ")[0] || "User"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}