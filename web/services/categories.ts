import axiosInstance from '@/config/axios';
import { ACCOUNTS, CATEGORIES } from '@/constants';
import { HTTP_STATUS } from '@/enums/http-status';

export const createCategoriesService = async <T>(data: T): Promise<any> => {
  try {
    const response = await axiosInstance.post(CATEGORIES.CREATE, data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getCategoriesService = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(CATEGORIES.GET);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const bulkDeleteCategoriesService = async (
  ids: number[]
): Promise<any> => {
  try {
    const response = await axiosInstance.post(CATEGORIES.BULK_DELETE, {
      ids,
    });
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getSingleCategoriesService = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(CATEGORIES.SINGLE_GET(id));
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateCategoriesService = async ({
  id,
  data,
}: any): Promise<any> => {
  try {
    const response = await axiosInstance.patch(CATEGORIES.UPDATE(id), data);
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCategoriesService = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(CATEGORIES.DELETE(id));
    if (response.data?.status === HTTP_STATUS.OK) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};
