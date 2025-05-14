import { redirect } from "next/navigation";
import NewSheetForm from "@/components/NewSheetForm";
import { cookies } from "next/headers";
import { ResponseUser } from "@/components/Header";
import { api } from "@/lib/axios";

type NewSheetProps = {
  searchParams: { id?: string };
};

export default async function NewSheet({ searchParams }: NewSheetProps) {
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

  const { id } = searchParams;

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Upload de partitura</h1>

      <NewSheetForm userId={user.id} requestId={id} />
    </div>
  );
}
