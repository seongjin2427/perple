import React, { useState } from 'react';

import SideMenu from 'layouts/SideMenu';
import Menu from 'components/shared/Menu';
import * as S from './Header.styled';
import { AUTH_HEADER_MENU, UNAUTH_HEADER_MENU } from 'constants/menu';
import HamburgerButton from 'components/shared/HamburgerButton';

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const isAuth = true;

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
            <Menu menu={AUTH_HEADER_MENU} component={S.HeaderMenuLi} />
          ) : (
            <Menu menu={UNAUTH_HEADER_MENU} component={S.HeaderMenuLi} />
          )}
        </S.HeaderMenuUl>
      </S.HeaderMenuDiv>
      <S.MenuButton onClick={() => setToggle(!toggle)}>
        <HamburgerButton width={50} toggle={toggle} />
      </S.MenuButton>
      <SideMenu active={toggle} />
    </S.Container>
  );
};

export default Header;
