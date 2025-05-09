import { ResponseUser } from "@/components/Header";
import { api } from "@/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  const resUser = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const { user } = resUser.data as ResponseUser;

  return <h1>user: {id}</h1>;
}
