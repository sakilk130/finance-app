import axiosInstance from '@/config/axios';
import { ACCOUNTS } from '@/constants';
import { HTTP_STATUS } from '@/enums/http-status';

export const createAccountService = async <T>(data: T): Promise<any> => {
  try {
    const response = await axiosInstance.post(ACCOUNTS.CREATE, data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};
