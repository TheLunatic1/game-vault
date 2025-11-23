import HeroClient from "@/components/HeroClient";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO client-only */}
      <HeroClient />

      {/* FEATURE CARDS */}
      <section className="py-20 px-6 bg-base-200">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Game Vault?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "Gamepad", title: "Add Your Games", desc: "Quickly add games you own or love" },
              { icon: "Star", title: "Rate & Review", desc: "Share your honest thoughts" },
              { icon: "Lock", title: "Your Collection", desc: "Only you can manage your vault" }
            ].map((item, i) => (
              <div key={i} className="card bg-base-100 shadow-2xl hover:shadow-primary/50 transition-all hover:-translate-y-2">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="card-title text-2xl">{item.title}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Game Vault</span>
          <p>Your personal gaming archive</p>
        </div>
        <div>
          <span className="footer-title">Links</span>
          <Link href="/games" className="link link-hover">All Games</Link>
          <Link href="/add-game" className="link link-hover">Add Game</Link>
          <Link href="/my-games" className="link link-hover">My Games</Link>
        </div>
        <div>
          <span className="footer-title">Made with Love</span>
          <p>Next.js 15 + Firebase + DaisyUI</p>
        </div>
      </footer>
    </>
  );
}