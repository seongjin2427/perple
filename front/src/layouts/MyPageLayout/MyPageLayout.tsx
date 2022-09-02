import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import * as S from './MyPageLayout.styled';

interface MyPageLayoutProps {
  children: ReactNode;
}

const MyPageLayout = ({ children }: MyPageLayoutProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.SideNavigationDiv>
          <S.SideNavigation>
            <S.SideNaviTitle>마이페이지</S.SideNaviTitle>
            <S.SideNaviMenuDiv>
              <S.SideNaviMenuUl>
                <S.SideNaviMenuLi>내 정보</S.SideNaviMenuLi>
                <S.SideNaviMenuLi>
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
