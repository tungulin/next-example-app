"use client";

import { useSearch, useSearchActions } from "@/entities/movie";
import { useDebouncedValue } from "@/shared/hooks";
import { TextInput } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSearch } = useSearchActions();
  const search = useSearch();
  const router = useRouter();

  const [debouncedSearch] = useDebouncedValue(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (debouncedSearch !== null) {
      setSearch(debouncedSearch);
      router.push(
        pathname + "?" + createQueryString("search", debouncedSearch)
      );
    }
  }, [debouncedSearch]);

  return (
    <TextInput
      size="md"
      radius="md"
      value={search}
      onChange={(event) => setSearch(event.currentTarget.value)}
      placeholder="Search..."
      variant="filled"
    />
  );
};
