import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const fetchMovie = async (type: 'movie' | 'tv', movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/${type}/${movieId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieCredits = async (type: 'movie' | 'tv', movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/${type}/${movieId}/credits`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieVideos = async (type: 'movie' | 'tv', movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/${type}/${movieId}/videos`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { fetchMovie, movieCredits, movieVideos };
