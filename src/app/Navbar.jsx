"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => toast.success("Logged in!"))
      .catch(() => toast.error("Login failed"));
  };

  const handleLogout = () => {
    signOut(auth);
    toast.success("Logged out");
  };

  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          <span className="text-primary">Game</span>
          <span className="text-accent">Vault</span>
        </Link>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/games">All Games</Link></li>
          {user && (
            <>
              <li><Link href="/add-game">Add Game</Link></li>
              <li><Link href="/my-games">My Games</Link></li>
            </>
          )}
        </ul>

        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" onChange={toggleTheme} />
          <div className="swap-on">Dark</div>
          <div className="swap-off">Light</div>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary">
                <img src={user.photoURL || "https://i.pravatar.cc/150"} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><div>{user.displayName}</div></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <button onClick={handleLogin} className="btn btn-primary">
            Login with Google
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="btn btn-ghost">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-base-100 shadow-lg p-4">
          <ul className="menu space-y-2">
            <li><Link href="/games" onClick={() => setMobileOpen(false)}>All Games</Link></li>
            {user && (
              <>
                <li><Link href="/add-game" onClick={() => setMobileOpen(false)}>Add Game</Link></li>
                <li><Link href="/my-games" onClick={() => setMobileOpen(false)}>My Games</Link></li>
              </>
            )}
            <li><button onClick={handleLogin} className="btn btn-primary btn-sm w-full">Login</button></li>
            {user && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div>
      )}
    </div>
  );
}