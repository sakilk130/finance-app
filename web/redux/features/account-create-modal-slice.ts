import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const accountCreateModal = createSlice({
  name: 'account-create-modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = accountCreateModal.actions;
export default accountCreateModal.reducer;
