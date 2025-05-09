import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import ProfileForm from "@/components/ProfileForm";
import { ResponseUser } from "@/components/Header";
import { cookies } from "next/headers";

export default async function Profile() {
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

  return (
    <div className="max-w-screen-xl p-3 mx-auto">
      <ProfileForm user={user} />
    </div>
  );
}
