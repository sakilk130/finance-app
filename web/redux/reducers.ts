import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './features/auth-slice';
import accountCreateModalSlice from './features/account-create-modal-slice';
import accountEditModalSlice from './features/account-edit-modal-slice';
import accountDeleteModalSlice from './features/account-delete-modal-slice';

const rootReducer = combineReducers({
  auth: authSlice,
  accountCreateModal: accountCreateModalSlice,
  accountEditModal: accountEditModalSlice,
  accountDeleteModal: accountDeleteModalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
