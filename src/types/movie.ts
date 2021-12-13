import { MotionPictureCredits } from './credits';

export type MovieType = 'movie';
export type TVShowType = 'tv';
export type VideoType = MovieType | TVShowType;

export interface MotionPicture {
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  credits?: MotionPictureCredits;
  videos?: { id: number; results: Array<MotionPictureVideo> };
}

export interface MotionPictureVideo {
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

export interface Movie extends MotionPicture {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface TVShow extends MotionPicture {
  first_air_date: string;
  name: string;
  origin_country: Array<string>;
  original_name: string;
}

export interface Genre {
  id: number;
  name: string;
}
