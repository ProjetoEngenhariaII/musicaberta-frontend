import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import { FavoritesResponseBody } from "@/lib/types";
import { SheetCard } from "@/components/SheetCard";
import StarSheet from "@/components/StarSheet";
import { ResponseUser } from "@/components/Header";
import { cookies } from "next/headers";

export default async function Favorites() {
  const token = cookies().get("token");

  if (!token) {
    redirect("/login");
  }

  const resUser = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const { user } = resUser.data as ResponseUser;

  const res = await api.get(`/favorites`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    params: {
      userId: user.id,
    },
  });

  const { favorites }: FavoritesResponseBody = res.data;

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Meus favoritos</h1>
      <div className="w-full grid grid-cols-2 gap-8">
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
                user={{
                  id: sheet.userId,
                  name: sheet.user.name,
                  avatarUrl: sheet.user.avatarUrl,
                }}
                createdAt={createdAt}
                songWriter={songWriter}
                title={title}
              >
                <StarSheet
                  sheetId={id}
                  sheetTitle={title}
                  favoriteId={favoriteId}
                  userId={user.id}
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
