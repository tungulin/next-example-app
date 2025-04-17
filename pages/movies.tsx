import { Movie } from "@/entities/movie";
import { Flex, Pagination, rem, TextInput } from "@mantine/core";
import { InferGetServerSidePropsType } from "next";

import db from "../database";
import { MovieList } from "@/entities/movie";
import { useRouter } from "next/router";
import { useDebouncedValue, useStateRef } from "@/shared/hooks";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context: any) => {
  const { page, search } = context.query;
  const limit = 10;
  let offset = page * limit;

  console.log("search", search);

  const movies = await db<Movie>("movies")
    .limit(limit)
    .where((builder) => {
      search && builder.where("title", "ILIKE", `%${search}%`);
    })
    .offset(offset)
    .select("*");

  const countPage = await db("movies")
    .count("id")
    .first()
    .then((resp: any) => Math.ceil(resp.count / limit) - 1);

  return { props: { movies, countPage } };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home(props: HomeProps) {
  const { movies, countPage } = props;
  const router = useRouter();
  const [search, setSearch] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(search);

  const handleChangePage = (page: number) => {
    router.push({ pathname: "movies", query: { page } });
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
    </>
  );
}
