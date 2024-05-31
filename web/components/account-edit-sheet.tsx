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
import { openDeleteModal } from '@/redux/features/account-delete-modal-slice';
import { closeModal } from '@/redux/features/account-edit-modal-slice';
import { RootState } from '@/redux/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateAccountService } from '@/services/account';
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

const AccountEditSheet = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector(
    (state: RootState) => state.accountEditModal
  );

  const updateAccount: any = usePut(updateAccountService);

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
    updateAccount.mutate(
      {
        id: data?.id,
        data: value,
      },
      {
        onSuccess: (successData: any) => {
          toast.success(successData?.message || 'Account update successfully');
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.ACCOUNTS],
          });
          reset();
          dispatch(closeModal());
        },
        onError: (error: any) => {
          errorResponseHandler(
            error,
            'An error occurred while updating an account.'
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
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Update the account details below.</SheetDescription>
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
              placeholder="e.g. Checking Account"
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
            disabled={updateAccount.isPending}
            className="mb-4"
          >
            {updateAccount.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Account
          </Button>
          <Button
            type="button"
            disabled={updateAccount.isPending}
            variant="outline"
            className="text-red-500"
            onClick={onOpenDeleteModal}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { AccountEditSheet };
