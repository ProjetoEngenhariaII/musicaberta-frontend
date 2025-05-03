import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { api } from "@/lib/axios";
import { FavoritesResponseBody, SheetsResponseBody } from "@/lib/types";
import SearchInput from "@/components/SearchInput";
import { FilterDropDown } from "@/components/FilterDropDown";
import { Pagination } from "@/components/Pagination";
import { SheetCard } from "@/components/SheetCard";
import StarSheet from "@/components/StarSheet";
import { cn } from "@/lib/utils";

type HomeProps = {
  searchParams: { search?: string; sort?: string; page?: number };
};

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { data, meta }: SheetsResponseBody = (
    await api.get(`/sheets`, {
      params: {
        search: searchParams.search,
        sort: searchParams.sort,
        page: searchParams.page || 1,
      },
    })
  ).data;

  const res = await api.get(`/favorites`, {
    params: {
      userId: session?.user.id,
    },
  });

  const { favorites }: FavoritesResponseBody = res.data;

  return (
    <div className="py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">
        Partituras encontradas: {meta.total}
      </h1>

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2">
          <SearchInput />
          <FilterDropDown />
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
                >
                  <StarSheet
                    userId={session.user.id}
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
