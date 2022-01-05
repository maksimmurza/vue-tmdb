import { VideoType } from '@/types/movie';
import axios, { AxiosResponse } from 'axios';
import { axiosClientApiV3 } from '../utils/axiosClient';

const fetchMovie = async (url: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(url);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const movieFetchingService = {
  fetchMovie: (type: VideoType, movieId: number): Promise<AxiosResponse> =>
    fetchMovie(`/${type}/${movieId}`),
  movieCredits: (type: VideoType, movieId: number): Promise<AxiosResponse> =>
    fetchMovie(`/${type}/${movieId}/credits`),
  movieVideos: (type: VideoType, movieId: number): Promise<AxiosResponse> =>
    fetchMovie(`/${type}/${movieId}/videos`),
};

export default movieFetchingService;
