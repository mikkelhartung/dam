"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { defaultFileFilters } from "@/lib/constants";
import { updateQueryParams } from "@/lib/utils";

export const FilterDropdown = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fileTypeParams = searchParams.getAll("fileType");

  const defaultActiveFilters =
    fileTypeParams[0]?.split(",") ?? defaultFileFilters;

  const [activeFilters, setActiveFilters] =
    useState<string[]>(defaultActiveFilters);

  const handleFilterChange = (filterName: string) => {
    const newFilters = activeFilters.includes(filterName)
      ? activeFilters.filter((f) => f !== filterName)
      : [...activeFilters, filterName];

    setActiveFilters(newFilters);

    // TODO: FIX THIS PARAM ISSUE WHEN THERE IS NO FILTERS ADDED
    router.push(
      pathname +
        "?" +
        updateQueryParams({ fileType: newFilters.join(",") }, searchParams),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes("images")}
          onCheckedChange={() => handleFilterChange("images")}
        >
          Images
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes("videos")}
          onCheckedChange={() => handleFilterChange("videos")}
        >
          Videos
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes("documents")}
          onCheckedChange={() => handleFilterChange("documents")}
        >
          Documents
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes("spreadsheets")}
          onCheckedChange={() => handleFilterChange("spreadsheets")}
        >
          Spreadsheets
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes("presentations")}
          onCheckedChange={() => handleFilterChange("presentations")}
        >
          Presentations
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
