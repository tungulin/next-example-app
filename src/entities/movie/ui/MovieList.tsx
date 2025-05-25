"use client";

import { Movie, MovieCard } from "@/entities/movie";
import { Button, Center, Stack, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useMovieActions } from "../model/store";

type MovieListProps = {
  movies: Movie[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { clearSearch } = useMovieActions();

  const handleClickClearFilters = () => {
    if (pathname) {
      clearSearch();
      router.replace(pathname);
    }
  };

  return (
    <Stack gap={"md"}>
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}

      {!movies.length && (
        <Center mih="calc(100vh - 160px)">
          <Stack>
            <Text size="lg">Movies not found</Text>
            <Button onClick={handleClickClearFilters}>Clear filters</Button>
          </Stack>
        </Center>
      )}
    </Stack>
  );
};
