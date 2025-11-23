import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // Always fetch fresh data

export default async function GameDetails({ params }) {
  const { id } = params;

  let game = null;
  let error = null;

  try {
    // Correct API path: /api/games/[id]/route.js
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/games/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Game not found");
    }

    game = await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    error = "Failed to load game details";
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold mb-6 text-error">Oops!</h1>
          <p className="text-xl opacity-80 mb-8">
            {error || "This game doesn't exist or was removed"}
          </p>
          <Link href="/games" className="btn btn-primary btn-lg">
            ← Back to All Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/games" className="btn btn-ghost mb-8 inline-flex items-center gap-2 text-lg">
          ← Back to Games
        </Link>

        {/* Desktop: Portrait Left + Info Right */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Cover */}
          <div className="col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/30">
              <Image
                src={game.image || "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg"}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="col-span-7 space-y-8">
            <div>
              <h1 className="text-6xl font-bold leading-tight">{game.title}</h1>
              <p className="text-2xl opacity-70 mt-3">
                Added by <span className="font-semibold text-primary">{game.userName || "Anonymous Gamer"}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="badge badge-primary badge-lg text-lg px-4 py-3">{game.genre || "Unknown"}</span>
              <span className="badge badge-secondary badge-lg text-lg px-4 py-3">{game.platform || "PC"}</span>
              {game.year && <span className="badge badge-accent badge-lg text-lg px-4 py-3">{game.year}</span>}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed opacity-90 whitespace-pre-wrap">{game.description}</p>
            </div>

            {game.developer && (
              <div className="text-lg">
                <span className="font-bold">Developer:</span> {game.developer}
              </div>
            )}

            <div className="pt-8 text-sm opacity-60">
              Added on{" "}
              {new Date(game.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Cover Top + Info Below */}
        <div className="lg:hidden space-y-10">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={game.image || "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg"}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-center space-y-6">
            <div>
              <h1 className="text-5xl font-bold">{game.title}</h1>
              <p className="text-xl opacity-70 mt-3">
                by <span className="text-primary font-semibold">{game.userName || "Gamer"}</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-primary badge-lg text-lg px-4 py-3">{game.genre || "Unknown"}</span>
              <span className="badge badge-secondary badge-lg text-lg px-4 py-3">{game.platform || "PC"}</span>
              {game.year && <span className="badge badge-accent badge-lg text-lg px-4 py-3">{game.year}</span>}
            </div>

            <p className="text-lg leading-relaxed px-6 opacity-90">{game.description}</p>

            <p className="text-sm opacity-60 pt-6">
              Added {new Date(game.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}