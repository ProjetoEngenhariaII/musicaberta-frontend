import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SheetCard } from "@/components/SheetCard";
import StarSheet from "@/components/StarSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { FavoritesResponseBody, Sheet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/utils/formatDate";
import { ArrowLeft, HandHeart } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Request } from "@/lib/types";

type RequestData = {
  request: Request;
  sheets: Sheet[];
};

export default async function RequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const res = await api.get(`/requests/${id}`);
  const { request, sheets }: RequestData = res.data;
  const avatarFallbackText =
    `${request.user.name[0]}${request.user.name[1]}`.toUpperCase();

  const resFavorites = await api.get(`/favorites`, {
    params: {
      userId: session?.user.id,
    },
  });

  const { favorites }: FavoritesResponseBody = resFavorites.data;

  return (
    <div className="py-8 px-4 flex flex-col justify-center items-start max-w-screen-xl mx-auto gap-5">
      <Link href="/requests" className="">
        <Button variant={"ghost"} className="flex items-center gap-2 px-0">
          <ArrowLeft />
          Voltar
        </Button>
      </Link>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">{request.title}</h1>
        <Link href={`/newsheet?id=${id}`}>
          <Button variant="default">
            <HandHeart className="mr-2 h-4 w-4" />
            Contribuir
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={request.user.avatarUrl} />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>{request.user.name}</p>
          <span className="text-sm text-slate-600">
            Solicitado {formatRelativeDate(request.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {request.badges !== "" &&
          request.badges.split(",").map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
      </div>

      <div className="border rounded-xl p-6">{request.description}</div>

      <div className="mt-8 w-full flex flex-col gap-5">
        <h1 className="text-2xl font-medium">
          Contribuições ({request._count.Sheet})
        </h1>

        <div className="grid w-full max-w-screen-xl grid-cols-2 gap-8">
          {sheets.map((sheet) => {
            const { id, badges, createdAt, mp3Url, pdfUrl, songWriter, title } =
              sheet;
            const isFavorited = favorites.find(
              (favorite) => favorite.sheet.id === id
            );

            return (
              <SheetCard.Root
                key={id}
                className={cn({
                  "shadow-blue-600 border-blue-600": isFavorited,
                })}
              >
                <SheetCard.Header
                  createdAt={createdAt}
                  songWriter={songWriter}
                  title={title}
                >
                  <StarSheet
                    userId={session.user.id}
                    sheetId={id}
                    favoriteId={isFavorited?.favoriteId}
                    sheetTitle={title}
                    isFavorited={isFavorited != undefined}
                  />
                </SheetCard.Header>
                <SheetCard.Content badges={badges} />
                <SheetCard.Footer mp3Url={mp3Url} pdfUrl={pdfUrl} />
              </SheetCard.Root>
            );
          })}
          {sheets.length === 0 && <span>Nenhuma contribuição encontrada!</span>}
        </div>
      </div>
    </div>
  );
}
