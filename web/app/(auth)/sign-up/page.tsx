import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignUpPage = () => {
  return (
    <div className="flex justify-between h-screen">
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="text-3xl font-bold text-gray-800">Welcome Back!</div>
        <div className="text-gray-500 mt-3">
          Login or create to get back to your dashboard
        </div>
        <div className="w-2/3 h-1/2  mt-5 rounded-lg shadow-lg border-slate-500 p-5">
          <form>
            <div className="flex flex-col justify-center items-center mt-4">
              <div className="text-2xl font-bold text-gray-800">
                Sign in to Finance
              </div>
              <div className="text-gray-500 mt-3 px-3">
                Welcome back! Please sign in to your account to continue
              </div>
              <Input
                className="mt-5"
                placeholder="Email"
                type="email"
                required
              />
              <Input
                className="mt-5"
                placeholder="Password"
                type="password"
                required
              />
              <Button className="mt-5 w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <hr className="mt-5 w-full border-1 border-gray-300" />
          <div className="flex justify-center items-center mt-5">
            <div className="text-gray-500">Don&apos;t have an account?</div>
            <a
              href="/auth/sign-up"
              className="text-blue-600 ml-1 hover:underline"
            >
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

export default SignUpPage;
