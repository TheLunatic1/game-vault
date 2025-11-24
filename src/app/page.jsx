// src/app/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/autoplay";

export default function Home() {
  const [user, loadingAuth] = useAuthState(auth);
  const [latestGames, setLatestGames] = useState([]);
  const [stats, setStats] = useState({ totalGames: 0, totalUsers: 0, topGenre: "Loading..." });
  const [topGame, setTopGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // YOUR ORIGINAL PARTICLES CODE – 100% UNCHANGED
  const [particles] = useState(() =>
    Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 20,
    }))
  );

  useEffect(() => {
    // Fetch everything in parallel
    Promise.all([
      fetch("/api/games?limit=10").then(r => r.json()),
      fetch("/api/stats").then(r => r.json()),
      fetch("/api/games?sort=popularity").then(r => r.json())
    ])
      .then(([latest, statsData, popular]) => {
        const sortedLatest = Array.isArray(latest)
          ? latest.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
          : [];
        setLatestGames(sortedLatest);
        setStats(statsData);
        setTopGame(Array.isArray(popular) ? popular[0] : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

  return (
    <>
      {/* 1. HERO */}
      <section className="relative h-screen max-h-[600px] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Game Vault
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-4xl text-white mb-12 font-light opacity-90 drop-shadow-lg"
          >
            Your Gaming Legacy Lives Here
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/games" className="btn btn-primary btn-lg text-xl px-16 shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition">
                Explore Vault
              </Link>
              {user ? (
                <Link href="/add-game" className="btn btn-accent btn-lg text-xl px-16 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition">
                  Add Game Now
                </Link>
              ) : (
                <button onClick={handleLogin} className="btn btn-outline btn-lg text-xl px-16 border-4 text-white hover:bg-white hover:text-black shadow-2xl transform hover:scale-105 transition">
                  Login to Build
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Your original particles – untouched */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-60 blur-md"
            style={{ left: `${p.x}vw` }}
            initial={{ y: "100vh" }}
            animate={{ y: "-100px" }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </section>

      {/* 2. LATEST GAMES SLIDER */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12">Latest Additions</h2>
          {latestGames.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
              spaceBetween={30}
            >
              {latestGames.map((game) => (
                <SwiperSlide key={game._id}>
                  <Link href={`/games/${game._id}`}>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                      <Image src={game.image || "/placeholder.jpg"} alt={game.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold">{game.title}</h3>
                        <p className="text-sm opacity-80">by {game.userName?.split(" ")[0] || "Gamer"}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-2xl opacity-60">No games yet. Be the first!</p>
          )}
        </div>
      </section>

      {/* 3. TOP GAME OF THE WEEK (NEW) */}
      {topGame && (
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="text-5xl font-bold mb-6">Top Game This Week</h2>
              <h3 className="text-4xl font-bold mb-4">{topGame.title}</h3>
              <p className="text-xl opacity-90 mb-6">Added by {topGame.userName?.split(" ")[0]}</p>
              <Link href={`/games/${topGame._id}`} className="btn btn-neutral btn-lg">
                View Game →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src={topGame.image} alt={topGame.title} fill className="object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. LIVE STATS (NEW + FULLY DYNAMIC) */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Vault Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="stats shadow-2xl bg-base-100"
            >
              <div className="stat">
                <div className="stat-title">Total Games</div>
                <div className="stat-value text-primary">{stats.totalGames}</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="stats shadow-2xl bg-base-100"
            >
              <div className="stat">
                <div className="stat-title">Active Users</div>
                <div className="stat-value text-secondary">{stats.totalUsers}</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="stats shadow-2xl bg-base-100"
            >
              <div className="stat">
                <div className="stat-title">Most Popular Genre</div>
                <div className="stat-value text-accent">{stats.topGenre || "N/A"}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-16">Why Game Vault?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Real Database", desc: "MongoDB Atlas – data survives forever" },
              { title: "Full-Stack", desc: "Next.js + Firebase + Real CRUD" },
              { title: "Stunning UI", desc: "Auto-slider, animations, particles" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="card bg-base-200 shadow-2xl p-10 hover:shadow-3xl transition-all hover:-translate-y-4 border border-base-300"
              >
                <h3 className="text-3xl font-bold mb-4 text-primary">{f.title}</h3>
                <p className="text-xl opacity-80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}