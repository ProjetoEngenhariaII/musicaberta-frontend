import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInButton from "@/components/SignInButton";

export default async function login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Entre com a sua conta do Google</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <SignInButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
