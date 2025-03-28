"use client";

import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/utils";

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get("query") ?? "";

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    router.push(
      pathname + "?" + updateQueryParams({ query: value }, searchParams),
    );
  };

  return (
    <Input
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder="Search assets..."
    />
  );
};
