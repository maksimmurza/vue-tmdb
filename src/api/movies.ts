import {
  PopularMoviesResponse,
  UpcomingMoviesResponse,
  TopRatedMoviesResponse,
  NowPlayingMoviesResponse,
  PopularTVShowsResponse,
  AiringTodayTVShowsResponse,
  OnTVShowsResponse,
  TopRatedTVShowsResponse,
} from '@/types';
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

type MoviesFetchingService = {
  popular: FetchingFunction<PopularMoviesResponse>;
  nowPlaying: FetchingFunction<NowPlayingMoviesResponse>;
  upcoming: FetchingFunction<UpcomingMoviesResponse>;
  topRated: FetchingFunction<TopRatedMoviesResponse>;
};

type TVShowsFetchingService = {
  popular: FetchingFunction<PopularTVShowsResponse>;
  airingToday: FetchingFunction<AiringTodayTVShowsResponse>;
  onTv: FetchingFunction<OnTVShowsResponse>;
  topRated: FetchingFunction<TopRatedTVShowsResponse>;
};

const moviesFetchingService: MoviesFetchingService = {
  popular: (pageNumber = 1) => fetchMovies(`/movie/popular?page=${pageNumber}`),
  nowPlaying: (pageNumber = 1) => fetchMovies(`/movie/now_playing?page=${pageNumber}`),
  upcoming: (pageNumber = 1) => fetchMovies(`/movie/upcoming?page=${pageNumber}`),
  topRated: (pageNumber = 1) => fetchMovies(`/movie/top_rated?page=${pageNumber}`),
};

const tvShowsFetchingService: TVShowsFetchingService = {
  popular: (pageNumber = 1) => fetchMovies(`/tv/popular?page=${pageNumber}`),
  airingToday: (pageNumber = 1) => fetchMovies(`/tv/airing_today?page=${pageNumber}`),
  onTv: (pageNumber = 1) => fetchMovies(`/tv/on_the_air?page=${pageNumber}`),
  topRated: (pageNumber = 1) => fetchMovies(`/tv/top_rated?page=${pageNumber}`),
};

export {
  moviesFetchingService,
  tvShowsFetchingService,
  MoviesFetchingService,
  TVShowsFetchingService,
};
