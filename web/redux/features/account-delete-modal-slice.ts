import { createSlice } from '@reduxjs/toolkit';

interface AccountDeleteModalState {
  open: boolean;
  data: any;
}

const initialState: AccountDeleteModalState = {
  open: false,
  data: null,
};

const accountDeleteModal = createSlice({
  name: 'account-delete-modal',
  initialState,
  reducers: {
    openDeleteModal: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    closeDeleteModal: (state) => {
      state.open = false;
      state.data = null;
    },
  },
});

export const { openDeleteModal, closeDeleteModal } = accountDeleteModal.actions;
export default accountDeleteModal.reducer;
