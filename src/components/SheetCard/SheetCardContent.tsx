import { Badge } from "../ui/badge";
import { CardContent } from "../ui/card";

type SheetCardContentProps = {
  badges: string;
};

export default function SheetCardContent({ badges }: SheetCardContentProps) {
  const badgeList = badges.split(",").map((badge) => badge.trim());
  return (
    <CardContent>
      <div className="flex flex-wrap gap-2 mb-4">
        {badgeList.map((badge) => (
          <Badge key={badge} variant="secondary">
            {badge}
          </Badge>
        ))}
      </div>
    </CardContent>
  );
}
