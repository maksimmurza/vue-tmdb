import { AxiosResponse } from 'axios';
import { Movie, MovieFilters, TVShow } from './movie';

export interface MoviesListResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
  dates?: { maximum: string; minimum: string };
}

export interface MovieListDetails {
  poster_path: string;
  id: number;
  backdrop_path: string;
  total_results: number;
  public: boolean;
  revenue: string;
  page: number;
  total_pages: number;
  description: string;
  average_rating: number;
  runtime: number;
  name: string;
  created_by: {
    gravatar_hash: string;
    name: string;
    username: string;
  };
  results: Array<Movie | TVShow>;
}

export interface MovieSetAccountStateResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface RequestTokenResponse extends MovieSetAccountStateResponse {
  request_token: string;
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
