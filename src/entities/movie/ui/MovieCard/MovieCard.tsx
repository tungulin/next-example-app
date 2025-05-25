"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { ActionIcon, Badge, Box, Flex, rem, Stack, Text } from "@mantine/core";
import imgNotFound from "@public/img-not-found.jpeg";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useMovie, useMovieActions } from "../../model/store";

import { Movie } from "../../types";
import * as movieApi from "../../api/movies";
import { notifications } from "@mantine/notifications";
import { useUser } from "@/entities/user";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { addFavoriteMovie, removeFavoriteMovie } = useMovieActions();
  const user = useUser();
  const favoriteMovies = useMovie((state) => state.favoriteMovies);

  const handleAddMovie = () => {
    if (favoriteMovies.length === 5) {
      notifications.show({
        color: "red",
        message: "You have selected the max number of favorite movies",
      });

      return;
    }

    movieApi
      .addFavoriteMovie({ movieId: movie.id })
      .then(() => {
        addFavoriteMovie(movie);
        notifications.show({
          color: "green",
          message: "The movie has been added to the favorites catalog",
        });
      })
      .catch(() => {
        notifications.show({
          color: "red",
          message: "Something going wrong...",
        });
      });
  };

  const handleRemoveMovie = () => {
    movieApi.removeFavoriteMovie({ movieId: movie.id }).then(() => {
      removeFavoriteMovie(movie);
      notifications.show({
        color: "green",
        message: "The film has been removed from the favorites catalog",
      });
    });
  };

  const isFavoriteMovie = useMemo(
    () => !favoriteMovies.some((favMovie) => favMovie.id === movie.id),
    [favoriteMovies]
  );

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

            {user && (
              <>
                {isFavoriteMovie ? (
                  <ActionIcon size="md" onClick={handleAddMovie}>
                    <IconStar style={{ width: "70%", height: "70%" }} />
                  </ActionIcon>
                ) : (
                  <ActionIcon size="md" onClick={handleRemoveMovie}>
                    <IconStarFilled style={{ width: "70%", height: "70%" }} />
                  </ActionIcon>
                )}
              </>
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
