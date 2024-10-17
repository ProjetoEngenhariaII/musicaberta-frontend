"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MetaResponseBody } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  meta: MetaResponseBody;
};

export function Pagination({ meta }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { current, last, next, prev } = meta;

  const pages = Array.from({ length: last }, (_, index) => index + 1);

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber !== current) {
      params.set("page", pageNumber.toString());

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              prev
                ? "cursor-pointer"
                : "cursor-not-allowed text-slate-400 hover:text-slate-400 hover:bg-transparent"
            }`}
            onClick={() => handleClickPage(prev || 1)}
          />
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => handleClickPage(pageNumber)}
              isActive={pageNumber === current}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`${
              next
                ? "cursor-pointer"
                : "cursor-not-allowed text-slate-400 hover:text-slate-400 hover:bg-transparent"
            }`}
            onClick={() => handleClickPage(next || last)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
