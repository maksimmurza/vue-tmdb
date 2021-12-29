import { ComputedRef, Ref } from '@vue/runtime-dom';
import { MovieCredits } from './credits';
import { MoviesFetchingService } from './fetching';

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
  credits?: MovieCredits;
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

export type SortValue =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'original_title.asc'
  | 'original_title.desc';

export interface Filters {
  sortOptions: Array<{ label: string; value: SortValue }> | null;
  sortValue: SortValue | null;
  genresValue: Array<number> | null;
  scoreValue: [0, 100];
  votesValue: 0;
  releaseDateGteValue: number | null;
  releaseDateLteValue: number | null;
}
export interface MovieFilters extends Filters {
  genresOptions: Array<Genre>;
}

export interface MovieFiltersWithRefGenres extends Filters {
  genresOptions: Ref<Array<Genre>>;
}

export type MovieKey = keyof Omit<MoviesFetchingService, 'discover'>;

export interface MovieList {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: number;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface MovieAccountStates {
  id: number;
  favorite: boolean;
  rated: Record<string, unknown> | boolean;
  watchlist: boolean;
}

export interface MovieInfo {
  details: Ref<Movie | TVShow | null>;
  detailsLoading: Ref<boolean>;
  detailsError: Ref<Error | null>;
  credits: Ref<MovieCredits | null>;
  creditsLoading: Ref<boolean>;
  creditsError: Ref<Error | null>;
  video: Ref<Array<MotionPictureVideo>>;
  videosLoading: Ref<boolean>;
  videosError: Ref<Error | null>;
  coverURL: ComputedRef<string | null>;
  trailerURL: ComputedRef<string | null>;
  backgroundImageURL: ComputedRef<string | null>;
  backgroundImageStyle: ComputedRef<{ backgroundImage: string }>;
  getDetails: () => Promise<void>;
  getCredits: () => Promise<void>;
  getVideo: () => Promise<void>;
}
