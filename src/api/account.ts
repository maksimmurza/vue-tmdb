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
  type: MovieType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClient.get(
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

const watchList = async (
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

const setFavorite = async (
  accountId: string,
  sessionId: string,
  type: MovieType,
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

export {
  accountDetails,
  fetchMovieAccountStates,
  favoriteMovies,
  ratedMovies,
  watchList,
  createdLists,
  setFavorite,
};
