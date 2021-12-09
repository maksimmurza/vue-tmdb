import { MotionPicturesFetchingService } from '@/types/fetching';
import { Movie, TVShow } from '@/types/motionPictures';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';

const fetchMotionPictures = async (link: string) => {
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
  movie: MotionPicturesFetchingService<Movie>;
  tv: MotionPicturesFetchingService<TVShow>;
} = {
  movie: {
    popular: (pageNumber = 1) => fetchMotionPictures(`/movie/popular?page=${pageNumber}`),
    nowPlaying: (pageNumber = 1) => fetchMotionPictures(`/movie/now_playing?page=${pageNumber}`),
    upcoming: (pageNumber = 1) => fetchMotionPictures(`/movie/upcoming?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMotionPictures(`/movie/top_rated?page=${pageNumber}`),
  },
  tv: {
    popular: (pageNumber = 1) => fetchMotionPictures(`/tv/popular?page=${pageNumber}`),
    airingToday: (pageNumber = 1) => fetchMotionPictures(`/tv/airing_today?page=${pageNumber}`),
    onTv: (pageNumber = 1) => fetchMotionPictures(`/tv/on_the_air?page=${pageNumber}`),
    topRated: (pageNumber = 1) => fetchMotionPictures(`/tv/top_rated?page=${pageNumber}`),
  },
};

export { motionPicturesFetchingService };
