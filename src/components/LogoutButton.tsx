"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    toast({
      title: "Logout realizado com sucesso!",
      description: "Você foi desconectado da sua conta.",
      className: "text-slate-50 bg-green-700",
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-red-700 hover:text-red-800"
    >
      Sair
    </button>
  );
}
