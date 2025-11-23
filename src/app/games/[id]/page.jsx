import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function GameDetails({ params }) {
  const { id } = params;

  let game = null;
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000"}/api/games/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Game not found");

    game = await res.json();
  } catch (err) {
    error = "Failed to load game details";
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Oops!</h1>
          <p className="text-xl opacity-70">{error || "This game doesn't exist"}</p>
          <Link href="/games" className="btn btn-primary mt-8">
            ← Back to Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/games" className="btn btn-ghost mb-8 inline-flex items-center gap-2">
          ← Back to Games
        </Link>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-start">
          <div className="col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
              <Image
                src={game.image || "/placeholder.jpg"}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="col-span-7 space-y-8">
            <div>
              <h1 className="text-6xl font-bold leading-tight">{game.title}</h1>
              <p className="text-xl opacity-70 mt-2">Added by {game.userName || "Gamer"}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary badge-lg">{game.genre || "Unknown"}</span>
              <span className="badge badge-secondary badge-lg">{game.platform || "PC"}</span>
              {game.year && <span className="badge badge-accent badge-lg">{game.year}</span>}
            </div>

            <p className="text-xl leading-relaxed opacity-90">{game.description}</p>

            {game.developer && (
              <p className="text-lg">
                <span className="font-semibold">Developer:</span> {game.developer}
              </p>
            )}

            <p className="text-sm opacity-60 pt-6">
              Added on {new Date(game.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={game.image || "/placeholder.jpg"}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">{game.title}</h1>
            <p className="text-lg opacity-70">by {game.userName || "Gamer"}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-primary badge-lg">{game.genre || "Unknown"}</span>
              <span className="badge badge-secondary badge-lg">{game.platform || "PC"}</span>
              {game.year && <span className="badge badge-accent badge-lg">{game.year}</span>}
            </div>

            <p className="text-lg leading-relaxed px-4">{game.description}</p>

            <p className="text-sm opacity-60">
              Added {new Date(game.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}