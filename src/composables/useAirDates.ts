import { MoviesFetchingService, MoviesListResponse } from '@/types/fetching';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { computed, Ref, ComputedRef } from '@vue/runtime-dom';
import moment from 'moment';

const useAirDates = <Type extends Movie | TVShow>(
  movies: Ref<MoviesListResponse<Type>>,
  type: VideoType,
  key: keyof MoviesFetchingService<Type>
): { begin: ComputedRef<number | null>; end: ComputedRef<number | null> } => {
  if (type === 'movie') {
    return {
      begin: computed(() => (movies.value.dates ? Date.parse(movies.value.dates.minimum) : null)),
      end: computed(() => (movies.value.dates ? Date.parse(movies.value.dates.maximum) : null)),
    };
  } else {
    switch (key) {
      case 'popular':
        return {
          begin: computed(() => null),
          end: computed(() => moment().add(6, 'months').valueOf()),
        };
      case 'airingToday':
        return {
          begin: computed(() => moment().valueOf()),
          end: computed(() => moment().valueOf()),
        };
      case 'onTv':
        return {
          begin: computed(() => moment().valueOf()),
          end: computed(() => moment().add(1, 'week').valueOf()),
        };
      case 'topRated':
        return {
          begin: computed(() => null),
          end: computed(() => moment().add(6, 'months').valueOf()),
        };
      default:
        return { begin: computed(() => null), end: computed(() => null) };
    }
  }
};

export default useAirDates;