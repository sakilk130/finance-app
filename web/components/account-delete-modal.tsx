import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants';
import { useDelete } from '@/hooks/use-api';
import { closeDeleteModal } from '@/redux/features/account-delete-modal-slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deleteAccountService } from '@/services/account';
import { errorResponseHandler } from '@/utils';
import DeleteAlert from './delete-alert';

const AccountDeleteModal = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector((state) => state.accountDeleteModal);
  const deleteAccount: any = useDelete(deleteAccountService);

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

  const onDeleted = () => {
    if (!data) {
      return toast.error('Account not found');
    }
    deleteAccount.mutate(data?.id, {
      onSuccess: (successData: any) => {
        toast.success(successData?.message || 'Account delete successfully');
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ACCOUNTS],
        });
        dispatch(closeDeleteModal());
      },
      onError: (error: any) => {
        errorResponseHandler(
          error,
          'An error occurred while deleting an account.'
        );
      },
    });
  };

  return (
    <DeleteAlert
      open={open}
      onClose={onClose}
      onConfirm={onDeleted}
      loading={false}
      subTitle="This action cannot be undone. This will permanently delete your
    account and remove your data from our servers."
    />
  );
};

export { AccountDeleteModal };
