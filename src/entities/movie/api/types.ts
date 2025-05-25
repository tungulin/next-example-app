export type GetMoviesParams = {
  page: number;
  search?: string;
};

export type GetMoviesResult = {
  movies: {
    id: string;
    title: string;
    year: number;
    cast: string[];
    genres: string[];
    extract: string;
    thumbnail: string;
  }[];
  countPage: number;
};

export type AddFavoriteParams = {
  movieId: string;
};
