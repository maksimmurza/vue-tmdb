import { MovieKey } from '@/types/movie';
import dayjs from 'dayjs';

const getAirDates = (key: MovieKey): { begin: number | null; end: number | null } => {
  const airDatesService = {
    popular: {
      begin: null,
      end: dayjs().add(6, 'month').valueOf(),
    },
    'now-playing': {
      begin: dayjs().subtract(30, 'day').valueOf(),
      end: dayjs().add(1, 'day').valueOf(),
    },
    upcoming: {
      begin: dayjs().add(1, 'day').valueOf(),
      end: dayjs().add(30, 'day').valueOf(),
    },
    'airing-today': {
      begin: dayjs().valueOf(),
      end: dayjs().valueOf(),
    },
    'on-tv': {
      begin: dayjs().valueOf(),
      end: dayjs().add(1, 'week').valueOf(),
    },
    'top-rated': {
      begin: null,
      end: dayjs().add(6, 'months').valueOf(),
    },
  };

  return airDatesService[key];
};

export default getAirDates;
