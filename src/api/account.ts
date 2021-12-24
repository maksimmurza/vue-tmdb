import { MovieType, VideoType } from '@/types/movie';
import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const accountDetails = async (sessionId: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`account?session_id=${sessionId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const fetchMovieAccountStates = async (
  sessionId: string,
  movieId: number,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(
      `/${type}/${movieId}/account_states?session_id=${sessionId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const favoriteMovies = async (
  accountId: string,
  sessionId: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(
      `account/${accountId}/favorite/${type === 'movie' ? 'movies' : 'tv'}?session_id=${sessionId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const ratedMovies = async (
  accountId: string,
  sessionId: string,
  type: MovieType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(
      `account/${accountId}/rated/${type === 'movie' ? 'movies' : 'tv'}?session_id=${sessionId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const watchlistMovies = async (
  accountId: string,
  sessionId: string,
  type: MovieType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(
      `account/${accountId}/watchlist/${type === 'movie' ? 'movies' : 'tv'}?session_id=${sessionId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const createdLists = async (accountId: string, sessionId: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(`account/${accountId}/lists?session_id=${sessionId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const addToList = async (
  movieId: number,
  listId: number,
  sessionId: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(`list/${listId}/add_item?session_id=${sessionId}`, {
      media_id: movieId,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const removeFromList = async (
  movieId: number,
  listId: number,
  sessionId: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(`list/${listId}/remove_item?session_id=${sessionId}`, {
      media_id: movieId,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const checkMovieListState = async (
  movieId: number,
  listId: number,
  sessionId: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(
      `list/${listId}/item_status?movie_id=${movieId}session_id=${sessionId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const setFavorite = async (
  accountId: string,
  sessionId: string,
  type: VideoType,
  movieId: number,
  favorite: boolean
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(
      `/account/${accountId}/favorite?session_id=${sessionId}`,
      { media_type: type, media_id: movieId, favorite }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const watchlist = async (
  accountId: string,
  sessionId: string,
  type: VideoType,
  movieId: number,
  watchlist: boolean
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(
      `/account/${accountId}/watchlist?session_id=${sessionId}`,
      { media_type: type, media_id: movieId, watchlist }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const setRating = async (
  sessionId: string,
  type: VideoType,
  movieId: number,
  ratingValue: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.post(`/${type}/${movieId}/rating?session_id=${sessionId}`, {
      value: ratingValue,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const deleteRating = async (
  sessionId: string,
  type: VideoType,
  movieId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.delete(`/${type}/${movieId}/rating?session_id=${sessionId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export {
  accountDetails,
  fetchMovieAccountStates,
  favoriteMovies,
  ratedMovies,
  watchlistMovies,
  watchlist,
  createdLists,
  setFavorite,
  setRating,
  deleteRating,
  checkMovieListState,
  addToList,
  removeFromList,
};
