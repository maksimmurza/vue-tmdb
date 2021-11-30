import { PopularMoviesResponse, UpcomingMoviesResponse, TopRatedMoviesResponse } from '@/types';
import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const fetchPopularMovies = async (
  pageNumber = 1
): Promise<AxiosResponse<PopularMoviesResponse>> => {
  try {
    const response = await axiosClient.get(`/movie/popular?page=${pageNumber}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const fetchUpcomingMovies = async (
  pageNumber = 1
): Promise<AxiosResponse<UpcomingMoviesResponse>> => {
  try {
    const response = await axiosClient.get(`/movie/upcoming?page=${pageNumber}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const fetchTopRatedMovies = async (
  pageNumber = 1
): Promise<AxiosResponse<TopRatedMoviesResponse>> => {
  try {
    const response = await axiosClient.get(`/movie/top_rated?page=${pageNumber}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { fetchPopularMovies, fetchUpcomingMovies, fetchTopRatedMovies };
