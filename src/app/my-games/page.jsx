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
  const [myGames, setMyGames] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Login required");
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch(`/api/games/my?userId=${user.uid}`)
        .then(res => res.json())
        .then(data => {
          setMyGames(data);
          setFetching(false);
        })
        .catch(() => {
          toast.error("Failed to load your games");
          setFetching(false);
        });
    }
  }, [user]);

  if (loading || fetching) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">My Games</h1>
        <p className="text-xl opacity-80 mb-12">Your personal collection</p>

        {myGames.length === 0 ? (
          <div className="py-20">
            <p className="text-3xl mb-8 opacity-60">No games added yet!</p>
            <Link href="/add-game" className="btn btn-primary btn-lg">Add Your First Game</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {myGames.map((game) => (
              <div key={game._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <figure className="h-64 overflow-hidden">
                  <Image src={game.image} alt={game.title} width={400} height={600} className="w-full h-full object-cover hover:scale-110 transition" />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg">{game.title}</h2>
                  <p className="text-sm opacity-70">{game.genre}</p>
                  <div className="card-actions mt-4 flex gap-2">
                    <Link href={`/games/${game._id}`} className="btn btn-primary btn-sm flex-1">
                      View
                    </Link>
                    <Link href={`/edit-game/${game._id}`} className="btn btn-accent btn-sm">
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        if (confirm("Delete this game forever?")) {
                          await fetch(`/api/games/${game._id}`, { method: "DELETE" });
                          toast.success("Game deleted");
                          setMyGames(myGames.filter(g => g._id !== game._id));
                        }
                      }}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}