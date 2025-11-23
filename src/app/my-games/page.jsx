"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MyGames() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Dummy data (later from MongoDB with userId)
  const [myGames, setMyGames] = useState([
    { id: 1, title: "The Witcher 3", genre: "RPG", rating: 9.8, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg" },
    { id: 4, title: "Elden Ring", genre: "RPG", rating: 9.6, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b7v.jpg" },
    { id: 8, title: "Hollow Knight", genre: "Metroidvania", rating: 9.5, image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzj.jpg" },
  ]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to view your games");
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">My Games</h1>
          <p className="text-xl opacity-80">Your personal collection in the vault</p>
        </div>

        {myGames.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-9xl mb-8 opacity-30">Empty</div>
            <p className="text-2xl mb-8 opacity-70">You haven&apos;t added any games yet!</p>
            <Link href="/add-game" className="btn btn-primary btn-lg">
              Add Your First Game
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {myGames.map((game) => (
                <div key={game.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                  <figure className="h-64 overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.title}
                      width={400}
                      height={600}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="card-title text-lg">{game.title}</h2>
                    <p className="text-sm opacity-70">{game.genre}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500">Star</span>
                      <span className="font-bold">{game.rating}</span>
                    </div>
                    <div className="card-actions mt-4">
                      <Link href={`/games/${game.id}`} className="btn btn-primary btn-sm w-full">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/add-game" className="btn btn-accent btn-lg">
                Add Another Game
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}