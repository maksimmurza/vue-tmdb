import axios from 'axios';

const axiosConfig = {
  baseURL: process.env.VUE_APP_BASE_URL_API_V3,
  params: { api_key: process.env.VUE_APP_API_KEY },
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosClientApiV3 = axios.create(axiosConfig);
const axiosClientApiV4 = axios.create({
  ...axiosConfig,
  baseURL: process.env.VUE_APP_BASE_URL_API_V4,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`,
  },
});

export { axiosClientApiV3, axiosClientApiV4 };
