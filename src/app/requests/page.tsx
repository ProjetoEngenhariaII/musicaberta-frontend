import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import RequestCard from "@/components/RequestCard";
import RequestSheet from "@/components/RequestSheet";
import { api } from "@/lib/axios";
import { Request, RequestsResponseBody } from "@/lib/types";
import { cookies } from "next/headers";
import { ResponseUser } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { FilterDropDown } from "@/components/FilterDropDown";

type RequestsPageProps = {
  searchParams: { search?: string; sort?: string; page?: number };
};

export default async function RequestsPage({
  searchParams,
}: RequestsPageProps) {
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

  const { data, meta }: RequestsResponseBody = (
    await api.get(`/requests`, {
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

  return (
    <div className="w-full max-w-screen-lg mx-auto py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">
        Solicitações de Partitura ({meta.total})
      </h1>

      <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-wrap gap-2 justify-between items-center">
          <div className="flex gap-2 justify-center items-center flex-wrap">
            <SearchInput />
            <FilterDropDown
              filterOptions={[
                { value: "desc", label: "Mais recentes" },
                { value: "asc", label: "Mais antigas" },
                { value: "mostContributed", label: "Mais contribuições" },
              ]}
            />
          </div>

          <RequestSheet userId={user.id} />
        </div>
      </div>

      <div className="w-full max-w-screen-lg grid grid-cols-2 gap-8">
        {data.map((req) => (
          <RequestCard
            id={req.id}
            key={req.id}
            title={req.title}
            user={{
              id: req.userId,
              name: req.user.name,
              avatarUrl: req.user.avatarUrl,
            }}
            badges={req.badges !== "" ? req.badges.split(",") : []}
            contributionsCount={req._count.Sheet}
            createdAt={req.createdAt}
          />
        ))}
      </div>

      <Pagination meta={meta} />
    </div>
  );
}
