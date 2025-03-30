"use client";

import { Grid, List } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateQueryParams } from "@/lib/utils";

const ViewMode = {
  GRID: "grid",
  LIST: "list",
} as const;

type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];

export const ListViewToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [viewMode, setViewMode] = useState<ViewMode>(
    (view as ViewMode) || ViewMode.GRID,
  );

  useEffect(() => {
    if (!view) {
      setViewMode(ViewMode.GRID);
    }
  }, [view]);

  const selectView = (view: ViewMode) => {
    setViewMode(view);
    router.push(pathname + "?" + updateQueryParams({ view }, searchParams));
  };

  return (
    <div className="flex rounded-md border">
      <Button
        variant={viewMode === ViewMode.GRID ? "default" : "ghost"}
        size="icon"
        onClick={() => selectView(ViewMode.GRID)}
        className="rounded-none"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === ViewMode.LIST ? "default" : "ghost"}
        size="icon"
        onClick={() => selectView(ViewMode.LIST)}
        className="rounded-none"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};
