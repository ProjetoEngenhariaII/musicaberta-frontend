"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getTokenFromCookie";

interface NewSheetFormProps {
  userId: string;
  requestId?: string;
}

export default function NewSheetForm({ userId, requestId }: NewSheetFormProps) {
  const [songWriter, setSongWriter] = useState("");
  const [title, setTitle] = useState("");
  const [badges, setBadges] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const token = getToken();

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
        Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      });

      const { fileURL } = uploadResponse.data;
      mp3Url = fileURL;
    }

    toast({
      title: "Fazendo upload...",
      description: `Salvando dados restantes da partitura ${title}`,
    });

    await api.post(
      "sheets",
      {
        title,
        songWriter,
        pdfUrl,
        mp3Url,
        badges,
        userId,
        requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast({
      title: "Upload completo!",
      description: `Partitura ${title} foi salva com sucesso!`,
      className: "text-slate-50 bg-green-700",
    });

    refresh();

    setSongWriter("");
    setTitle("");
    setBadges("");
    setPdfFile(null);
    setMp3File(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
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
        <Label htmlFor="badges">Badges (separadas por vírgula)</Label>
        <Input
          required
          id="badges"
          value={badges}
          onChange={(e) => setBadges(e.target.value)}
          placeholder="Ex: dobrado, rock, pop..."
        />
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
