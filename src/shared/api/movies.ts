import axios from "axios";
import { GetMoviesParams, GetMoviesResult } from "./types";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getMovies = async (params: GetMoviesParams) => {
  return instance
    .get<GetMoviesResult>("/movies", { params })
    .then((resp) => resp.data);
};
