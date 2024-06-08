import { createSlice } from '@reduxjs/toolkit';

interface CategoryDeleteModalState {
  open: boolean;
  data: any;
}

const initialState: CategoryDeleteModalState = {
  open: false,
  data: null,
};

const categoryDeleteModal = createSlice({
  name: 'category-delete-modal',
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

export const { openDeleteModal, closeDeleteModal } =
  categoryDeleteModal.actions;
export default categoryDeleteModal.reducer;
