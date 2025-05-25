export type GetMoviesParams = {
  page: number;
  search?: string;
};

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
