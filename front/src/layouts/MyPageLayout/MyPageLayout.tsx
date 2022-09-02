import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import * as S from './MyPageLayout.styled';

const MyPageLayout = () => {
  const location = useLocation();

  return (
    <S.Container>
      <S.Wrapper>
        <S.SideNavigationDiv>
          <S.SideNavigation>
            <S.SideNaviTitle>마이페이지</S.SideNaviTitle>
            <S.SideNaviMenuDiv>
              <S.SideNaviMenuUl>
                <S.SideNaviMenuLi
                  active={location.pathname === '/my' ? true : false}
                >
                  내 정보
                </S.SideNaviMenuLi>
                <S.SideNaviMenuLi
                  active={location.pathname === '/my/play' ? true : false}
                >
                  <del>내 오픈 플레이</del>
                </S.SideNaviMenuLi>
                <S.SideNaviMenuLi>회원 탈퇴</S.SideNaviMenuLi>
              </S.SideNaviMenuUl>
            </S.SideNaviMenuDiv>
          </S.SideNavigation>
        </S.SideNavigationDiv>
        <S.MainBox>
          <Outlet />
        </S.MainBox>
      </S.Wrapper>
    </S.Container>
  );
};

export default MyPageLayout;
