import { MoviesFetchingService } from '@/types/fetching';
import { Movie, MovieFilters, TVShow, VideoType } from '@/types/movie';
import axios from 'axios';
import moment from 'moment';
import axiosClient from '../utils/axiosClient';

const fetchMovies = async (link: string) => {
  try {
    const response = await axiosClient.get(link);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const discover = (type: VideoType, pageNumber = 1, filters: MovieFilters) => {
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
      ? `primary_release_date.gte=${moment(releaseDateGteValue).format('YYYY-MM-DD')}&`
      : ''
  );
  query = query.concat(
    releaseDateLteValue
      ? `primary_release_date.lte=${moment(releaseDateLteValue).format('YYYY-MM-DD')}&`
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
  return fetchMovies(`/discover/${type}?${query}page=${pageNumber}`);
};

const moviesFetchingService: {
  movie: MoviesFetchingService<Movie>;
  tv: MoviesFetchingService<TVShow>;
} = {
  movie: {
    popular: (pageNumber = 1) => fetchMovies(`/movie/popular?page=${pageNumber}`),
    'now-playing': (pageNumber = 1) => fetchMovies(`/movie/now_playing?page=${pageNumber}`),
    upcoming: (pageNumber = 1) => fetchMovies(`/movie/upcoming?page=${pageNumber}`),
    'top-rated': (pageNumber = 1) => fetchMovies(`/movie/top_rated?page=${pageNumber}`),
    discover: (pageNumber: number, filters: MovieFilters) => discover('movie', pageNumber, filters),
  },
  tv: {
    popular: (pageNumber = 1) => fetchMovies(`/tv/popular?page=${pageNumber}`),
    'airing-today': (pageNumber = 1) => fetchMovies(`/tv/airing_today?page=${pageNumber}`),
    'on-tv': (pageNumber = 1) => fetchMovies(`/tv/on_the_air?page=${pageNumber}`),
    'top-rated': (pageNumber = 1) => fetchMovies(`/tv/top_rated?page=${pageNumber}`),
    discover: (pageNumber: number, filters: MovieFilters) => discover('tv', pageNumber, filters),
  },
};

export { moviesFetchingService };
