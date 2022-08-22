import React from 'react';

import useGoogle from 'hooks/useGoogle';
import * as S from './LoginComponent.styled';

const LoginComponent = () => {
  const { loginUri } = useGoogle({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });

  return (
    <S.Container>
      <a href={loginUri}>로그인 버튼</a>
    </S.Container>
  );
};

export default LoginComponent;
