"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useState } from "react";

interface RequestSheetProps {
  userId: string;
}

export default function RequestSheet({ userId }: RequestSheetProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [badges, setBadges] = useState("");
  const [open, setOpen] = useState(false);

  async function handleRequestSheet() {
    if (title.trim() === "") {
      return;
    }

    toast({
      title: "Enviando solicitação...",
      description: `Partitura ${title} está sendo solicitada.`,
      className: "text-slate-50 bg-amber-600",
    });
    try {
      await api.post("requests", {
        title,
        description,
        badges,
        userId,
      });

      toast({
        title: "Solicitação enviada!",
        description: `Partitura ${title} foi solicitada com sucesso.`,
        className: "text-slate-50 bg-green-700",
      });
      setOpen(false);
      setTitle("");
      setBadges("");
      setDescription("");
      refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha ao enviar solicitação!",
        description: `Houve um erro ao tentar solicitar a partitura.`,
      });
      console.log("ERROR:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-bold">
          + Solicitar partitura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova solicitação de partitura</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da partitura que você está procurando.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="title" className="text-right">
              Título da música
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="col-span-3"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="description" className="text-right">
              Detalhes Adicionais
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="col-span-3"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="badges" className="text-right">
              Tags (separadas por vírgula)
            </Label>
            <Input
              value={badges}
              onChange={(e) => setBadges(e.target.value)}
              id="badges"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleRequestSheet}>Enviar Solicitação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
