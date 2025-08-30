import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { Movie } from '../types';

interface MovieStore {
    search: string;
    favoriteMovies: Movie[];
    actions: {
        setSearch: (newTheme: string) => void;
        clearSearch: () => void;
        addFavoriteMovie: (movie: Movie) => void;
        removeFavoriteMovie: (movie: Movie) => void;
        initFavoriteMovies: (movies: Movie[]) => void;
    };
}

export const useMovieStore = create<MovieStore>(set => ({
    search: '',
    favoriteMovies: [],

    actions: {
        setSearch: newSearch =>
            set(() => ({
                search: newSearch,
            })),
        clearSearch: () =>
            set(() => ({
                search: '',
            })),
        initFavoriteMovies: (movies: Movie[]) =>
            set(() => ({
                favoriteMovies: movies,
            })),
        addFavoriteMovie: (movie: Movie) =>
            set(state => {
                const copyFavoriteMovies = structuredClone(
                    state.favoriteMovies,
                );
                copyFavoriteMovies.push(movie);
                return { favoriteMovies: copyFavoriteMovies };
            }),
        removeFavoriteMovie: (movie: Movie) =>
            set(state => {
                return {
                    favoriteMovies: structuredClone(
                        state.favoriteMovies,
                    ).filter(favMovie => favMovie.id !== movie.id),
                };
            }),
    },
}));

export const useMovieActions = () =>
    useMovieStore(useShallow(state => state.actions));

export const useMovie = useMovieStore;
