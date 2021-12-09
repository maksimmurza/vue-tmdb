import { MoviesFetchingService } from '@/types/fetching';
import { Movie, TVShow } from '@/types/movie';
import axios from 'axios';
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

const motionPicturesFetchingService: {
  movie: MoviesFetchingService<Movie>;
  tv: MoviesFetchingService<TVShow>;
} = {
  movie: {
    popular: (pageNumber = 1) => fetchMovies(`/movie/popular?page=${pageNumber}`),
    nowPlaying: (pageNumber = 1) => fetchMovies(`/movie/now_playing?page=${pageNumber}`),
    upcoming: (pageNumber = 1) => fetchMovies(`/movie/upcoming?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMovies(`/movie/top_rated?page=${pageNumber}`),
  },
  tv: {
    popular: (pageNumber = 1) => fetchMovies(`/tv/popular?page=${pageNumber}`),
    airingToday: (pageNumber = 1) => fetchMovies(`/tv/airing_today?page=${pageNumber}`),
    onTv: (pageNumber = 1) => fetchMovies(`/tv/on_the_air?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMovies(`/tv/top_rated?page=${pageNumber}`),
  },
};

export { motionPicturesFetchingService };
