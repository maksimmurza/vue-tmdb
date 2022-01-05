import { MoviesFetchingService } from '@/types/fetching';
import { Movie, MovieFilters, TVShow } from '@/types/movie';
import getQuery from '@/utils/getQuery';
import axios from 'axios';
import { axiosClientApiV3 } from '../utils/axiosClient';

const fetchMovies = async (link: string) => {
  try {
    const response = await axiosClientApiV3.get(link);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
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
    discover: (pageNumber: number, filters: MovieFilters) =>
      fetchMovies(`/discover/movie?${getQuery(filters)}page=${pageNumber}`),
  },
  tv: {
    popular: (pageNumber = 1) => fetchMovies(`/tv/popular?page=${pageNumber}`),
    'airing-today': (pageNumber = 1) => fetchMovies(`/tv/airing_today?page=${pageNumber}`),
    'on-tv': (pageNumber = 1) => fetchMovies(`/tv/on_the_air?page=${pageNumber}`),
    'top-rated': (pageNumber = 1) => fetchMovies(`/tv/top_rated?page=${pageNumber}`),
    discover: (pageNumber: number, filters: MovieFilters) =>
      fetchMovies(`/discover/tv?${getQuery(filters)}page=${pageNumber}`),
  },
};

export { moviesFetchingService };
