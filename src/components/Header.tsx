import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { cookies } from "next/headers";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { api } from "@/lib/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  bio: string;
  roles: string[];
  instruments: string[];
  avatarUrl: string;
}

export interface ResponseUser {
  user: User;
}

export default async function Header() {
  const token = cookies().get("token");

  if (!token) {
    return (
      <header className="flex justify-between items-center w-full max-w-screen-xl p-3 mx-auto sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex justify-center items-center gap-2 ">
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
        </Link>
      </header>
    );
  }

  try {
    const res = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    const { user } = res.data as ResponseUser;
    const avatarFallbackText = `${user.name[0]}${user.name[1]}`.toUpperCase();

    return (
      <header className="flex justify-between items-center w-full max-w-screen-xl p-3 mx-auto sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex justify-center items-center gap-2 ">
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
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                className="size-10 rounded-full"
                src={user.avatarUrl || "default-user.jpg"}
                alt={user.name || "User"}
              />
              <AvatarFallback>{avatarFallbackText}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>
              <p>{user.name}</p>
              <p className="text-slate-600 font-extralight">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Meu perfil
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
              <Link href="/requests" className="w-full">
                Solicitar partitura
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/newsheet" className="w-full">
                Fazer upload
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    );
  } catch (error) {
    console.log(error);
  }
}
