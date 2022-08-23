import React, { useState } from 'react';

import SideMenu from 'layouts/SideMenu';
import Menu from 'components/shared/Menu';
import HamburgerButton from 'components/shared/HamburgerButton';
import * as S from './Header.styled';
import { AUTH_HEADER_MENU, UNAUTH_HEADER_MENU } from 'constants/menu';
import Modal from 'components/shared/Modal';
import LoginComponent from 'components/LoginComponent';

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const isAuth = false;

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
