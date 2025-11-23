"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider } from "firebase/auth";

export default function HeroClient() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="hero min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="hero-content text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <section className="hero min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white relative overflow-hidden">
      <div className="hero-content text-center z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Game Vault</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Your personal collection of favorite games. Add, manage, and showcase your gaming journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/games" className="btn btn-primary btn-lg text-lg">
              Explore Games
            </Link>
            {user ? (
              <Link href="/add-game" className="btn btn-accent btn-lg text-lg">
                Add Your Game
              </Link>
            ) : (
              <button className="btn btn-outline btn-lg text-lg border-white hover:bg-white hover:text-black" onClick={() => auth.signInWithPopup(new GoogleAuthProvider())}>
                Login to Start
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </section>
  );
}