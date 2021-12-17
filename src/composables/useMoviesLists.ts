import { Movie, MovieKey, MovieList, TVShow, VideoType } from '@/types/movie';
import { favoriteMovies, ratedMovies, watchList, createdLists } from '../api/account';

const useMoviesLists = (
  type: VideoType,
  key: MovieKey
): {
  movieListsLoading: boolean;
  movieListError: Error | null;
  favoriteMovies: Array<Movie | TVShow>;
  ratedMovies: Array<Movie | TVShow>;
  watchList: Array<Movie | TVShow>;
  createdLists: Array<MovieList>;
  getFavoriteMovies: () => Promise<void>;
  getRatedMovies: () => Promise<void>;
  getWatchList: () => Promise<void>;
  getCreatedLists: () => Promise<void>;
} => {
  const getFavoriteMovies = async () => {
    // smth
  };

  const getRatedMovies = async () => {
    // smth
  };

  const getWatchList = async () => {
    // smth
  };

  const getCreatedLists = async () => {
    // smth
  };

  return {
    movieListsLoading: false,
    movieListError: null,
    favoriteMovies: [],
    ratedMovies: [],
    watchList: [],
    createdLists: [],
    getFavoriteMovies,
    getRatedMovies,
    getWatchList,
    getCreatedLists,
  };
};

export default useMoviesLists;
