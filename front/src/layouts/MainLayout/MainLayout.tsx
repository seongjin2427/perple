import React, { ReactNode } from 'react';

import Header from 'layouts/Header';
import * as S from './MainLayout.styled';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <S.Container>
      <Header />
      <S.MainWrapper>{children}</S.MainWrapper>
    </S.Container>
  );
};

export default MainLayout;
