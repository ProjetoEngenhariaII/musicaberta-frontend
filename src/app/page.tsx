"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner className="size-12" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (session) {
    return (
      <div className="mt-4 flex justify-center items-center flex-col gap-3">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((ele) => {
          return (
            <div>
              <h1>partitura</h1>
              <Button>Baixar</Button>
            </div>
          );
        })}
      </div>
    );
  }
}
