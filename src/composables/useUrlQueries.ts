import { MovieFilters, SortValue } from '@/types/movie';
import { computed, ComputedRef, Ref, watch } from '@vue/runtime-dom';
import { useRoute, useRouter } from 'vue-router';

const useUrlQueries = (
  filters: Ref<MovieFilters>,
  page: Ref<number>
): {
  getFiltersFromUrl: () => void;
  getPageFromUrl: () => void;
  query: ComputedRef<
    Record<'sort' | 'genres' | 'rating' | 'votes' | 'releaseGte' | 'releaseLte' | 'page', string>
  >;
} => {
  const router = useRouter();
  const { query: initQuery } = useRoute();
  const query = computed(() => ({
    sort: filters.value.sortValue ? filters.value.sortValue?.toString() : '',
    genres: filters.value.genresValue ? filters.value.genresValue.toString() : '',
    rating: filters.value.scoreValue.toString(),
    votes: filters.value.votesValue.toString(),
    releaseGte: filters.value.releaseDateGteValue
      ? filters.value.releaseDateGteValue.toString()
      : '',
    releaseLte: filters.value.releaseDateLteValue
      ? filters.value.releaseDateLteValue.toString()
      : '',
    page: page.value.toString(),
  }));

  const getPageFromUrl = () => {
    if (initQuery.page) {
      page.value = Number(initQuery.page);
    }
  };

  watch([filters, page], () => {
    router.replace({ query: { ...query.value } });
  });

  const getFiltersFromUrl = () => {
    if (Object.keys(initQuery).length > 0) {
      let temp;
      Object.keys(initQuery).forEach(queryKey => {
        switch (queryKey) {
          case 'sort':
            filters.value.sortValue = initQuery[queryKey] as SortValue;
            return;
          case 'genres':
            filters.value.genresValue = (initQuery[queryKey] as string)
              ?.split(',')
              .map(genreId => Number(genreId));
            return;
          case 'rating':
            temp = (initQuery[queryKey] as string)?.split(',').map(genreId => Number(genreId));
            filters.value.scoreValue = [temp[0], temp[1]];
            return;
          case 'votes':
            filters.value.votesValue = Number(initQuery[queryKey]);
            return;
          case 'releaseGte':
            filters.value.releaseDateGteValue = Number(initQuery[queryKey]);
            return;
          case 'releaseLte':
            filters.value.releaseDateLteValue = Number(initQuery[queryKey]);
            return;
        }
      });
    }
  };

  return {
    query,
    getFiltersFromUrl,
    getPageFromUrl,
  };
};

export default useUrlQueries;
