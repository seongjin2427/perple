import React, { useEffect, useState } from 'react';

import SideMenu from 'layouts/SideMenu';
import Menu from 'components/shared/Menu';
import HamburgerButton from 'components/shared/HamburgerButton';
import Modal from 'components/shared/Modal';
import LoginComponent from 'components/LoginComponent';
import { AUTH_HEADER_MENU, UNAUTH_HEADER_MENU } from 'constants/menu';
import * as S from './Header.styled';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import instance from 'api/instance';
import { userLogin } from 'store/globalSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) {
      (async function () {
        try {
          const { data } = await instance.post(
            '/auth/token',
            {},
            { withCredentials: true },
          );
          if (data.accessToken) {
            instance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${data.accessToken}`;
            dispatch(userLogin());
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [dispatch, isAuth]);

  return (
    <S.Container>
      <S.LogoDiv />
      <S.SearchDiv>
        <S.SearchInput />
        <S.SearchButton>검색</S.SearchButton>
      </S.SearchDiv>
      <S.HeaderMenuDiv>
        <S.HeaderMenuUl>
          {isAuth ? (
            <Menu menus={AUTH_HEADER_MENU} element={S.HeaderMenuLi} />
          ) : (
            <Menu menus={UNAUTH_HEADER_MENU} element={S.HeaderMenuLi} />
          )}
        </S.HeaderMenuUl>
      </S.HeaderMenuDiv>
      <S.MenuButton onClick={() => setToggle(!toggle)}>
        <HamburgerButton width={50} toggle={toggle} />
      </S.MenuButton>
      <SideMenu active={toggle} />
      <Modal title="로그인" element={<LoginComponent />} />
    </S.Container>
  );
};

export default Header;
