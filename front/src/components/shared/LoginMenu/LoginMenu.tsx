import React from 'react';
import { useDispatch } from 'react-redux';
import { DefaultTheme, StyledComponent } from 'styled-components';

import useModal from 'hooks/useModal';
import { toggleSideMenu, userLogout } from 'store/globalSlice';
import { useNavigate } from 'react-router-dom';

interface LoginMenuMenuProps {
  isAuth?: boolean;
  menus: {
    text: string;
    name: string;
    show: boolean;
    onClick: () => void;
  }[];
  element: StyledComponent<'li', DefaultTheme, {}, never>;
}

const LoginMenu = ({
  isAuth,
  menus,
  element: Component,
}: LoginMenuMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, { open }] = useModal();

  const doFunction = async (onClick: () => void) => {
    if (isAuth) {
      await onClick();
      dispatch(userLogout());
      dispatch(toggleSideMenu(false));
      navigate('/');
    } else {
      open();
      onClick();
    }
  };

  return (
    <>
      {menus.map(
        ({ text, name, show, onClick }) =>
          show === isAuth && (
            <Component key={name} onClick={() => doFunction(onClick)}>
              {text}
            </Component>
          ),
      )}
    </>
  );
};

export default LoginMenu;
