export type GetMoviesResult = {
  movies: {
    title: string;
    year: number;
    cast: string[];
    genres: string[];
    extract: string;
    thumbnail: string;
  }[];
  countPage: number;
};
