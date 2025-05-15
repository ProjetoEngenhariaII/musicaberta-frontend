"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterDropDownProps {
  filterOptions: { value: string; label: string }[];
}

export function FilterDropDown({ filterOptions }: FilterDropDownProps) {
  const [filter, setFilter] = useState("desc");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChangeFilter(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
    setFilter(value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-1 text-slate-600">
          <Filter className="w-4 h-4" />
          Ordem
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ordenar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={handleChangeFilter}
        >
          {filterOptions.map((option) => {
            return (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
