'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { usePost } from '@/hooks/use-api';
import { closeModal } from '@/redux/features/category-create-modal-slice';
import { RootState } from '@/redux/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createCategoriesService } from '@/services';
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
import { QUERY_KEY } from '@/constants';

const CategoryCreateSheet = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(
    (state: RootState) => state.categoryCreateModal
  );
  const createCategory = usePost(createCategoriesService);

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

  const onSubmitHandler = (data: any) => {
    createCategory.mutate(data, {
      onSuccess: (data) => {
        dispatch(closeModal());
        toast.success(data?.message || 'Category created successfully');
        reset();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CATEGORIES],
        });
      },
      onError: (error) => {
        errorResponseHandler(
          error,
          'An error occurred while creating an category.'
        );
      },
    });
  };

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={() => dispatch(closeModal())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create an category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions
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
          <Button type="submit" disabled={createCategory.isPending}>
            {createCategory.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Category
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { CategoryCreateSheet };
