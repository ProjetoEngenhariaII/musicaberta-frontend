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
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type TrashSheetProps = {
  sheetId: string;
  sheetTitle: string;
  sheetKey: string;
};

export default function TrashSheet({
  sheetId,
  sheetTitle,
  sheetKey,
}: TrashSheetProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  async function handleDeleteSheet() {
    toast({
      title: "Excluindo...",
      description: `Partitura ${sheetTitle} está sendo excluída.`,
      className: "text-slate-50 bg-amber-600",
    });

    try {
      await api.delete("sheets", {
        params: {
          id: sheetId,
          key: sheetKey,
        },
      });

      toast({
        title: "Partitura excluída!",
        description: `Partitura ${sheetTitle} foi excluída com sucesso.`,
        className: "text-slate-50 bg-green-700",
      });
      refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao excluir partitura!",
        description: `Houve um erro ao tentar excluir ${sheetTitle}.`,
      });

      console.log("ERROR:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {sheetTitle} será deletado, quer continuar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permanente. Todos os dados da partitura serão deletados
            para sempre.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDeleteSheet}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
