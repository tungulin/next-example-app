import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { Movie } from "../types";

interface MovieStore {
  search: string;
  favoriteMovies: Movie[];
  actions: {
    setSearch: (newTheme: string) => void;
    clearSearch: () => void;
    addFavoriteMovie: (movie: Movie) => void;
    removeFavoriteMovie: (movie: Movie) => void;
  };
}

export const useMovieStore = create<MovieStore>((set) => ({
  search: "",
  favoriteMovies: [],
  actions: {
    setSearch: (newSearch) =>
      set(() => ({
        search: newSearch,
      })),
    clearSearch: () =>
      set(() => ({
        search: "",
      })),
    addFavoriteMovie: (movie: Movie) =>
      set((state) => {
        const copyFavoriteMovies = structuredClone(state.favoriteMovies);
        copyFavoriteMovies.push(movie);
        return { favoriteMovies: copyFavoriteMovies };
      }),
    removeFavoriteMovie: (movie: Movie) =>
      set((state) => {
        return {
          favoriteMovies: structuredClone(state.favoriteMovies).filter(
            (favMovie) => favMovie.id !== movie.id
          ),
        };
      }),
  },
}));

export const useMovieActions = () =>
  useMovieStore(useShallow((state) => state.actions));

export const useSearch = () =>
  useMovieStore(useShallow((state) => state.search));

export const useFavoriteMovie = () =>
  useMovieStore(useShallow((state) => state.favoriteMovies));
