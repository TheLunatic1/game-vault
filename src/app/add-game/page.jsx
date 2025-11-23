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

  // Redirect if not logged in
  if (!loading && !user) {
    router.push("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required!");
      return;
    }

    // Later: Save to MongoDB via API route
    toast.success("Game added successfully! 🎮");
    console.log("New Game:", form);

    // Reset form
    setForm({
      title: "",
      genre: "",
      platform: "",
      year: "",
      developer: "",
      description: "",
      image: "",
    });

    // Optional: redirect
    // router.push("/my-games");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">Add New Game</h1>
        <p className="text-center text-xl opacity-80 mb-12">Share your favorite game with the vault!</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Game Title *</label>
              <input
                type="text"
                className="input input-bordered w-full input-lg"
                placeholder="The Witcher 3"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Genre</label>
              <input
                type="text"
                className="input input-bordered w-full input-lg"
                placeholder="RPG, Action, Simulation..."
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Platform</label>
              <input
                type="text"
                className="input input-bordered w-full input-lg"
                placeholder="PC, PS5, Switch..."
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Release Year</label>
              <input
                type="text"
                className="input input-bordered w-full input-lg"
                placeholder="2023"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Developer</label>
              <input
                type="text"
                className="input input-bordered w-full input-lg"
                placeholder="CD Projekt Red"
                value={form.developer}
                onChange={(e) => setForm({ ...form, developer: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Cover Image URL (Optional)</label>
              <input
                type="url"
                className="input input-bordered w-full input-lg"
                placeholder="https://images.igdb.com/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Description *</label>
            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Tell us why you love this game..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="btn btn-primary btn-lg px-12">
              Add Game to Vault
            </button>
            <button type="button" onClick={() => router.back()} className="btn btn-ghost btn-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}