"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface NewSheetFormProps {
  userId: string;
}

export default function NewSheetForm({ userId }: NewSheetFormProps) {
  const [songWriter, setSongWriter] = useState("");
  const [title, setTitle] = useState("");
  const [badges, setBadges] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!pdfFile) return;

    const formDataPdf = new FormData();
    formDataPdf.append("pdfFile", pdfFile as File);

    toast({
      title: "Fazendo upload...",
      description: `Salvando PDF da partitura`,
    });

    const uploadResponse = await api.post("sheets/upload", formDataPdf, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { fileURL } = uploadResponse.data;
    const pdfUrl = fileURL;

    let mp3Url = "";

    if (mp3File) {
      const formDataMp3 = new FormData();
      formDataMp3.append("mp3File", mp3File as File);

      toast({
        title: "Fazendo upload...",
        description: `Salvando áudio da partitura`,
      });

      const uploadResponse = await api.post("sheets/upload", formDataMp3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileURL } = uploadResponse.data;
      mp3Url = fileURL;
    }

    toast({
      title: "Fazendo upload...",
      description: `Salvando dados restantes da partitura ${title}`,
    });

    await api.post("sheets", {
      title,
      songWriter,
      pdfUrl,
      mp3Url,
      badges,
      userId,
    });

    toast({
      title: "Upload completo!",
      description: `Partitura ${title} foi salva com sucesso!`,
      className: "text-slate-50 bg-green-700",
    });

    refresh();

    setSongWriter("");
    setTitle("");
    setBadges([]);
    setNewBadge("");
    setPdfFile(null);
    setMp3File(null);
  };

  const addItem = (
    item: string,
    list: string[],
    setList: Dispatch<SetStateAction<string[]>>
  ) => {
    if (item.trim() && !list.includes(item)) {
      setList([...list, item]);
    }
  };

  const removeItem = (
    item: string,
    list: string[],
    setList: Dispatch<SetStateAction<string[]>>
  ) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          required
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da partitura"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="songWriter">Compositor</Label>
        <Input
          required
          id="songWriter"
          value={songWriter}
          onChange={(e) => setSongWriter(e.target.value)}
          placeholder="Compositor da partitura/música"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pdfUpload">Upload de PDF</Label>
        <Input
          required
          id="pdfUpload"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              setPdfFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mp3Upload">Upload de MP3</Label>
        <Input
          id="mp3Upload"
          type="file"
          accept="audio/mp3"
          onChange={(e) => {
            if (e.target.files) {
              setMp3File(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="roles">Badges</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
            >
              {badge}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => removeItem(badge, badges, setBadges)}
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            id="newBadge"
            value={newBadge}
            onChange={(e) => setNewBadge(e.target.value)}
            placeholder="Adicionar uma nova badge.."
          />
          <Button
            type="button"
            onClick={() => {
              addItem(newBadge, badges, setBadges);
              setNewBadge("");
            }}
          >
            Nova badge
          </Button>
        </div>
      </div>
      <Button
        disabled={
          !pdfFile ||
          pdfFile.type != "application/pdf" ||
          (mp3File != null && mp3File.type != "audio/mpeg") ||
          !songWriter.trim() ||
          !title.trim()
        }
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
}
