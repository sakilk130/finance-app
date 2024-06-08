'use client';

import React from 'react';

import { AccountCreateSheet } from '@/components/account-create-sheet';
import { AccountDeleteModal } from '@/components/account-delete-modal';
import { AccountEditSheet } from '@/components/account-edit-sheet';
import { CategoryCreateSheet } from '@/components/category-create-sheet';
import { CategoryEditSheet } from '@/components/category-edit-sheet';
import { CategoryDeleteModal } from '@/components/category-delete-modal';

const ModalProvider = () => {
  return (
    <>
      <AccountCreateSheet />
      <AccountEditSheet />
      <AccountDeleteModal />
      <CategoryCreateSheet />
      <CategoryEditSheet />
      <CategoryDeleteModal />
    </>
  );
};

export { ModalProvider };
