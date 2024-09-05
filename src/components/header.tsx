"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center p-3 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-center items-center gap-2 ">
        <Avatar>
          <AvatarImage
            className="size-12 rounded-full"
            src="musicaberta-logo.png"
            alt="musicaberta"
          />
        </Avatar>
        <h1 className="text-2xl text-slate-950 font-semibold">Músicaberta</h1>
      </div>

      {status === "loading" && <Skeleton className="h-10 w-10 rounded-full" />}

      {status === "authenticated" && (
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
          <DropdownMenuContent>
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
              <Link href="/" className="w-full">
                Buscar partituras
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/mysheets" className="w-full">
                Gerenciar partituras
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites" className="w-full">
                Partituras favoritas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Header;
