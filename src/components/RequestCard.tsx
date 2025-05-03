import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock, HandHeart, Info } from "lucide-react";
import { formatRelativeDate } from "@/utils/formatDate";
import Link from "next/link";

type RequestCardProps = {
  id: string;
  title: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  badges: string[];
  contributionsCount: number;
  createdAt: string;
};

export default function RequestCard({
  id,
  title,
  user,
  badges,
  contributionsCount,
  createdAt,
}: RequestCardProps) {
  return (
    <Card className="w-full flex flex-col justify-between shadow-md shadow-slate-300 transition-transform hover:scale-105">
      <CardHeader className="flex flex-row items-start justify-between gap-12 space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm">{user.name}</p>
          </div>
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <HandHeart className="h-4 w-4" aria-hidden="true" />
            <span>{contributionsCount} contribuições</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <time dateTime={createdAt}>{formatRelativeDate(createdAt)}</time>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Link href={`/newsheet?id=${id}`}>
          <Button variant="default">
            <HandHeart className="mr-2 h-4 w-4" />
            Contribuir
          </Button>
        </Link>
        <Link href={`/request?id=${id}`}>
          <Button variant="outline">
            <Info className="mr-2 h-4 w-4" />
            Ver Detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
