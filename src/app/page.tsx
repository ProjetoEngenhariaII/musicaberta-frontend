import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { api } from "@/lib/axios";
import { SheetsResponseBody } from "@/lib/types";
import SearchInput from "@/components/SearchInput";
import { FilterDropDown } from "@/components/FilterDropDown";
import { Pagination } from "@/components/Pagination";
import SheetCard from "@/components/SheetCard";

type HomeProps = {
  searchParams: { search?: string; sort?: string; page?: number };
};

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const response: SheetsResponseBody = (
    await api.get(`/sheets`, {
      params: {
        search: searchParams.search,
        sort: searchParams.sort,
        page: searchParams.page || 1,
      },
    })
  ).data;

  return (
    <div className="py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">
        Partituras encontradas: {response.meta.total}
      </h1>

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2">
          <SearchInput />
          <FilterDropDown />
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-${
            response.data.length > 1 ? "2" : "1"
          } gap-6`}
        >
          {response.data.map((sheet) => {
            return <SheetCard sheet={sheet} key={sheet.id} />;
          })}
          {response.data.length === 0 && (
            <span>Nenhuma partitura encontrada!</span>
          )}
        </div>

        <Pagination meta={response.meta} />
      </div>
    </div>
  );
}
