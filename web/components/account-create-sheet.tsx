'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { usePost } from '@/hooks/use-api';
import { closeModal } from '@/redux/features/account-create-modal-slice';
import { RootState } from '@/redux/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createAccountService } from '@/services/account';
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

const AccountCreateSheet = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(
    (state: RootState) => state.accountCreateModal
  );
  const createAccount = usePost(createAccountService);

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
    createAccount.mutate(data, {
      onSuccess: (data) => {
        dispatch(closeModal());
        toast.success(data?.message || 'Account created successfully');
        reset();
      },
      onError: (error) => {
        errorResponseHandler(
          error,
          'An error occurred while creating an account.'
        );
      },
    });
  };

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={() => dispatch(closeModal())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create an account</SheetTitle>
          <SheetDescription>
            Fill in the form below to create a new account.
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
          <Button type="submit" disabled={createAccount.isPending}>
            {createAccount.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { AccountCreateSheet };
