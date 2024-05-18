import axiosInstance from '@/config/axios';
import { AUTH } from '@/constants';
import { HTTP_STATUS } from '@/enums/http-status';

export const signUpService = async <T>(data: T): Promise<any> => {
  try {
    const response = await axiosInstance.post(AUTH.SIGN_UP, data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const signInService = async <T>(data: T): Promise<any> => {
  try {
    const response = await axiosInstance.post(AUTH.SIGN_IN, data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};
