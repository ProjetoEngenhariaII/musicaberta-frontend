import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import RequestCard from "@/components/RequestCard";
import { cn } from "@/lib/utils";
import RequestSheet from "@/components/RequestSheet";

export default async function RequestsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

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
          "md:grid-cols-2": [1, 2, 3, 4, 5].length > 1,
          "md:grid-cols-1": !([1, 2, 3, 4, 5].length > 1),
        })}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <RequestCard
            id={item.toString()}
            key={item}
            title="Requisição de partitura"
            user={{
              name: "Gian Lucas",
              avatarUrl: "https://avatars.githubusercontent.com/u/67169105?v=4",
            }}
            badges={["Badge 1", "Badge 2"]}
            contributionsCount={10}
            createdAt="2021-01-01"
          />
        ))}
      </div>
    </div>
  );
}
