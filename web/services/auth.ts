import axiosInstance from '@/config/axios';
import { AUTH } from '@/constants';

export const signUpService = async <T>(data: T) => {
  try {
    const response = await axiosInstance.post(AUTH.SIGN_UP, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
