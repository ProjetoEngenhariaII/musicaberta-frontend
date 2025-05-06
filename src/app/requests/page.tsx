import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import RequestCard from "@/components/RequestCard";
import { cn } from "@/lib/utils";
import RequestSheet from "@/components/RequestSheet";
import { api } from "@/lib/axios";
import { Request } from "@/lib/types";

export default async function RequestsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const res = await api.get(`/requests`);
  const requests: Request[] = res.data.requests;

  return (
    <div className="py-8 px-4 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl font-bold">Solicitações de Partitura</h1>

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex gap-2 justify-center items-center">
          <SearchInput />
          <RequestSheet userId={session.user.id} />
        </div>
      </div>

      <div
        className={cn("w-full max-w-screen-xl grid grid-cols-1 gap-8", {
          "md:grid-cols-2": requests.length > 1,
          "md:grid-cols-1": !(requests.length > 1),
        })}
      >
        {requests.map((req) => (
          <RequestCard
            id={req.id}
            key={req.id}
            title={req.title}
            user={{
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
