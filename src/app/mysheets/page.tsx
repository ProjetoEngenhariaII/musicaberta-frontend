import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { api } from "@/lib/axios";
import { Sheet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SheetCard } from "@/components/SheetCard";
import TrashSheet from "@/components/TrashSheet";

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
      <div
        className={cn("grid grid-cols-1 gap-6", {
          "md:grid-cols-2": sheets.length > 1,
          "md:grid-cols-1": !(sheets.length > 1),
        })}
      >
        {sheets.map((sheet) => {
          const { id, badges, createdAt, mp3Url, pdfUrl, songWriter, title } =
            sheet;

          return (
            <SheetCard.Root key={id}>
              <SheetCard.Header
                createdAt={createdAt}
                songWriter={songWriter}
                title={title}
              >
                <TrashSheet
                  sheetId={id}
                  sheetTitle={title}
                  sheetKey={sheet.pdfUrl.split("sheets/")[1]}
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
