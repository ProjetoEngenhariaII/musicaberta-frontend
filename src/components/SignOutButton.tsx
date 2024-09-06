"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <span className="w-full cursor-pointer" onClick={() => signOut()}>
      Sair
    </span>
  );
}
