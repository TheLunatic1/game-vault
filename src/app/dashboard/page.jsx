"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Redirect if not logged in
  if (!loading && !user) {
    router.push("/");
    return null;
  }

  const myGamesCount = 3; // Later from MongoDB
  const totalPlaytime = 842; // hours

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="Profile" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold">Welcome back, {user?.displayName?.split(" ")[0] || "Gamer"}!</h1>
              <p className="text-xl opacity-70">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut(auth).then(() => router.push("/"))}
            className="btn btn-outline btn-error"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="stats shadow bg-primary text-primary-content">
            <div className="stat">
              <div className="stat-title text-white">Games in Vault</div>
              <div className="stat-value">{myGamesCount}</div>
              <div className="stat-desc text-white/80">Your collection</div>
            </div>
          </div>

          <div className="stats shadow bg-accent text-accent-content">
            <div className="stat">
              <div className="stat-title text-white">Total Playtime</div>
              <div className="stat-value">{totalPlaytime}h</div>
              <div className="stat-desc text-white/80">Across all games</div>
            </div>
          </div>

          <div className="stats shadow bg-secondary text-secondary-content">
            <div className="stat">
              <div className="stat-title text-white">Member Since</div>
              <div className="stat-value">2025</div>
              <div className="stat-desc text-white/80">Proud gamer</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/my-games" className="btn btn-primary btn-lg">
            My Games
          </Link>
          <Link href="/add-game" className="btn btn-accent btn-lg">
            Add New Game
          </Link>
          <Link href="/games" className="btn btn-secondary btn-lg">
            Browse All Games
          </Link>
          <button onClick={() => toast.success("Coming soon!")} className="btn btn-ghost btn-lg border-2">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}