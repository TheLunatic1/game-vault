import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getGame(id) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/games/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Game not found");
  return res.json();
}

export default async function GameDetails({ params }) {
  const { id } = params;
  let game = null;
  let error = null;

  try {
    game = await getGame(id);
  } catch (err) {
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

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start">
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

            <p className="text-xl leading-relaxed opacity-90">{game.description}</p>

            {game.developer && (
              <p className="text-lg">
                <span className="font-semibold">Developer:</span> {game.developer}
              </p>
            )}

            <p className="text-sm opacity-60 pt-8">
              Added on {new Date(game.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-10">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={game.image || "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wzo.jpg"}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">{game.title}</h1>
            <p className="text-xl opacity-70">by {game.userName || "Gamer"}</p>

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