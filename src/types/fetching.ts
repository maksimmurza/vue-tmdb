import { AxiosResponse } from 'axios';

export interface MoviesListResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
  dates?: { maximum: string; minimum: string };
}

export type FetchingMoviesFunction<T> = (pageNumber?: number) => Promise<AxiosResponse<T>>;

export interface MoviesFetchingService<Type> {
  popular: FetchingMoviesFunction<MoviesListResponse<Type>>;
  nowPlaying?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  upcoming?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  airingToday?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  onTv?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  topRated: FetchingMoviesFunction<MoviesListResponse<Type>>;
}
