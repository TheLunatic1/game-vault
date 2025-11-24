// src/app/edit-game/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

export default function EditGame({ params }) {
  const { id } = params;
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    genre: "",
    platform: "",
    year: "",
    developer: "",
    description: "",
    image: "",
  });

  // Define fetchGame BEFORE using it
  const fetchGame = async () => {
    try {
      const res = await fetch(`/api/games/${id}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Only allow owner to edit
      if (data.userId !== user?.uid) {
        toast.error("You can only edit your own games!");
        router.push("/my-games");
        return;
      }

      setGame(data);
      setForm({
        title: data.title || "",
        genre: data.genre || "",
        platform: data.platform || "",
        year: data.year || "",
        developer: data.developer || "",
        description: data.description || "",
        image: data.image || "",
      });
    } catch (err) {
      toast.error("Game not found");
      router.push("/my-games");
    } finally {
      setLoading(false);
    }
  };

  // Run when user is ready
  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      router.push("/");
    } else {
      fetchGame();
    }
  }, [user, loadingAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Game updated successfully! 🎮");
      router.push("/my-games");
    } else {
      toast.error("Failed to update game");
    }
  };

  if (loadingAuth || loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">Edit Game</h1>
        <p className="text-center text-xl opacity-80 mb-12">
          Update your game details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Game Title *"
              className="input input-bordered input-lg w-full"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Genre (e.g. RPG, Action)"
              className="input input-bordered input-lg w-full"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Platform (e.g. PC, PS5)"
              className="input input-bordered input-lg w-full"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            />
            <input
              type="text"
              placeholder="Release Year"
              className="input input-bordered input-lg w-full"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
            <input
              type="text"
              placeholder="Developer"
              className="input input-bordered input-lg w-full"
              value={form.developer}
              onChange={(e) => setForm({ ...form, developer: e.target.value })}
            />
            <input
              type="url"
              placeholder="Cover Image URL (optional)"
              className="input input-bordered input-lg w-full"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Description *"
            className="textarea textarea-bordered w-full h-48 text-lg"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <div className="flex justify-center gap-6">
            <button type="submit" className="btn btn-primary btn-lg px-12">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.push("/my-games")}
              className="btn btn-ghost btn-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}