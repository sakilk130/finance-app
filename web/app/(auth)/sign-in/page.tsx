'use client';

import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { schema } from './form';

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    reset();
  };

  return (
    <div className="flex justify-between h-screen">
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="text-3xl font-bold text-gray-800">Welcome Back!</div>
        <div className="text-gray-500 mt-3">
          Login or create to get back to your dashboard
        </div>
        <div className="w-2/3 h-1/2  mt-5 rounded-lg shadow-lg border-slate-500 p-5">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col justify-center  mt-4">
              <div className="text-2xl font-bold text-gray-800 text-center">
                Sign in to Finance
              </div>
              <div className="text-gray-500 mt-3 px-3 text-center">
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
              <Button className="mt-5 w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <hr className="mt-5 w-full border-1 border-gray-300" />
          <div className="flex justify-center items-center mt-5">
            <div className="text-gray-500">Don&apos;t have an account?</div>
            <a href="/sign-up" className="text-blue-600 ml-1 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-blue-600">
        <div className="flex flex-col justify-center items-center">
          <Image src="/auth.svg" alt="Sign In" height={100} width={100} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
