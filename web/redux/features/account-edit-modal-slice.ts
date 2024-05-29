import { createSlice } from '@reduxjs/toolkit';

interface AccountEditModalState {
  open: boolean;
  data: any;
}

const initialState: AccountEditModalState = {
  open: false,
  data: null,
};

const accountEditModal = createSlice({
  name: 'account-edit-modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = accountEditModal.actions;
export default accountEditModal.reducer;
