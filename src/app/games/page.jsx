
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AllGames() {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Dummy data for games
  const games = [
    { id: 1, title: "The Witcher 3", genre: "RPG", platform: "PC/PS5", rating: 9.8, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg" },
    { id: 2, title: "Cyberpunk 2077", genre: "RPG", platform: "PC/PS5", rating: 8.7, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg" },
    { id: 3, title: "Red Dead Redemption 2", genre: "Action", platform: "PC/PS5", rating: 9.7, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzm.jpg" },
    { id: 4, title: "Elden Ring", genre: "RPG", platform: "PC/PS5", rating: 9.6, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b7v.jpg" },
    { id: 5, title: "Hades", genre: "Roguelike", platform: "PC/Switch", rating: 9.4, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzn.jpg" },
    { id: 6, title: "God of War Ragnarök", genre: "Action", platform: "PS5", rating: 9.5, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5y0w.jpg" },
    { id: 7, title: "Stardew Valley", genre: "Simulation", platform: "PC/Switch", rating: 9.2, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzl.jpg" },
    { id: 8, title: "Hollow Knight", genre: "Metroidvania", platform: "PC/Switch", rating: 9.5, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzj.jpg" },
  ];

  const filtered = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || game.genre === category)
  );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">All Games</h1>
        <p className="text-center text-xl mb-10 opacity-80">Discover amazing games from the community</p>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          <input
            type="text"
            placeholder="Search games..."
            className="input input-bordered input-lg w-full max-w-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="select select-bordered select-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Genres</option>
            <option>RPG</option>
            <option>Action</option>
            <option>Roguelike</option>
            <option>Simulation</option>
            <option>Metroidvania</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer">
                <figure className="h-64 overflow-hidden">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg">{game.title}</h2>
                  <div className="flex justify-between text-sm opacity-70">
                    <span>{game.genre}</span>
                    <span>{game.platform}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-bold">{game.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl opacity-60">No games found 😢</p>
          </div>
        )}
      </div>
    </div>
  );
}