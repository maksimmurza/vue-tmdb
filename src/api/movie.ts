import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const fetchMovie = async (movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieCredits = async (movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}/credits`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieVideos = async (movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}/videos`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { fetchMovie, movieCredits, movieVideos };
