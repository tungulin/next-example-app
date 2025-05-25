"use client";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { movieApi, MovieList, useMovie } from "@/entities/movie";

import { Search } from "@/widgets/search";
import { Pagination } from "@/widgets/pagination";
import { Header, Navbar } from "@/shared/layouts";
import { useState } from "react";
import { AvatarSection } from "@/entities/user";

export default function MoviesCSR() {
  const search = useMovie((state) => state.search);
  const [page, setPage] = useState(1);
  const { data, isLoading } = movieApi.useMovies(page, search);

  const movies = data?.movies || [];
  const countPage = data?.countPage || 0;

  return (
    <Box style={{ overflow: "none" }}>
      <Header rightSlot={<AvatarSection />} />
      <Flex h="100vh">
        <Box w="100%" p={10}>
          <ScrollArea w="100%" type="scroll">
            <Search />
            {!isLoading && <MovieList movies={movies} />}
            <Pagination
              onChange={setPage}
              search={search}
              countPage={countPage}
              page={page}
            />
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
}
