import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/store';
import SideMenu from 'layouts/SideMenu';
import HamburgerButton from 'components/shared/HamburgerButton';
import Modal from 'components/shared/Modal';
import LoginComponent from 'components/LoginComponent';
import Menu from 'components/shared/Menu';
import LoginMenu from 'components/shared/LoginMenu';

import instance from 'api/instance';
import { toggleSideMenu, userInfoSet, userLogin } from 'store/globalSlice';
import { LOGIN_MENU, AUTH_HEADER_MENU } from 'constants/menu';
import * as S from './Header.styled';
import SearchForm from 'components/shared/SearchForm';

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin: isAuth, sideMenu } = useSelector(
    ({ global }: RootState) => global,
  );

  const loginFunction = useCallback(async () => {
    if (!isAuth) {
      try {
        const { data } = await instance.post(
          'http://localhost:8080/auth/token',
          {},
          { withCredentials: true },
        );

        if (data.accessToken) {
          localStorage.setItem('Authorization', data.accessToken);
          dispatch(userInfoSet(data.userInfo));
          dispatch(userLogin());
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    loginFunction();
  }, [loginFunction]);

  return (
    <S.Container>
      <S.LogoDiv />
      <S.SearchDiv>
        <SearchForm />
      </S.SearchDiv>
      <S.HeaderMenuDiv isAuth={isAuth}>
        <S.HeaderMenuUl>
          <LoginMenu
            isAuth={isAuth}
            menus={LOGIN_MENU}
            element={S.HeaderMenuLi}
          />
          {isAuth && (
            <Menu
              isAuth={isAuth}
              menus={AUTH_HEADER_MENU}
              element={S.HeaderMenuLi}
            />
          )}
        </S.HeaderMenuUl>
      </S.HeaderMenuDiv>
      <S.MenuButton onClick={() => dispatch(toggleSideMenu(!sideMenu))}>
        <HamburgerButton width={50} toggle={sideMenu} />
      </S.MenuButton>
      <SideMenu active={sideMenu} />
      <Modal title="로그인" element={<LoginComponent />} />
    </S.Container>
  );
};

export default Header;
