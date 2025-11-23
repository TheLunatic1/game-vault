// src/app/games/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";

export default function GameDetails({ params }) {
  const { id } = params;

  // Dummy data
  const game = {
    1: { title: "The Witcher 3", genre: "RPG", platform: "PC/PS5", rating: 9.8, year: 2015, developer: "CD Projekt Red", description: "An epic open-world RPG with deep storytelling and breathtaking visuals.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg" },
    2: { title: "Cyberpunk 2077", genre: "RPG", platform: "PC/PS5", rating: 8.7, year: 2020, developer: "CD Projekt Red", description: "Become V, a cyber-enhanced mercenary in Night City.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg" },
    3: { title: "Red Dead Redemption 2", genre: "Action", platform: "PC/PS5", rating: 9.7, year: 2018, developer: "Rockstar Games", description: "An epic tale of life in America's unforgiving heartland.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzm.jpg" },
    4: { title: "Elden Ring", genre: "RPG", platform: "PC/PS5", rating: 9.6, year: 2022, developer: "FromSoftware", description: "Rise, Tarnished, and be guided by grace.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4b7v.jpg" },
    5: { title: "Hades", genre: "Roguelike", platform: "PC/Switch", rating: 9.4, year: 2020, developer: "Supergiant Games", description: "Defy the god of the dead as you hack and slash out of the Underworld.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzn.jpg" },
    6: { title: "God of War Ragnarök", genre: "Action", platform: "PS5", rating: 9.5, year: 2022, developer: "Santa Monica Studio", description: "Kratos and Atreus embark on a mythic journey.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5y0w.jpg" },
    7: { title: "Stardew Valley", genre: "Simulation", platform: "PC/Switch", rating: 9.2, year: 2016, developer: "ConcernedApe", description: "You've inherited your grandfather's old farm plot in Stardew Valley.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzl.jpg" },
    8: { title: "Hollow Knight", genre: "Metroidvania", platform: "PC/Switch", rating: 9.5, year: 2017, developer: "Team Cherry", description: "Explore a vast, ruined kingdom of insects and heroes.", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzj.jpg" },
  }[id] || { title: "Game Not Found", description: "Sorry, this game doesn't exist yet.", image: "/placeholder.jpg" };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/games" className="btn btn-ghost mb-8 inline-flex items-center gap-2">
          ← Back to Games
        </Link>

        {/* Desktop: Portrait Banner Left + Text Right */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Portrait Banner */}
          <div className="col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="col-span-7 space-y-6">
            <h1 className="text-6xl font-bold leading-tight">{game.title}</h1>
            
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary badge-lg">{game.genre}</span>
              <span className="badge badge-secondary badge-lg">{game.platform}</span>
              <span className="badge badge-accent badge-lg">{game.year}</span>
            </div>

            <p className="text-xl leading-relaxed opacity-90">{game.description}</p>

            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold">Developer:</span> {game.developer}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-semibold">Rating:</span>
                <div className="flex items-center gap-2">
                  <span className="text-4xl text-yellow-500">★</span>
                  <span className="text-4xl font-bold">{game.rating || "N/A"}</span>
                  <span className="text-sm opacity-70 self-end">/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Full Width Banner + Text Below */}
        <div className="lg:hidden space-y-8">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">{game.title}</h1>
            
            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-primary badge-lg">{game.genre}</span>
              <span className="badge badge-secondary badge-lg">{game.platform}</span>
              <span className="badge badge-accent badge-lg">{game.year}</span>
            </div>

            <p className="text-lg leading-relaxed opacity-90 px-4">{game.description}</p>

            <div className="space-y-4 text-lg">
              <p><span className="font-semibold">Developer:</span> {game.developer}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-semibold">Rating:</span>
                <div className="flex items-center gap-2">
                  <span className="text-4xl text-yellow-500">★</span>
                  <span className="text-4xl font-bold">{game.rating || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}