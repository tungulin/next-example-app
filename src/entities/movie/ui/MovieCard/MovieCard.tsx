"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { ActionIcon, Badge, Box, Flex, rem, Stack, Text } from "@mantine/core";
import imgNotFound from "@public/img-not-found.jpeg";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useFavoriteMovie, useMovieActions } from "../../model/store";

import { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { addFavoriteMovie, removeFavoriteMovie } = useMovieActions();
  const favoriteMovies = useFavoriteMovie();

  const handleAddMovie = () => addFavoriteMovie(movie);
  const handleRemoveMovie = () => removeFavoriteMovie(movie);

  const isFavoriteMovie = useMemo(
    () => !favoriteMovies.some((favMovie) => favMovie.id === movie.id),
    [favoriteMovies]
  );

  console.log("favoriteMovies", favoriteMovies);

  return (
    <Flex mt="lg" gap="md">
      <Box miw={150} h={190} pos="relative">
        <Image
          style={{ borderRadius: rem(15), objectFit: "cover" }}
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={movie.thumbnail}
          alt={movie.title}
          onError={({ currentTarget }) => {
            currentTarget.src = imgNotFound.src;
          }}
        />
      </Box>
      <Stack w="100%">
        <Flex justify="space-between">
          <Text truncate fw="bold" size="lg">
            {movie.title} &nbsp;
          </Text>
          <Flex align="center" gap="md">
            <Text>{movie.year}</Text>
            {isFavoriteMovie ? (
              <ActionIcon size="md" onClick={handleAddMovie}>
                <IconStar style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            ) : (
              <ActionIcon size="md" onClick={handleRemoveMovie}>
                <IconStarFilled style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            )}
          </Flex>
        </Flex>
        <Text lineClamp={4}>{movie.cast}</Text>

        <Flex gap={5}>
          {movie.genres.map((genre) => (
            <Badge key={genre} radius="md" color="gray">
              {genre}
            </Badge>
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
};
