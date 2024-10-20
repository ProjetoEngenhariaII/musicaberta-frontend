import { ReactNode } from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { formatRelativeDate } from "@/utils/formatDate";
import { Clock } from "lucide-react";

type SheetCardHeaderProps = {
  children?: ReactNode;
  title: string;
  songWriter: string;
  createdAt: string;
};

export default function SheetCardHeader({
  children,
  createdAt,
  songWriter,
  title,
}: SheetCardHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-start justify-between gap-12 space-y-0 pb-2">
      <div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">por {songWriter}</p>
      </div>
      <div className="text-sm text-muted-foreground flex items-center gap-5">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <time dateTime={createdAt}>{formatRelativeDate(createdAt)}</time>
        </div>
        {children}
        {/* <TrashSheet
            key={id}
            sheetId={id}
            sheetTitle={title}
            sheetKey={sheet.pdfUrl.split("sheets/")[1]}
            deleteSheet={deleteSheet}
          /> */}
      </div>
    </CardHeader>
  );
}
