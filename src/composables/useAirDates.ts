import { Movie, MovieKey, TVShow } from '@/types/movie';
import moment from 'moment';

const useAirDates = <Type extends Movie | TVShow>(
  key: MovieKey<Type>
): { begin: number | null; end: number | null } => {
  const airDatesService = {
    popular: {
      begin: null,
      end: moment().add(6, 'months').valueOf(),
    },
    'now-playing': {
      begin: moment().subtract(30, 'day').valueOf(),
      end: moment().add(1, 'day').valueOf(),
    },
    upcoming: {
      begin: moment().add(1, 'day').valueOf(),
      end: moment().add(30, 'day').valueOf(),
    },
    'airing-today': {
      begin: moment().valueOf(),
      end: moment().valueOf(),
    },
    'on-tv': {
      begin: moment().valueOf(),
      end: moment().add(1, 'week').valueOf(),
    },
    'top-rated': {
      begin: null,
      end: moment().add(6, 'months').valueOf(),
    },
  };

  return airDatesService[key];
};

export default useAirDates;
