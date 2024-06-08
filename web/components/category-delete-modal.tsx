import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants';
import { useDelete } from '@/hooks/use-api';
import { closeDeleteModal } from '@/redux/features/category-delete-modal-slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deleteCategoriesService } from '@/services';
import { errorResponseHandler } from '@/utils';
import DeleteAlert from './delete-alert';

const CategoryDeleteModal = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector((state) => state.categoryDeleteModal);
  const deleteCategory: any = useDelete(deleteCategoriesService);

  const onClose = () => {
    dispatch(closeDeleteModal());
  };

  const onDeleted = () => {
    if (!data) {
      return toast.error('Category not found');
    }
    deleteCategory.mutate(data?.id, {
      onSuccess: (successData: any) => {
        toast.success(successData?.message || 'Category delete successfully');
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CATEGORIES],
        });
        dispatch(closeDeleteModal());
      },
      onError: (error: any) => {
        errorResponseHandler(
          error,
          'An error occurred while deleting an category.'
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
    category and remove your data from our servers."
    />
  );
};

export { CategoryDeleteModal };
