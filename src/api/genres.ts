import { VideoType } from '@/types/movie';
import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const fetchGenres = async (type: VideoType): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`/genre/${type}/list`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { fetchGenres };
