import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import RequestCard from "@/components/RequestCard";
import RequestSheet from "@/components/RequestSheet";
import { api } from "@/lib/axios";
import { Request } from "@/lib/types";
import { cookies } from "next/headers";
import { ResponseUser } from "@/components/Header";

export default async function RequestsPage() {
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

  const res = await api.get(`/requests`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const requests: Request[] = res.data.requests;

  return (
    <div className="py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">Solicitações de Partitura</h1>

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2 justify-center items-center">
          <SearchInput />
          <RequestSheet userId={user.id} />
        </div>
      </div>

      <div className="w-full max-w-screen-lg grid grid-cols-2 gap-8">
        {requests.map((req) => (
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
    </div>
  );
}
