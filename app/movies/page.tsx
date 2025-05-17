"use client";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { MovieList, useSearch } from "@/entities/movie";

import { Navbar } from "@/widgets/navbar";
import { Search } from "@/widgets/search";
import { Pagination } from "@/widgets/pagination";
import { Header } from "@/widgets/header";
import { useState } from "react";
import { useMovies } from "@/pages/movies";

export default function MoviesCSR() {
  const search = useSearch();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page, search);

  const movies = data?.movies || [];
  const countPage = data?.countPage || 0;

  return (
    <Flex mih="100vh">
      {/* <Navbar /> */}
      {/* w="75%" */}
      <ScrollArea w="100%" type="scroll">
        <Header />
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
