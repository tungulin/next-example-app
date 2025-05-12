import { Box, Flex, ScrollArea } from "@mantine/core";
import { MovieList } from "@/entities/movie";

import { Navbar } from "@/widgets/navbar";
import { getMovies } from "./actions";
import { Search } from "@/widgets/search";
import { Pagination } from "@/widgets/pagination";
import { Header } from "@/widgets/header";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export const revalidate = 3600;

export default async function MoviesSSR({ searchParams }: Props) {
  let { page: pageParam, search } = await searchParams;
  const page = pageParam ? Number(pageParam) : 1;

  const { movies, countPage } = await getMovies(page, search);

  return (
    <Flex mih="100vh">
      <Navbar />
      <ScrollArea w="75%" type="scroll">
        <Header />
        <Box p={10}>
          <Search />
          <MovieList movies={movies} />
          <Pagination search={search} countPage={countPage} page={page} />
        </Box>
      </ScrollArea>
    </Flex>
  );
}
