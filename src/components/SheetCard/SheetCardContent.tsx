import { Badge } from "../ui/badge";
import { CardContent } from "../ui/card";

type SheetCardContentProps = {
  badges: string[];
};

export default function SheetCardContent({ badges }: SheetCardContentProps) {
  return (
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {badges.map((badge) => (
          <Badge key={badge} variant="secondary">
            {badge}
          </Badge>
        ))}
      </div>
    </CardContent>
  );
}
