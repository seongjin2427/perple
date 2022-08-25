import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoType {
  _id: string;
  email: string;
  nickname: string;
  profileImage: string;
  snsId: string;
  type: string;
}

interface initialStateType {
  userInfo: UserInfoType;
  modal: boolean;
  sideMenu: boolean;
  isLogin: boolean;
}

const initialState: initialStateType = {
  modal: false,
  isLogin: false,
  sideMenu: false,
  userInfo: {
    _id: '',
    email: '',
    nickname: '',
    profileImage: '',
    snsId: '',
    type: '',
  },
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
    toggleSideMenu(state, action: PayloadAction<boolean>) {
      state.sideMenu = action.payload;
    },
    userLogin(state) {
      state.isLogin = true;
    },
    userLogout(state) {
      state.isLogin = false;
    },
    userInfoSet(state, action: PayloadAction<UserInfoType>) {
      state.userInfo = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleSideMenu,
  userLogin,
  userLogout,
  userInfoSet,
} = globalSlice.actions;

export default globalSlice.reducer;
