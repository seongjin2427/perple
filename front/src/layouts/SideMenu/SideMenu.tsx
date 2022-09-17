import React from 'react';
import { useSelector } from 'react-redux';

import Menu from 'components/shared/Menu';
import { RootState } from 'store/store';
import { LOGIN_MENU, AUTH_HEADER_MENU } from 'constants/menu';
import * as S from './SideMenu.styled';
import LoginMenu from 'components/shared/LoginMenu';

interface SideMenuProps {
  active: boolean;
}

const SideMenu = ({ active }: SideMenuProps) => {
  const { isLogin: isAuth, userInfo } = useSelector(
    ({ global }: RootState) => global,
  );

  return (
    <S.Container active={active}>
      <S.SideMenuUl>
        {isAuth && <S.UserDiv>{userInfo.nickname}님 어서오세요 😄</S.UserDiv>}
        <LoginMenu isAuth={isAuth} menus={LOGIN_MENU} element={S.SideMenuLi} />
        {isAuth && (
          <Menu
            isAuth={isAuth}
            menus={AUTH_HEADER_MENU}
            element={S.SideMenuLi}
          />
        )}
      </S.SideMenuUl>
    </S.Container>
  );
};

export default SideMenu;
