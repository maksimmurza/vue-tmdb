import { RequestTokenResponse } from '@/types/fetching';
import axios, { AxiosResponse } from 'axios';
import { axiosClientApiV3, axiosClientApiV4 } from '../utils/axiosClient';
// import { useRouter } from 'vue-router';

const loginV3 = async (username: string, password: string): Promise<AxiosResponse> => {
  try {
    const createRequestTokenResponse = await axiosClientApiV3.post(`/auth/request_token`);
    const { request_token } = createRequestTokenResponse.data;
    await axiosClientApiV3.post(`/authentication/token/validate_with_login`, {
      username,
      password,
      request_token,
    });
    const createNewSessionResponse = await axiosClientApiV3.post(`/authentication/session/new`, {
      request_token,
    });
    return createNewSessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error((error as Error).message as string);
  }
};

const logoutV3 = async (session_id: string): Promise<AxiosResponse> => {
  try {
    const deleteSessionResponse = await axiosClientApiV3.delete(`/authentication/session`, {
      data: {
        session_id: session_id,
      },
    });
    return deleteSessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

const loginV4 = async (redirect_to: string): Promise<AxiosResponse<RequestTokenResponse>> => {
  try {
    // const baseURL = window.location.origin;
    const createRequestTokenResponse = await axiosClientApiV4.post(`/auth/request_token`, {
      redirect_to,
    });
    const { request_token } = createRequestTokenResponse.data;
    window.localStorage.setItem('request_token', request_token);
    window.open(`https://www.themoviedb.org/auth/access?request_token=${request_token}`, '_self');
    return createRequestTokenResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error((error as Error).message as string);
  }
};

const approveAccessToken = async (): Promise<AxiosResponse> => {
  try {
    const request_token = window.localStorage.getItem('request_token');
    window.localStorage.clear();
    const createAccessTokenResponse = await axiosClientApiV4.post(`/auth/access_token`, {
      request_token,
    });
    return createAccessTokenResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error((error as Error).message as string);
  }
};

const createSession = async (access_token: string): Promise<AxiosResponse> => {
  try {
    const createNewSessionResponse = await axiosClientApiV3.post(
      `/authentication/session/convert/4`,
      {
        access_token,
      }
    );
    return createNewSessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error((error as Error).message as string);
  }
};

const logoutV4 = async (): Promise<AxiosResponse> => {
  try {
    const deleteSessionResponse = await axiosClientApiV4.delete(`/auth/access_token`, {
      data: {
        access_token: process.env.VUE_APP_ACCESS_TOKEN,
      },
    });
    return deleteSessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { loginV3, logoutV3, loginV4, logoutV4, approveAccessToken, createSession };
