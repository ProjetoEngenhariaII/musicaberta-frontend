import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import { Sheet } from "@/lib/types";
import { SheetCard } from "@/components/SheetCard";
import TrashSheet from "@/components/TrashSheet";
import { cookies } from "next/headers";
import { ResponseUser } from "@/components/Header";

export default async function MySheets() {
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

  const res = await api.get(`/sheets/user/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const sheets: Sheet[] = res.data.sheets;

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col justify-center items-center gap-12 py-8 px-4">
      <h1 className="text-3xl font-bold">Minhas partituras</h1>
      <div className="w-full grid grid-cols-2 gap-8">
        {sheets.map((sheet) => {
          const { id, badges, createdAt, mp3Url, pdfUrl, songWriter, title } =
            sheet;

          return (
            <SheetCard.Root key={id}>
              <SheetCard.Header
                createdAt={createdAt}
                songWriter={songWriter}
                title={title}
                user={{
                  id: user.id,
                  name: user.name ?? "",
                  avatarUrl: user.avatarUrl ?? "",
                }}
              >
                <TrashSheet
                  sheetId={id}
                  sheetTitle={title}
                  pdfName={sheet.pdfUrl.split("sheets/")[1]}
                  mp3Name={sheet.mp3Url.split("sheets/")[1]}
                />
              </SheetCard.Header>
              <SheetCard.Content badges={badges} />
              <SheetCard.Footer mp3Url={mp3Url} pdfUrl={pdfUrl} />
            </SheetCard.Root>
          );
        })}
        {sheets.length === 0 && <span>Nenhuma partitura encontrada!</span>}
      </div>
    </div>
  );
}
