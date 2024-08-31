import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function createAccount() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Criar uma conta</CardTitle>
          <CardDescription>
            Digite seu email e uma senha para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="underline">
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
