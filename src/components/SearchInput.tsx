"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchString = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (searchString) {
        params.set("search", searchString);
        params.set("page", "1");
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    700
  );

  return (
    <div className="relative w-96">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="w-full rounded-lg bg-background pl-8"
        onChange={handleChange}
      />
    </div>
  );
}
