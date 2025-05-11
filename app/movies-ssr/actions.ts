"use server";

import { cache } from "react";
import db from "../../database";
import { Movie } from "@/entities/movie";

export const getMovies = cache(async (page?: number, search?: string) => {
  if (!page) page = 1;

  const limit = 10;

  const offset = (page * limit) | limit;

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

  return { movies, countPage };
});
