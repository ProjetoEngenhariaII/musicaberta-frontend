"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

type StarSheetProps = {
  userId: string;
  sheetId: string;
  favoriteId: string | undefined;
  sheetTitle: string;
  isFavorited: boolean;
};

export default function StarSheet({
  userId,
  sheetId,
  favoriteId,
  sheetTitle,
  isFavorited,
}: StarSheetProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  async function handleRemoveStar() {
    toast({
      title: "Removendo favorito...",
      description: `Partitura ${sheetTitle} está sendo excluída dos favoritos.`,
    });

    try {
      await api.delete("favorites", {
        params: {
          id: favoriteId,
        },
      });

      toast({
        title: "Partitura removida!",
        description: `Partitura ${sheetTitle} foi removida dos favoritos.`,
        className: "text-slate-50 bg-green-700",
      });
      refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao remover partitura!",
        description: `Erro ao tentar remover ${sheetTitle} dos favoritos.`,
      });

      console.log("ERROR:", error);
    }
  }

  async function handleAddStar() {
    toast({
      title: "Favoritando...",
      description: `Partitura ${sheetTitle} está sendo marcada como favorita.`,
      className: "text-slate-50 bg-blue-700",
    });

    try {
      const res = await api.post("favorites", {
        userId,
        sheetId,
      });

      console.log(res.data);

      toast({
        title: "Partitura favoritada!",
        description: `Partitura ${sheetTitle} foi adicionada aos favoritos.`,
        className: "text-slate-50 bg-green-700",
      });
      refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao favoritar partitura!",
        description: `Erro ao tentar adicionar ${sheetTitle} aos favoritos.`,
      });

      console.log("ERROR:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Star
          className={cn(
            "h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-600",
            {
              "fill-current": isFavorited,
            }
          )}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFavorited
              ? `Remover ${sheetTitle} da lista de favoritos?`
              : `Adicionar ${sheetTitle} na lista de favoritos?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isFavorited
              ? "Essa partitura será removida da sua lista de favoritos"
              : "Você poderá acessar essa partitura na sua lista de favoritos a qualquer momento."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            className={cn({
              "bg-red-600 hover:bg-red-700": isFavorited,
              "bg-blue-600 hover:bg-blue-700": !isFavorited,
            })}
            onClick={isFavorited ? handleRemoveStar : handleAddStar}
          >
            {isFavorited ? "Remover" : "Adicionar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
