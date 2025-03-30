"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";

export const FilterDropdown = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fileTypeParams = searchParams.get("fileType") ?? "";
  const activeFilters = fileTypeParams ? fileTypeParams.split(",") : [];

  const handleFilterChange = (filterName: string) => {
    const newFilters = activeFilters.includes(filterName)
      ? activeFilters.filter((f) => f !== filterName)
      : [...activeFilters, filterName];

    router.push(
      pathname +
        "?" +
        updateQueryParams({ fileType: newFilters.join(",") }, searchParams),
    );
  };

  const dropdownItems: string[] = [
    "images",
    "videos",
    "documents",
    "spreadsheets",
    "presentations",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownItems.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={activeFilters.includes(item)}
            onCheckedChange={() => handleFilterChange(item)}
            className="capitalize"
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
