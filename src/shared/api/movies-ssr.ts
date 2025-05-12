import { getQueryParams } from "../libs/http";
import { GetMoviesResult } from "./types";

export const getMovies = async (
  page: number,
  search?: string
): Promise<GetMoviesResult> => {
  new URLSearchParams({
    foo: "value",
    bar: "2",
  }).toString();

  const params = getQueryParams({ page, search });
  console.log("params", params);
  const res = await fetch("http://localhost:3000/api/movies?" + params);
  return await res.json();
};
