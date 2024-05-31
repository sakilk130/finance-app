'use client';

import React from 'react';

import { AccountCreateSheet } from '@/components/account-create-sheet';
import { AccountDeleteModal } from '@/components/account-delete-modal';
import { AccountEditSheet } from '@/components/account-edit-sheet';

const ModalProvider = () => {
  return (
    <>
      <AccountCreateSheet />
      <AccountEditSheet />
      <AccountDeleteModal />
    </>
  );
};

export { ModalProvider };
