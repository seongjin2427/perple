import React from 'react';
import { useSelector } from 'react-redux';

import Menu from 'components/shared/Menu';
import { RootState } from 'store/store';
import { AUTH_HEADER_MENU, UNAUTH_HEADER_MENU } from 'constants/menu';
import * as S from './SideMenu.styled';

interface SideMenuProps {
  active: boolean;
}

const SideMenu = ({ active }: SideMenuProps) => {
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const userId = '뚠뚠이감자';
  return (
    <S.Container active={active}>
      <S.SideMenuUl>
        {isAuth ? (
          <>
            <S.UserDiv>{userId}님 어서오세요😄</S.UserDiv>
            <Menu menus={AUTH_HEADER_MENU} element={S.SideMenuLi} />
          </>
        ) : (
          <Menu menus={UNAUTH_HEADER_MENU} element={S.SideMenuLi} />
        )}
      </S.SideMenuUl>
    </S.Container>
  );
};

export default SideMenu;
