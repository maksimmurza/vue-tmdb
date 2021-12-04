export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}

export type PopularMoviesResponse = MoviesResponse;
export type TopRatedMoviesResponse = MoviesResponse;

export interface UpcomingMoviesResponse extends MoviesResponse {
  dates: { maximum: string; minimum: string };
}

export interface UserInfo {
  name: string;
  username: string;
  sessionId: string;
  avatar: string | null;
}
