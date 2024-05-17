'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePost } from '@/hooks/use-api';
import { clearUser, setUser } from '@/redux/features/auth-slice';
import { useAppDispatch } from '@/redux/store';
import { signInService } from '@/services';
import { errorResponseHandler } from '@/utils';
import { schema } from '../_utils';

const Form = () => {
  const dispatch = useAppDispatch();
  const signIn = usePost(signInService);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    signIn.mutate(data, {
      onSuccess: (data) => {
        dispatch(
          setUser({
            user: data?.data?.user,
            token: data?.data?.token,
          })
        );
        toast.success(data?.message || 'Logged in successfully');
      },
      onError: (error) => {
        dispatch(clearUser());
        errorResponseHandler(error, 'An error occurred while logging in.');
      },
    });
  };

  return (
    <div className="flex justify-center  h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center sm:p-4 md:p-0">
        <div className="text-3xl font-bold text-gray-800">Welcome Back!</div>
        <div className="text-gray-500 mt-3 text-center">
          Login or create an account to get back to your dashboard
        </div>
        <div className="w-full md:w-2/3 mt-5 rounded-lg shadow-lg border border-gray-300 p-5">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col justify-center"
          >
            <div className="text-2xl font-bold text-gray-800 text-center">
              Sign in to Finance
            </div>
            <div className="text-gray-500 mt-3 text-center">
              Welcome back! Please sign in to your account to continue
            </div>
            <Input
              className="mt-5"
              placeholder="Email"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <div className="text-red-500 mt-1 mx-1">
                {errors.email.message}
              </div>
            )}
            <Input
              className="mt-5"
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <div className="text-red-500 mt-1 mx-1">
                {errors.password.message}
              </div>
            )}
            <Button
              className="mt-5 w-full"
              type="submit"
              disabled={signIn.isPending}
            >
              {signIn.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </form>
          <hr className="mt-5 w-full border border-gray-300" />
          <div className="flex justify-center items-center mt-5">
            <div className="text-gray-500">Don&apos;t have an account?</div>
            <Link
              href="/sign-up"
              className="text-blue-600 ml-1 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center items-center w-full md:w-1/2 bg-blue-600 hidden md:flex">
        <div className="flex  justify-center items-center">
          <Image src="/auth.svg" alt="Sign In" height={100} width={100} />
        </div>
      </div>
    </div>
  );
};

export { Form };
