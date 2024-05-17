import toast from 'react-hot-toast';

import { HTTP_STATUS } from '@/enums/http-status';
import { clearUser } from '@/redux/features/auth-slice';
import store from '@/redux/store';

export const errorResponseHandler = (error: any, errorMessage: string) => {
  if (error?.response && error?.code === HTTP_STATUS.UNAUTHORIZED) {
    store.dispatch(clearUser());
    toast.error(
      error?.message || 'Your session has expired. Please login again.'
    );
    return;
  }
  toast.error(
    error?.response?.data?.message ||
      error?.response?.data?.error?.message ||
      error?.message ||
      errorMessage
  );
};
