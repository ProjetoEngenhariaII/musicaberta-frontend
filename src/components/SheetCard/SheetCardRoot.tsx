import { ReactNode } from "react";
import { Card } from "../ui/card";

type SheetCardRootProps = {
  children: ReactNode;
};

export default function SheetCardRoot({ children }: SheetCardRootProps) {
  return (
    <Card className="w-full max-w-md shadow-md shadow-slate-300 transition-transform hover:scale-105">
      {children}
    </Card>
  );
}
