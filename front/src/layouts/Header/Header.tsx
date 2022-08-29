import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SideMenu from 'layouts/SideMenu';
import { RootState } from 'store/store';
import SearchForm from 'components/shared/SearchForm';
import HamburgerButton from 'components/shared/HamburgerButton';
import LoginComponent from 'components/LoginComponent';
import Menu from 'components/shared/Menu';
import LoginMenu from 'components/shared/LoginMenu';

import instance from 'api/instance';
import useSecondModal from 'hooks/useModal';
import {
  toggleSideMenu,
  userInfoSet,
  userLogin,
  userLogout,
} from 'store/globalSlice';
import { LOGIN_MENU, AUTH_HEADER_MENU } from 'constants/menu';
import * as S from './Header.styled';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin: isAuth, sideMenu } = useSelector(
    ({ global }: RootState) => global,
  );

  const loginFunction = useCallback(async () => {
    if (!isAuth) {
      try {
        const { data, status } = await instance.post(
          'http://localhost:8080/auth/token',
          {},
          { withCredentials: true },
        );
        console.log('status', status);

        console.log(data);

        if (data.accessToken) {
          localStorage.setItem('Authorization', data.accessToken);
          dispatch(userInfoSet(data.userInfo));
          dispatch(userLogin());
        }
        const accessToken = localStorage.getItem('Authorization');
        if (!accessToken) {
          dispatch(userLogout());
          loginFunction();
        }
      } catch (e) {
        console.log(e);
        dispatch(userLogout());
      }
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    loginFunction();
  }, [loginFunction]);

  const [, actions, Modal] = useSecondModal({
    title: '로그인',
    component: () => <LoginComponent />,
  });

  return (
    <S.Container>
      <Modal />
      <S.LogoDiv onClick={() => navigate('/')} />
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
    </S.Container>
  );
};

export default Header;
