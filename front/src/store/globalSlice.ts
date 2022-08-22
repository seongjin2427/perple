import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

export const { openModal, closeModal } = globalSlice.actions;

export default globalSlice.reducer;
