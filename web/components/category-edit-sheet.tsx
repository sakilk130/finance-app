'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { QUERY_KEY } from '@/constants';
import { usePut } from '@/hooks/use-api';
import { openDeleteModal } from '@/redux/features/category-delete-modal-slice';
import { closeModal } from '@/redux/features/category-edit-modal-slice';
import { RootState } from '@/redux/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateCategoriesService } from '@/services';
import { errorResponseHandler } from '@/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

const CategoryEditSheet = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector(
    (state: RootState) => state.categoryEditModal
  );

  const updateCategory: any = usePut(updateCategoriesService);

  const onOpenDeleteModal = () => {
    dispatch(closeModal());
    dispatch(openDeleteModal(data));
  };

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (value: any) => {
    if (!data) return;
    updateCategory.mutate(
      {
        id: data?.id,
        data: value,
      },
      {
        onSuccess: (successData: any) => {
          toast.success(successData?.message || 'Category update successfully');
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.CATEGORIES],
          });
          reset();
          dispatch(closeModal());
        },
        onError: (error: any) => {
          errorResponseHandler(
            error,
            'An error occurred while updating an category.'
          );
        },
      }
    );
  };

  useEffect(() => {
    if (data && open) {
      reset({
        name: data.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, open]);

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={() => dispatch(closeModal())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit category</SheetTitle>
          <SheetDescription>
            Update the category details below.
          </SheetDescription>
        </SheetHeader>
        <form
          className="flex flex-col w-full mt-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Food"
              className="mt-1"
              {...register('name')}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={updateCategory.isPending}
            className="mb-4"
          >
            {updateCategory.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Category
          </Button>
          <Button
            type="button"
            disabled={updateCategory.isPending}
            variant="outline"
            className="text-red-500"
            onClick={onOpenDeleteModal}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Category
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { CategoryEditSheet };
