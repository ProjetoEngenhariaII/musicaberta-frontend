import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import { FavoritesResponseBody } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SheetCard } from "@/components/SheetCard";
import StarSheet from "@/components/StarSheet";

export default async function Favorites() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const res = await api.get(`/favorites`, {
    params: {
      userId: session?.user.id,
    },
  });

  const { favorites }: FavoritesResponseBody = res.data;

  return (
    <div className="flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Meus favoritos</h1>
      <div
        className={cn("grid grid-cols-1 gap-6", {
          "md:grid-cols-2": favorites.length > 1,
          "md:grid-cols-1": !(favorites.length > 1),
        })}
      >
        {favorites.map((favorite) => {
          const { favoriteId, sheet } = favorite;
          const { id, createdAt, songWriter, title, badges, mp3Url, pdfUrl } =
            sheet;

          return (
            <SheetCard.Root
              key={id}
              className={"shadow-blue-600 border-blue-600"}
            >
              <SheetCard.Header
                createdAt={createdAt}
                songWriter={songWriter}
                title={title}
              >
                <StarSheet
                  sheetId={id}
                  sheetTitle={title}
                  favoriteId={favoriteId}
                  userId={session.user.id}
                  isFavorited
                />
              </SheetCard.Header>
              <SheetCard.Content badges={badges} />
              <SheetCard.Footer mp3Url={mp3Url} pdfUrl={pdfUrl} />
            </SheetCard.Root>
          );
        })}
        {favorites.length === 0 && <span>Nenhuma partitura encontrada!</span>}
      </div>
    </div>
  );
}
