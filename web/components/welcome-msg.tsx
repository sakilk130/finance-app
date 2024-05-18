'use client';

import React from 'react';

import { RootState } from '@/redux/reducers';
import { useAppSelector } from '@/redux/store';

const WelcomeMsg = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl font-medium text-white lg:text-4xl">
        Welcome Back, {user?.name} 👋
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export { WelcomeMsg };
