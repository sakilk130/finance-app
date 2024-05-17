'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { schema } from '../_utils';
import { usePost } from '@/hooks/use-api';
import { signUpService } from '@/services';
import { Loader2 } from 'lucide-react';

const Form = () => {
  const signUp = usePost(signUpService);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    signUp.mutate(data, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div className="flex justify-center  h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
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
              Create your account
            </div>
            <div className="text-gray-500 mt-3 text-center">
              Welcome back! Fill in the form to create your account
            </div>
            <Input
              className="mt-5"
              placeholder="Name"
              type="text"
              {...register('name')}
            />
            {errors.name && (
              <div className="text-red-500 mt-1 mx-1">
                {errors.name.message}
              </div>
            )}
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
              disabled={signUp.isPending}
            >
              {signUp.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </form>
          <hr className="mt-5 w-full border border-gray-300" />
          <div className="flex justify-center items-center mt-5">
            <div className="text-gray-500">Already have an account?</div>
            <Link
              href="/sign-in"
              className="text-blue-600 ml-1 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center items-center w-full md:w-1/2 bg-blue-600 hidden md:flex">
        <div className="flex justify-center items-center">
          <Image src="/auth.svg" alt="Sign In" height={100} width={100} />
        </div>
      </div>
    </div>
  );
};

export { Form };
