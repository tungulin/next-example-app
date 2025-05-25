"use client";

import { useMovieActions } from "@/entities/movie";
import { useDebouncedValue } from "@/shared/hooks";
import { TextInput } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  shouldChangeQuery?: boolean;
}

export const Search = (props: Props) => {
  const { shouldChangeQuery = false } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSearch } = useMovieActions();
  const [_search, _setSearch] = useState("");
  const router = useRouter();

  const [debouncedSearch] = useDebouncedValue(_search);

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

      if (shouldChangeQuery) {
        router.push(
          pathname + "?" + createQueryString("search", debouncedSearch)
        );
      }
    }
  }, [debouncedSearch]);

  return (
    <TextInput
      size="md"
      radius="md"
      value={_search}
      onChange={(event) => _setSearch(event.currentTarget.value)}
      placeholder="Search..."
      variant="filled"
    />
  );
};
