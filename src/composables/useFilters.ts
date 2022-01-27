import {
  MovieFilters,
  MovieFiltersWithRefGenres,
  MovieKey,
  SortValue,
  VideoType,
} from '@/types/movie';
import { computed, ComputedRef, Ref, ref } from 'vue';
import getAirDates from '../utils/getAirDates';
import useGenres from './useGenres';
import { sortOptions } from '../constants';
import { useRoute } from 'vue-router';

const useFilters = (
  type: VideoType,
  key: MovieKey
): {
  filters: Ref<MovieFilters>;
  getFilters: () => void;
  filtersLoading: ComputedRef<boolean>;
  filtersError: ComputedRef<Error | null>;
} => {
  const { query } = useRoute();
  const { begin: releaseDateGteValue, end: releaseDateLteValue } = getAirDates(key);
  const { loading: genresLoading, genresOptions, error: genresError, getGenres } = useGenres(type);

  const filters = ref<MovieFiltersWithRefGenres>({
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
    if (Object.keys(query).length > 0) {
      let temp;
      Object.keys(query).forEach(queryKey => {
        switch (queryKey) {
          case 'sort':
            filters.value.sortValue = query[queryKey] as SortValue;
            return;
          case 'genres':
            filters.value.genresValue = (query[queryKey] as string)
              ?.split(',')
              .map(genreId => Number(genreId));
            return;
          case 'rating':
            temp = (query[queryKey] as string)?.split(',').map(genreId => Number(genreId));
            filters.value.scoreValue = [temp[0], temp[1]];
            return;
          case 'votes':
            filters.value.votesValue = Number(query[queryKey]);
            return;
          case 'release':
            temp = (query[queryKey] as string)?.split(',').map(genreId => Number(genreId));
            filters.value.releaseDateGteValue = temp[0];
            filters.value.releaseDateLteValue = temp[1];
            return;
        }
      });
    }
  };

  return { filters, getFilters, filtersLoading, filtersError };
};

export default useFilters;
