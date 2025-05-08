import { ReactNode } from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { formatRelativeDate } from "@/utils/formatDate";
import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type SheetCardHeaderProps = {
  children?: ReactNode;
  title: string;
  songWriter: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

export default function SheetCardHeader({
  children,
  createdAt,
  songWriter,
  title,
  user,
}: SheetCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-start justify-between gap-12 space-y-0 pb-2">
      <div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{songWriter}</p>
        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-2 mt-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-slate-700">{user.name}</p>
        </Link>
      </div>
      <div className="text-sm text-muted-foreground flex items-center gap-5">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <time dateTime={createdAt}>{formatRelativeDate(createdAt)}</time>
        </div>
        {children}
      </div>
    </CardHeader>
  );
}
