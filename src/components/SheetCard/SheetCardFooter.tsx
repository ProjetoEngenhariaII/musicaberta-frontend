import { FileText, Music } from "lucide-react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

type SheetCardFooterProps = {
  pdfUrl: string;
  mp3Url: string;
};

export default function SheetCardFooter({
  mp3Url,
  pdfUrl,
}: SheetCardFooterProps) {
  return (
    <CardFooter className="flex justify-between gap-4">
      <Button variant="outline" className="flex-1 justify-center" asChild>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <FileText className="mr-2 h-4 w-4" />
          Link PDF
        </a>
      </Button>
      {mp3Url ? (
        <Button variant="outline" className="flex-1 justify-center" asChild>
          <a href={mp3Url} target="_blank" rel="noopener noreferrer">
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
  );
}
