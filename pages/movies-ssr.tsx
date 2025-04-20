import { Movie } from "@/entities/movie";
import {
  Box,
  Flex,
  Pagination,
  rem,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import db from "../database";
import { MovieList } from "@/entities/movie";
import { useRouter } from "next/router";
import { useDebouncedValue } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { Navbar } from "@/widgets/navbar";

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { page, search } = context.query;
  const limit = 10;
  let offset = (page * limit) | limit;

  const movies = await db<Movie>("movies")
    .limit(limit)
    .where((builder) => {
      search && builder.where("title", "like", `%${search}%`);
    })
    .offset(offset)
    .select("*");

  const countPage = await db("movies")
    .count("id")
    .first()
    .then((resp: any) => Math.ceil(resp.count / limit) - 2);

  return { props: { movies, countPage } };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(props: HomeProps) {
  const { movies, countPage } = props;
  const router = useRouter();
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(search);

  const handleChangePage = (page: number) => {
    router.push({ pathname: "movies-ssr", query: { page } });
  };

  useEffect(() => {
    if (debouncedSearch !== null) {
      const newQuery = router.query;

      debouncedSearch
        ? (newQuery.search = debouncedSearch)
        : delete newQuery.search;

      router.push({ query: newQuery });
    }
  }, [debouncedSearch]);

  const currentPage = Number(router.query?.page) || 1;

  return (
    <>
      <Navbar />
      <ScrollArea w="75%" type="scroll">
        <Box p={10}>
          <TextInput
            size="md"
            radius="md"
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search..."
            variant="filled"
          />
          <MovieList movies={movies} />
          <Flex mt={rem(30)} justify="center">
            {countPage && !debouncedSearch && (
              <Pagination
                size="lg"
                radius="md"
                value={currentPage}
                onChange={handleChangePage}
                total={countPage}
              />
            )}
          </Flex>
        </Box>
      </ScrollArea>
    </>
  );
}
