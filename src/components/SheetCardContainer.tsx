"use client";

import { Sheet } from "@/lib/types";
import SheetCard from "./SheetCard";
import { useState } from "react";

type SheetCardContainerProps = {
  sheets: Sheet[];
};

export default function SheetCardContainer({
  sheets: sheetsServer,
}: SheetCardContainerProps) {
  const [sheets, setSheets] = useState(sheetsServer);

  function deleteSheet(sheetId: string) {
    setSheets(sheets.filter((sheet) => sheet.id != sheetId));
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-${
        sheets.length > 1 ? "2" : "1"
      } gap-6`}
    >
      {sheets.map((sheet) => {
        return (
          <SheetCard
            sheet={sheet}
            key={sheet.id}
            hasTrash
            deleteSheet={deleteSheet}
          />
        );
      })}
      {sheets.length === 0 && <span>Nenhuma partitura encontrada!</span>}
    </div>
  );
}
