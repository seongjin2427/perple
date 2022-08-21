import React from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';

import * as S from './Menu.styled';

interface MenuProps {
  menu: {
    text: string;
    name: string;
    link: string;
    onClick: () => void;
  }[];
  component: StyledComponent<'li', DefaultTheme, {}, never>;
}

const Menu = ({ menu, component: Component }: MenuProps) => {
  return (
    <>
      {menu.map(({ name, link, text }, idx) => (
        <Component key={name}>{text}</Component>
      ))}
    </>
  );
};

export default Menu;
