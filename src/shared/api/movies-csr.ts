"use client";
import { getQueryParams } from "../libs/http";
import { GetMoviesResult } from "./types";

export const getMovies = async (
  page: number,
  search?: string
): Promise<GetMoviesResult> => {
  const params = getQueryParams({ page, search });

  return fetch("http://localhost:3000/api/movies?" + params).then((res) =>
    res.json()
  );
};
