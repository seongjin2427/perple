import { withDrawUser } from 'api/my-page';
import { MY_PAGE_MENU } from 'constants/menu';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from 'store/globalSlice';

import * as S from './MyPageLayout.styled';

const MyPageLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickMovePage = useCallback(
    (link: string) => {
      navigate(link);
    },
    [navigate],
  );

  const onClickWithDrawUser = useCallback(async () => {
    if (window.confirm('정말 회원 탈퇴를 하시겠습니까?')) {
      await withDrawUser();
      dispatch(userLogout());
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.SideNavigationDiv>
          <S.SideNavigation>
            <S.SideNaviTitle>마이페이지</S.SideNaviTitle>
            <S.SideNaviMenuDiv>
              <S.SideNaviMenuUl>
                {MY_PAGE_MENU.map(({ text, link }) => (
                  <S.SideNaviMenuLi
                    key={text}
                    onClick={() => onClickMovePage(link)}
                    active={location.pathname === link}
                  >
                    {text}
                  </S.SideNaviMenuLi>
                ))}
                <S.SideNaviMenuLi onClick={onClickWithDrawUser}>
                  회원 탈퇴
                </S.SideNaviMenuLi>
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
