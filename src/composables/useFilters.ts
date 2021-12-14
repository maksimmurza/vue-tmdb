import { Movie, MovieType, TVShow, VideoType } from '@/types/movie';
import { reactive, Ref } from '@vue/runtime-dom';
import useAirDates from './useAirDates';
import useGenres from './useGenres';
import { sortingOptions } from '../constants';
import { MoviesFetchingService, MoviesListResponse } from '@/types/fetching';

const useFilters = <Type extends Movie | TVShow>(
  movies: Ref<MoviesListResponse<Type>>,
  type: VideoType,
  key: keyof MoviesFetchingService<Type>
): { filters: any; getFilters: () => void } => {
  const { begin: releaseDateGte, end: releaseDateLte } = useAirDates<Type>(movies, type, key);

  const { loading: genresLoading, genres, error: genresError, getGenres } = useGenres(type);

  const filters = reactive({
    sortingOptions,
    sortValue: key === 'topRated' ? 'vote_average.desc' : 'popularity.desc',
    genres,
    genresInput: null,
    scoreValue: [0, 100],
    votesValue: 0,
    releaseDateGte,
    releaseDateLte,
  });

  const getFilters = () => {
    getGenres();
  };

  return { filters, getFilters };
};

export default useFilters;
