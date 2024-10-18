import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <header className="flex justify-between items-center w-full max-w-screen-xl p-3 mx-auto sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-center items-center gap-2 ">
        <Avatar>
          <AvatarImage
            className="size-12 rounded-full"
            src="musicaberta-logo.png"
            alt="musicaberta"
          />
        </Avatar>
        <h1 className="hidden min-[500px]:block text-2xl text-slate-950 font-semibold">
          Músicaberta
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              className="size-10 rounded-full"
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
            />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>
            <p>{session?.user?.name}</p>
            <p className="text-slate-600 font-extralight">
              {session?.user?.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="w-full">
              Meu perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/?page=1" className="w-full">
              Buscar partituras
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/mysheets" className="w-full">
              Minhas partituras
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/favorites" className="w-full">
              Partituras favoritas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/newsheet" className="w-full">
              Fazer upload
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
