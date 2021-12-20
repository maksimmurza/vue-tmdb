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

export { accountDetails };