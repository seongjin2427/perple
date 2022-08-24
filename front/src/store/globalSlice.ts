import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  modal: boolean;
  isLogin: boolean;
}

const initialState: initialStateType = {
  modal: false,
  isLogin: false,
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
    userLogin(state) {
      state.isLogin = true;
    },
    userLogout(state) {
      state.isLogin = false;
    },
  },
});

export const { openModal, closeModal, userLogin, userLogout } =
  globalSlice.actions;

export default globalSlice.reducer;
