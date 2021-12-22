import { AxiosResponse } from 'axios';
import { MovieFilters } from './movie';

export interface MoviesListResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
  dates?: { maximum: string; minimum: string };
}

export interface MovieSetAccountStateResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export type FetchingMoviesFunction<T> = (pageNumber?: number) => Promise<AxiosResponse<T>>;

export interface MoviesFetchingService<Type = unknown> {
  popular: FetchingMoviesFunction<MoviesListResponse<Type>>;
  'now-playing'?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  upcoming?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  'airing-today'?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  'on-tv'?: FetchingMoviesFunction<MoviesListResponse<Type>>;
  'top-rated': FetchingMoviesFunction<MoviesListResponse<Type>>;
  discover: (
    pageNumber: number,
    filters: MovieFilters
  ) => Promise<AxiosResponse<MoviesListResponse<Type>>>;
}
