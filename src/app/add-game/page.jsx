"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

export default function AddGame() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    genre: "",
    platform: "",
    year: "",
    developer: "",
    description: "",
    image: "",
  });

  if (!loading && !user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("Title and description are required!");
      return;
    }

    const gameData = {
      title: form.title,
      genre: form.genre || "Unknown",
      platform: form.platform || "PC",
      year: form.year || "Unknown",
      developer: form.developer || "Unknown",
      description: form.description,
      image: form.image || "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg",
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
    };

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      if (res.ok) {
        toast.success("Game added to your vault! 🎮");
        router.push("/my-games");
      } else {
        toast.error("Failed to save game");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">Add New Game</h1>
        <p className="text-center text-xl opacity-80 mb-12">Share your favorite game with the vault!</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Game Title *" className="input input-bordered input-lg w-full" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
            <input type="text" placeholder="Genre (e.g. RPG)" className="input input-bordered input-lg w-full" value={form.genre} onChange={(e) => setForm({...form, genre: e.target.value})} />
            <input type="text" placeholder="Platform (e.g. PC, PS5)" className="input input-bordered input-lg w-full" value={form.platform} onChange={(e) => setForm({...form, platform: e.target.value})} />
            <input type="text" placeholder="Release Year" className="input input-bordered input-lg w-full" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} />
            <input type="text" placeholder="Developer" className="input input-bordered input-lg w-full" value={form.developer} onChange={(e) => setForm({...form, developer: e.target.value})} />
            <input type="url" placeholder="Cover Image URL (optional)" className="input input-bordered input-lg w-full" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
          </div>

          <textarea
            placeholder="Description *"
            className="textarea textarea-bordered w-full h-40"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            required
          />

          <div className="flex justify-center gap-4">
            <button type="submit" className="btn btn-primary btn-lg px-12">Add Game</button>
            <button type="button" onClick={() => router.back()} className="btn btn-ghost btn-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}