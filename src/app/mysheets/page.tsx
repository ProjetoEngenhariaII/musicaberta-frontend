import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import { Sheet } from "@/lib/types";
import SheetCardContainer from "@/components/SheetCardContainer";

export default async function MySheets() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;
  const res = await api.get(`/sheets/user/${userId}`);

  const sheets: Sheet[] = res.data.sheets;

  return (
    <div className="flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Minhas partituras</h1>
      <SheetCardContainer sheets={sheets} />
    </div>
  );
}
