import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, StyledComponent } from 'styled-components';

interface MenuProps {
  isAuth?: boolean;
  menus: {
    text: string;
    name: string;
    link: string;
  }[];
  element: StyledComponent<'li', DefaultTheme, {}, never>;
}

const Menu = ({ isAuth, menus, element: Component }: MenuProps) => {
  const navigate = useNavigate();

  const doFunction = (link: string) => {
    navigate(link, { replace: true });
  };

  return (
    <Fragment>
      {menus.map(({ text, link, name }) => (
        <Component key={name} onClick={() => doFunction(link)}>
          {text}
        </Component>
      ))}
    </Fragment>
  );
};

export default Menu;
