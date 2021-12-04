import axios, { AxiosResponse } from 'axios';
import axiosClient from '../utils/axiosClient';

const login = async (username: string, password: string): Promise<AxiosResponse> => {
  try {
    const createRequestTokenResponse = await axiosClient.get(`/authentication/token/new`);
    const { request_token } = createRequestTokenResponse.data;
    await axiosClient.post(`/authentication/token/validate_with_login`, {username, password, request_token});
    const createNewSessionResponse = await axiosClient.post(`/authentication/session/new`, {request_token});
    return createNewSessionResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.status_message);
    }
    throw new Error('Server is unavailable');
  }
};

export { login };