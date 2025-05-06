import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NewSheetForm from "@/components/NewSheetForm";

type NewSheetProps = {
  searchParams: { id?: string };
};

export default async function NewSheet({ searchParams }: NewSheetProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { id } = searchParams;
  const userId = session.user.id;

  return (
    <div className="flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Upload de partitura</h1>

      <NewSheetForm userId={userId} requestId={id} />
    </div>
  );
}
