import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Game Vault</h3>
        <p className="text-lg opacity-80 mb-6">Your Personal Gaming Collection</p>
        <div className="flex justify-center gap-8 mb-8">
          <Link href="/games" className="link link-primary">All Games</Link>
          <Link href="/my-games" className="link link-primary">My Games</Link>
          <Link href="/add-game" className="link link-primary">Add Game</Link>
        </div>
        <p className="text-sm opacity-60">
          © 2025 Game Vault by <span className="font-bold text-primary">TheLunatic1</span> • Full-Stack Project
        </p>
      </div>
    </footer>
  );
}