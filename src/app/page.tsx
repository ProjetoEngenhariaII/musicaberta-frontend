import { api } from "@/lib/axios";
import { FavoritesResponseBody, SheetsResponseBody } from "@/lib/types";
import SearchInput from "@/components/SearchInput";
import { FilterDropDown } from "@/components/FilterDropDown";
import { Pagination } from "@/components/Pagination";
import { SheetCard } from "@/components/SheetCard";
import StarSheet from "@/components/StarSheet";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ResponseUser } from "@/components/Header";

type HomeProps = {
  searchParams: { search?: string; sort?: string; page?: number };
};

export default async function Home({ searchParams }: HomeProps) {
  const token = cookies().get("token");

  if (!token) {
    redirect("/login");
  }

  const resUser = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const { user } = resUser.data as ResponseUser;

  const { data, meta }: SheetsResponseBody = (
    await api.get(`/sheets`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      params: {
        search: searchParams.search,
        sort: searchParams.sort,
        page: searchParams.page || 1,
      },
    })
  ).data;

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
    <div className="py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">
        Partituras encontradas: {meta.total}
      </h1>

      <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2">
          <SearchInput />
          <FilterDropDown
            filterOptions={[
              { value: "desc", label: "Mais recentes" },
              { value: "asc", label: "Mais antigas" },
              { value: "mostFavorited", label: "Mais favoritados" },
            ]}
          />
        </div>

        <div
          className={cn("grid w-full max-w-screen-xl grid-cols-1 gap-8", {
            "md:grid-cols-2": data.length > 1,
            "md:grid-cols-1": !(data.length > 1),
          })}
        >
          {data.map((sheet) => {
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
                    userId={user.id}
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
          {data.length === 0 && <span>Nenhuma partitura encontrada!</span>}
        </div>

        <Pagination meta={meta} />
      </div>
    </div>
  );
}
