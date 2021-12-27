import { VideoType } from '@/types/movie';
import axios, { AxiosResponse } from 'axios';
import { axiosClientApiV3, axiosClientApiV4 } from '../utils/axiosClient';

const fetchMovie = async (type: VideoType, movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(`/${type}/${movieId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieCredits = async (type: VideoType, movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(`/${type}/${movieId}/credits`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieVideos = async (type: VideoType, movieId: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(`/${type}/${movieId}/videos`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { fetchMovie, movieCredits, movieVideos };
