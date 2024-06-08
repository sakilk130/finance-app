import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './features/auth-slice';
import accountCreateModalSlice from './features/account-create-modal-slice';
import accountEditModalSlice from './features/account-edit-modal-slice';
import accountDeleteModalSlice from './features/account-delete-modal-slice';
import categoryCreateModalSlice from './features/category-create-modal-slice';
import categoryEditModalSlice from './features/category-edit-modal-slice';
import categoryDeleteModalSlice from './features/category-delete-modal-slice';

const rootReducer = combineReducers({
  auth: authSlice,
  accountCreateModal: accountCreateModalSlice,
  accountEditModal: accountEditModalSlice,
  accountDeleteModal: accountDeleteModalSlice,
  categoryCreateModal: categoryCreateModalSlice,
  categoryEditModal: categoryEditModalSlice,
  categoryDeleteModal: categoryDeleteModalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
