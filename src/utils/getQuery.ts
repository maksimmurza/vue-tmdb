import { MovieFilters } from '@/types/movie';
import dayjs from 'dayjs';

const getQuery = (filters: MovieFilters): string => {
  let query = '';
  const {
    sortValue,
    releaseDateGteValue,
    releaseDateLteValue,
    genresValue,
    scoreValue,
    votesValue,
  } = filters;
  const genresIds =
    genresValue && genresValue.length > 0
      ? genresValue.reduce((s: string, g: number) => `${s}${g},`, '')
      : [];
  query = query.concat(sortValue ? `sort_by=${sortValue}&` : '');
  query = query.concat(
    releaseDateGteValue
      ? `primary_release_date.gte=${dayjs(releaseDateGteValue).format('YYYY-MM-DD')}&`
      : ''
  );
  query = query.concat(
    releaseDateLteValue
      ? `primary_release_date.lte=${dayjs(releaseDateLteValue).format('YYYY-MM-DD')}&`
      : ''
  );
  query = query.concat(
    genresValue && genresValue.length > 0 ? `with_genres=${genresIds.slice(0, -1)}&` : ''
  );
  query = query.concat(
    scoreValue
      ? `vote_average.gte=${scoreValue[0] / 10}&vote_average.lte=${scoreValue[1] / 10}&`
      : ''
  );
  query = query.concat(votesValue ? `vote_count.gte=${votesValue}&` : '');
  return query;
};

export default getQuery;
