import { movieApi } from "@/entities/movie";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["movies", page, search],
    queryFn: () => movieApi.getMovies({ page, search }),
  });
};
