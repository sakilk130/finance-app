'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { openModal } from '@/redux/features/account-create-modal-slice';
import { useAppDispatch } from '@/redux/store';

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(openModal())}>Add an Account</Button>
    </div>
  );
};

export default DashboardPage;
