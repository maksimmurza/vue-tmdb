import {
  Movie,
  MovieFilters,
  MovieFiltersWithRefGenres,
  MovieKey,
  TVShow,
  VideoType,
} from '@/types/movie';
import { computed, ComputedRef, reactive, Ref, UnwrapNestedRefs } from 'vue';
import useAirDates from './useAirDates';
import useGenres from './useGenres';
import { sortOptions } from '../constants';
import { MoviesListResponse } from '@/types/fetching';

const useFilters = <Type extends Movie | TVShow>(
  movies: Ref<MoviesListResponse<Type>>,
  type: VideoType,
  key: MovieKey<Type>
): {
  filters: UnwrapNestedRefs<MovieFilters>;
  getFilters: () => void;
  filtersLoading: ComputedRef<boolean>;
  filtersError: ComputedRef<Error | null>;
} => {
  const { begin: releaseDateGteValue, end: releaseDateLteValue } = useAirDates<Type>(key);
  const { loading: genresLoading, genresOptions, error: genresError, getGenres } = useGenres(type);

  const filters = reactive<MovieFiltersWithRefGenres>({
    sortOptions,
    sortValue: key === 'top-rated' ? 'vote_average.desc' : 'popularity.desc',
    genresOptions,
    genresValue: null,
    scoreValue: [0, 100],
    votesValue: 0,
    releaseDateGteValue,
    releaseDateLteValue,
  });

  const filtersLoading = computed(() => genresLoading.value);
  const filtersError = computed(() => genresError.value);

  const getFilters = () => {
    getGenres();
  };

  return { filters, getFilters, filtersLoading, filtersError };
};

export default useFilters;
