import { MovieType, VideoType } from '@/types/movie';
import axios, { AxiosResponse } from 'axios';
import { axiosClientApiV3, axiosClientApiV4 } from '../utils/axiosClient';

const accountDetails = async (session_id: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(`/account?session_id=${session_id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const fetchMovieAccountStates = async (
  session_id: string,
  movieId: number,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(
      `/${type}/${movieId}/account_states?session_id=${session_id}`
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
  session_id: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.post(
      `account/${accountId}/favorite/${type === 'movie' ? 'movies' : 'tv'}?session_id=${session_id}`
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
  session_id: string,
  type: MovieType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(
      `account/${accountId}/rated/${type === 'movie' ? 'movies' : 'tv'}?session_id=${session_id}`
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
  session_id: string,
  type: MovieType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(
      `account/${accountId}/watchlist/${
        type === 'movie' ? 'movies' : 'tv'
      }?session_id=${session_id}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const createdLists = async (accountId: string, session_id: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.get(
      `account/${accountId}/lists?session_id=${session_id}`
    );
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
  access_token: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV4.post(
      `list/${listId}/items`,
      {
        items: [{ media_type: type, media_id: movieId }],
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
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
  access_token: string,
  type: VideoType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV4.delete(`list/${listId}/items`, {
      data: { items: [{ media_type: type, media_id: movieId }] },
      headers: { Authorization: `Bearer ${access_token}` },
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
  type: VideoType,
  listId: number,
  access_token: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV4.get(
      `list/${listId}/item_status?media_id=${movieId}&media_type=${type}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
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
  session_id: string,
  type: VideoType,
  movieId: number,
  favorite: boolean
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.post(
      `/account/${accountId}/favorite?session_id=${session_id}`,
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
  session_id: string,
  type: VideoType,
  movieId: number,
  watchlist: boolean
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.post(
      `/account/${accountId}/watchlist?session_id=${session_id}`,
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
  session_id: string,
  type: VideoType,
  movieId: number,
  ratingValue: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.post(
      `/${type}/${movieId}/rating?session_id=${session_id}`,
      {
        value: ratingValue,
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const deleteRating = async (
  session_id: string,
  type: VideoType,
  movieId: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosClientApiV3.delete(
      `/${type}/${movieId}/rating?session_id=${session_id}`
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
