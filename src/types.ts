export interface MovieMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Actor extends MovieMember {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember extends MovieMember {
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCredits {
  id: number;
  cast: Array<Actor>;
  crew: Array<CrewMember>;
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

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
  credits?: MovieCredits;
  videos?: { id: number; results: Array<MovieVideo> };
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
