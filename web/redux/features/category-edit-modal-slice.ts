import { createSlice } from '@reduxjs/toolkit';

interface CategoryEditModalState {
  open: boolean;
  data: any;
}

const initialState: CategoryEditModalState = {
  open: false,
  data: null,
};

const categoryEditModal = createSlice({
  name: 'category-edit-modal',
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

export const { openModal, closeModal } = categoryEditModal.actions;
export default categoryEditModal.reducer;
