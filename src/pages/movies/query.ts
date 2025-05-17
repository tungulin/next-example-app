import { moviesApi } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["movies", page, search],
    queryFn: () => moviesApi.getMovies({ page, search }),
  });
};
