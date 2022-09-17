import React from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';

import useAuth from 'hooks/useAuth';
import useModal from 'hooks/useModal';
import LoginComponent from 'components/LoginComponent';

interface LoginMenuMenuProps {
  isAuth?: boolean;
  menus: {
    text: string;
    name: string;
    show: boolean;
  }[];
  element: StyledComponent<'li', DefaultTheme, {}, never>;
}

const LoginMenu = ({
  isAuth,
  menus,
  element: Component,
}: LoginMenuMenuProps) => {
  const [{ login, logout }] = useAuth();
  const [, actions, Modal] = useModal({ title: '로그인' });

  const doFunction = () => {
    if (isAuth) logout();
    else {
      actions.open({});
      login();
    }
  };

  return (
    <>
      <Modal>
        <LoginComponent />
      </Modal>
      {menus.map(
        ({ text, name, show }) =>
          show === isAuth && (
            <Component key={name} onClick={() => doFunction()}>
              {text}
            </Component>
          ),
      )}
    </>
  );
};

export default LoginMenu;
