import axiosInstance from '@/config/axios';
import { TRANSACTIONS } from '@/constants';
import { HTTP_STATUS } from '@/enums/http-status';

export const createTransactionService = async <T>(data: T): Promise<any> => {
  try {
    const response = await axiosInstance.post(TRANSACTIONS.CREATE, data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getTransactionService = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(TRANSACTIONS.GET);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};
