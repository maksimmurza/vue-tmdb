import { MoviesFetchingService } from '@/types/fetching';
import { Genre, Movie, TVShow } from '@/types/movie';
import { toRefs } from '@vue/runtime-dom';
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

const discover = (pageNumber = 1, filters: any) => {
  let query = '';
  const { sortValue, releaseDateGte, releaseDateLte, genresInput, scoreValue, votesValue } =
    filters;
  console.log(genresInput.value);
  const genresIds =
    genresInput.value && genresInput.value.length > 0
      ? genresInput.value.reduce((s: string, g: number) => `${s}${g},`, '')
      : [];
  console.log('ids', genresIds);
  query = query.concat(sortValue.value ? `sort_by=${sortValue.value}&` : '');
  query = query.concat(
    releaseDateGte.value
      ? `release_date.gte=${moment(releaseDateGte.value).format('YYYY-MM-DD')}&`
      : ''
  );
  query = query.concat(
    releaseDateLte.value
      ? `release_date.lte=${moment(releaseDateLte.value).format('YYYY-MM-DD')}&`
      : ''
  );
  query = query.concat(
    genresInput.value && genresInput.value.length > 0
      ? `with_genres=${genresIds.slice(0, -1)}&`
      : ''
  );
  query = query.concat(
    scoreValue.value
      ? `vote_average.gte=${scoreValue.value[0] / 10}&vote_average.lte=${scoreValue.value[1] / 10}&`
      : ''
  );
  query = query.concat(votesValue.value ? `vote_count.gte=${votesValue.value}&` : '');
  console.log('query', `/discover/movie?${query}${pageNumber}`);
  return fetchMovies(`/discover/movie?${query}page=${pageNumber}`);
};

const motionPicturesFetchingService: {
  movie: MoviesFetchingService<Movie>;
  tv: MoviesFetchingService<TVShow>;
} = {
  movie: {
    popular: (pageNumber = 1) => fetchMovies(`/movie/popular?page=${pageNumber}`),
    nowPlaying: (pageNumber = 1) => fetchMovies(`/movie/now_playing?page=${pageNumber}`),
    upcoming: (pageNumber = 1) => fetchMovies(`/movie/upcoming?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMovies(`/movie/top_rated?page=${pageNumber}`),
    discover,
  },
  tv: {
    popular: (pageNumber = 1) => fetchMovies(`/tv/popular?page=${pageNumber}`),
    airingToday: (pageNumber = 1) => fetchMovies(`/tv/airing_today?page=${pageNumber}`),
    onTv: (pageNumber = 1) => fetchMovies(`/tv/on_the_air?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMovies(`/tv/top_rated?page=${pageNumber}`),
    discover,
  },
};

export { motionPicturesFetchingService };
