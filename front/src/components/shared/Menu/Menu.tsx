import React from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';

import useModal from 'hooks/useModal';

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
  const modalInfo = useModal();
  const [, actions] = modalInfo;
  return (
    <>
      {menu.map(({ name, link, text }, idx) => (
        <Component key={name} onClick={actions.open}>
          {text}
        </Component>
      ))}
    </>
  );
};

export default Menu;
