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

export interface Video {
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends Video {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
  credits?: MovieCredits;
  videos?: { id: number; results: Array<MovieVideo> };
}

export interface TVShow extends Video {
  first_air_date: string;
  name: string;
  origin_country: Array<string>;
  original_name: string;
}

interface VideosResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
}

export type MoviesResponse = VideosResponse<Movie>;
export type TVShowsResponse = VideosResponse<TVShow>;

export interface DatedVideosResponse<T> extends VideosResponse<T> {
  dates: { maximum: string; minimum: string };
}

export type PopularMoviesResponse = MoviesResponse;
export type NowPlayingMoviesResponse = DatedVideosResponse<Movie>;
export type UpcomingMoviesResponse = DatedVideosResponse<Movie>;
export type TopRatedMoviesResponse = MoviesResponse;

export type PopularTVShowsResponse = TVShowsResponse;
export type AiringTodayTVShowsResponse = TVShowsResponse;
export type OnTVShowsResponse = TVShowsResponse;
export type TopRatedTVShowsResponse = TVShowsResponse;

export interface UserInfo {
  name: string;
  username: string;
  sessionId: string;
  avatar: string | null;
}
