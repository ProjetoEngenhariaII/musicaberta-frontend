"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <h1>Carregando...</h1>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (session) {
    return (
      <div className="mt-4 flex justify-center items-center flex-col gap-3">
        <h1>Olá, {session.user?.name}</h1>
        <Button onClick={() => signOut()}>Sair</Button>
      </div>
    );
  }
}
