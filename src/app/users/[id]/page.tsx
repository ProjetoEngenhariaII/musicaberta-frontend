import { ResponseUser } from "@/components/Header";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { FavoritesResponseBody, Sheet } from "@/lib/types";
import { SheetCard } from "@/components/SheetCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StarSheet from "@/components/StarSheet";

export default async function RequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = cookies().get("token");

  if (!token) {
    redirect("/login");
  }

  const responseMe = await api.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const { user: me } = responseMe.data as ResponseUser;

  const responseUser = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const { user } = responseUser.data as ResponseUser;

  const responseSheets = await api.get(`/sheets/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const sheets: Sheet[] = responseSheets.data.sheets;

  const responseFavorites = await api.get(`/favorites`, {
    params: {
      userId: me.id,
    },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const { favorites }: FavoritesResponseBody = responseFavorites.data;

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col items-center gap-8 py-8 px-4">
      <div className="w-full flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-32 h-32 rounded-full"
        />

        <div className="w-full flex flex-col items-center md:items-start gap-4">
          <div className="flex w-full justify-between md:flex-row gap-4 items-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Button className="font-bold">Seguir</Button>
          </div>

          <div className="flex gap-6">
            <span className="text-zinc-700">
              <strong className="text-zinc-900">{30}</strong> seguidores
            </span>
            <span className="text-zinc-700">
              <strong className="text-zinc-900">{123}</strong> seguindo
            </span>
          </div>

          <div className="flex gap-6">
            {user.roles.length !== 0 && (
              <span className="text-zinc-700">
                <strong className="text-zinc-900">
                  {user.roles?.join(", ")}
                </strong>
              </span>
            )}
            {user.instruments.length !== 0 && (
              <span className="text-zinc-700">
                <strong className="text-zinc-900">
                  {user.instruments?.join(", ")}
                </strong>
              </span>
            )}
          </div>

          <p className="text-zinc-700">{user.bio}</p>
        </div>
      </div>

      <div className="w-full max-w-screen-lg">
        <h2 className="text-xl font-bold mb-6">Partituras</h2>

        <div className="grid grid-cols-2 gap-8">
          {sheets.map((sheet) => {
            const { id, badges, createdAt, mp3Url, pdfUrl, songWriter, title } =
              sheet;
            const isFavorited = favorites.find(
              (favorite) => favorite.sheet.id === id
            );

            return (
              <SheetCard.Root
                key={id}
                className={cn({
                  "shadow-blue-600 border-blue-600": isFavorited,
                })}
              >
                <SheetCard.Header
                  createdAt={createdAt}
                  songWriter={songWriter}
                  title={title}
                  user={{
                    id: sheet.userId,
                    name: sheet.user.name,
                    avatarUrl: sheet.user.avatarUrl,
                  }}
                >
                  <StarSheet
                    userId={me.id}
                    sheetId={id}
                    favoriteId={isFavorited?.favoriteId}
                    sheetTitle={title}
                    isFavorited={isFavorited != undefined}
                  />
                </SheetCard.Header>
                <SheetCard.Content badges={badges} />
                <SheetCard.Footer mp3Url={mp3Url} pdfUrl={pdfUrl} />
              </SheetCard.Root>
            );
          })}
        </div>
      </div>
    </div>
  );
}
