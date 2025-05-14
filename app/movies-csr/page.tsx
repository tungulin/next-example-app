"use client";
import { Box, Flex, ScrollArea } from "@mantine/core";
import { Movie, MovieList, useSearch } from "@/entities/movie";

import { Navbar } from "@/widgets/navbar";
import { Search } from "@/widgets/search";
import { Pagination } from "@/widgets/pagination";
import { Header } from "@/widgets/header";
import { moviesCsrApi } from "@/shared/api";
import { useEffect, useState } from "react";

export default function MoviesCSR() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const search = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [countPage, setCountPage] = useState<number>(0);

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    if (search !== null) {
      fetchMovies(1, search);
    }
  }, [search]);

  const fetchMovies = (page: number, search?: string) => {
    setIsLoading(true);

    return moviesCsrApi
      .getMovies(page, search)
      .then((resp) => {
        setMovies(resp.movies);
        setCountPage(resp.countPage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Flex mih="100vh">
      <Navbar />
      <ScrollArea w="75%" type="scroll">
        <Header />
        <Box p={10}>
          <Search />
          {!isLoading && <MovieList movies={movies} />}
          <Pagination search={search} countPage={countPage} page={1} />
        </Box>
      </ScrollArea>
    </Flex>
  );
}
