import React from 'react';

import * as S from './SideMenu.styled';
import { AUTH_HEADER_MENU, UNAUTH_HEADER_MENU } from 'constants/menu';
import Menu from 'components/shared/Menu';

interface SideMenuProps {
  active: boolean;
}

const SideMenu = ({ active }: SideMenuProps) => {
  const isAuth = false;
  const userId = '뚠뚠이감자';
  return (
    <S.Container active={active}>
      <S.SideMenuUl>
        {isAuth ? (
          <>
            <S.UserDiv>{userId}님 어서오세요😄</S.UserDiv>
            <Menu menu={AUTH_HEADER_MENU} component={S.SideMenuLi} />
          </>
        ) : (
          <Menu menu={UNAUTH_HEADER_MENU} component={S.SideMenuLi} />
        )}
      </S.SideMenuUl>
    </S.Container>
  );
};

export default SideMenu;
