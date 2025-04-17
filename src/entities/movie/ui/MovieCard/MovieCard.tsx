import React from "react";
import { Movie } from "../../types";
import Image from "next/image";
import { Badge, Box, Flex, rem, Stack, Text, Title } from "@mantine/core";
import imgNotFound from "@public/img-not-found.jpeg";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Flex mt="lg" gap="md">
      <Box miw={150} h={190} pos="relative">
        <Image
          style={{ borderRadius: rem(15) }}
          fill
          objectFit="cover"
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
          <Text>{movie.year}</Text>
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
