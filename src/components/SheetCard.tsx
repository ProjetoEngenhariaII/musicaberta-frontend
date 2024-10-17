import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Music, Clock } from "lucide-react";
import { Sheet } from "@/lib/types";
import { formatRelativeDate } from "@/utils/formatDate";

type SheetCardProps = {
  sheet: Sheet;
};

export default function SheetCard({ sheet }: SheetCardProps) {
  const { title, badges, createdAt, mp3Url, pdfUrl, songWriter } = sheet;

  return (
    <Card className="w-full max-w-md shadow-md shadow-slate-300 transition-transform hover:scale-105">
      <CardHeader className="flex flex-row items-start justify-between gap-12 space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">por {songWriter}</p>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="mr-1 h-4 w-4" aria-hidden="true" />
          <time dateTime={createdAt}>{formatRelativeDate(createdAt)}</time>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="outline" className="flex-1 justify-center" asChild>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download PDF for ${title}`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Link PDF
          </a>
        </Button>
        {mp3Url ? (
          <Button variant="outline" className="flex-1 justify-center" asChild>
            <a
              href={mp3Url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download MP3 for ${title}`}
            >
              <Music className="mr-2 h-4 w-4" />
              Link MP3
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="flex-1 justify-center" disabled>
            <Music className="mr-2 h-4 w-4" />
            Sem MP3
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
