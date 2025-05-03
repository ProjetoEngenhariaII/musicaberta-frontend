import { HTMLAttributes, ReactNode } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface SheetCardRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function SheetCardRoot({
  children,
  ...rest
}: SheetCardRootProps) {
  return (
    <Card
      {...rest}
      className={cn(
        "w-full flex flex-col justify-between shadow-md shadow-slate-300 transition-transform hover:scale-105",
        rest.className
      )}
    >
      {children}
    </Card>
  );
}
