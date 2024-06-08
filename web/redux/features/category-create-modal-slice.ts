import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const categoryCreateModal = createSlice({
  name: 'category-create-modal',
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

export const { openModal, closeModal } = categoryCreateModal.actions;
export default categoryCreateModal.reducer;
