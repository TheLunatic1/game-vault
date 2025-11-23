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
      .then(() => toast.success("Welcome back, Gamer!"))
      .catch(() => toast.error("Login failed"));
  };

  const handleLogout = () => {
    signOut(auth);
    toast.success("Logged out successfully");
    setMobileOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="navbar bg-base-100 shadow-xl sticky top-0 z-50 px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          <span className="text-primary">Game</span>
          <span className="text-accent">Vault</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          <li><Link href="/games" className="hover:text-primary">All Games</Link></li>
          {user && (
            <>
              <li><Link href="/add-game" className="hover:text-primary">Add Game</Link></li>
              <li><Link href="/my-games" className="hover:text-primary">My Games</Link></li>
            </>
          )}
        </ul>

        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" onChange={toggleTheme} />
          <div className="swap-on">Dark</div>
          <div className="swap-off">Light</div>
        </label>

        {/* User Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "https://i.pravatar.cc/150"} alt="Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 p-4 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300">
              <li className="menu-title pb-2 border-b border-base-300">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user.displayName}</span>
                  <span className="text-sm opacity-70">{user.email}</span>
                </div>
              </li>
              <li><Link href="/dashboard" className="text-lg py-3">Dashboard</Link></li>
              <li><Link href="/my-games" className="py-3">My Games</Link></li>
              <li><Link href="/add-game" className="py-3">Add Game</Link></li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <button onClick={handleLogout} className="text-error hover:bg-error/10 w-full text-left py-3">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={handleLogin} className="btn btn-primary btn-lg">
            Login with Google
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="btn btn-ghost btn-circle">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-base-100 shadow-2xl border-t border-base-300 p-6">
          <ul className="menu space-y-3 text-lg">
            <li><Link href="/games" onClick={() => setMobileOpen(false)}>All Games</Link></li>
            {user && (
              <>
                <li><Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link></li>
                <li><Link href="/my-games" onClick={() => setMobileOpen(false)}>My Games</Link></li>
                <li><Link href="/add-game" onClick={() => setMobileOpen(false)}>Add Game</Link></li>
              </>
            )}
            <li className="pt-4">
              <label className="swap swap-rotate w-full justify-center">
                <input type="checkbox" className="theme-controller" onChange={toggleTheme} />
                <span className="swap-on">Dark Mode</span>
                <span className="swap-off">Light Mode</span>
              </label>
            </li>
            {user ? (
              <>
                <li className="border-t border-base-300 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary">
                        <img src={user.photoURL} alt="User" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{user.displayName}</p>
                      <p className="text-sm opacity-70">{user.email}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error btn-block">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogin} className="btn btn-primary btn-block">
                  Login with Google
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}