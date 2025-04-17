import { Movie, MovieCard } from "@/entities/movie";
import { Stack } from "@mantine/core";
import React from "react";

type MovieListProps = {
  movies: Movie[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Stack gap={"md"}>
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </Stack>
  );
};
