import { PopularMoviesResponse, UpcomingMoviesResponse, TopRatedMoviesResponse } from '@/types';
import axios, { AxiosResponse } from 'axios';
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

type FetchingFunction<T> = (pageNumber?: number) => Promise<AxiosResponse<T>>;

type MovieFetchingService = {
  popular: FetchingFunction<PopularMoviesResponse>;
  upcoming: FetchingFunction<UpcomingMoviesResponse>;
  topRated: FetchingFunction<TopRatedMoviesResponse>;
};

const movieFetchingService: MovieFetchingService = {
  popular: (pageNumber = 1) => fetchMovies(`/movie/popular?page=${pageNumber}`),
  upcoming: (pageNumber = 1) => fetchMovies(`/movie/upcoming?page=${pageNumber}`),
  topRated: (pageNumber = 1) => fetchMovies(`/movie/top_rated?page=${pageNumber}`),
};

export { movieFetchingService, MovieFetchingService };
