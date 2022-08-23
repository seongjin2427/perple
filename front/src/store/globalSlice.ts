import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  modal: boolean;
}

const initialState: initialStateType = {
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
