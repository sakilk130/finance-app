import axios from 'axios';

import { HTTP_STATUS } from '@/enums/http-status';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth?.access_token || getPersistData();

    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    config.headers['Accept-Language'] = 'en-US';
    config.headers['language'] = 'en-US';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.code === HTTP_STATUS.UNAUTHORIZED) {
      //   removePersistData();
      window.location.href = '/log-in';
    }
    return response;
  },
  (error) => {
    if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
      //   removePersistData();
      window.location.href = '/log-in';
    }
  }
);

export default axiosInstance;
