"use client";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { MovieList, useSearch } from "@/entities/movie";

import { Search } from "@/widgets/search";
import { Pagination } from "@/widgets/pagination";
import { Header } from "@/shared/layouts";
import { useState } from "react";
import { useMovies } from "@/pages/movies";
import { AvatarSection } from "@/entities/user";

export default function MoviesCSR() {
  const search = useSearch();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page, search);

  const movies = data?.movies || [];
  const countPage = data?.countPage || 0;

  return (
    <Flex mih="100vh">
      <ScrollArea w="100%" type="scroll">
        <Header rightSlot={<AvatarSection />} />
        <Box p={10}>
          <Search />
          {!isLoading && <MovieList movies={movies} />}
          <Pagination
            onChange={setPage}
            search={search}
            countPage={countPage}
            page={page}
          />
        </Box>
      </ScrollArea>
    </Flex>
  );
}
