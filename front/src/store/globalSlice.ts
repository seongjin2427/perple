import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoType {
  _id: string;
  email: string;
  nickname: string;
}

interface initialStateType {
  userInfo: UserInfoType;
  modal: boolean;
  sideMenu: boolean;
  searchWord: string;
  isLogin: boolean;
}

const initialState: initialStateType = {
  modal: false,
  isLogin: false,
  sideMenu: false,
  searchWord: '',
  userInfo: {
    _id: '',
    email: '',
    nickname: '',
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
      localStorage.removeItem('Authorization');
    },
    userInfoSet(state, action: PayloadAction<UserInfoType>) {
      state.userInfo = action.payload;
    },
    getSearchWord(state, action: PayloadAction<string>) {
      state.searchWord = action.payload;
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
  getSearchWord,
} = globalSlice.actions;

export default globalSlice.reducer;
