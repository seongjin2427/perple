import React from 'react';
import { useState } from 'react';
import * as S from './Header.styled';

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <S.Container>
      <S.Logo />
      <S.SideMenu active={toggle} />
      <S.MenuButton type="button" onClick={() => setToggle(!toggle)} />
    </S.Container>
  );
};

export default Header;
