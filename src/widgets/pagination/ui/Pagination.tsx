"use client";

import React, { useCallback } from "react";
import { Flex, rem, Pagination as UIPagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  countPage: number;
  page: number;
  search?: string;
  shouldChangeQuery?: boolean;
}

export const Pagination = ({
  search,
  countPage,
  page,
  shouldChangeQuery = false,
}: Props) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChangePage = (page: number) => {
    if (shouldChangeQuery) {
      router.push(pathname + "?" + createQueryString("page", page.toString()));
    }
  };

  return (
    <Flex mt={rem(30)} justify="center">
      {countPage && !search && (
        <UIPagination
          size="lg"
          radius="md"
          value={page}
          onChange={handleChangePage}
          total={countPage}
        />
      )}
    </Flex>
  );
};
