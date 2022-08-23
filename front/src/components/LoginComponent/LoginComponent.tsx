import React from 'react';

import useGoogle from 'hooks/useGoogle';
import * as S from './LoginComponent.styled';

const LoginComponent = () => {
  const { loginUri } = useGoogle({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });

  return (
    <S.Container>
      <a href={loginUri}>
        <S.GoogleLoginDiv>
          <S.GoogleIcon>
            <S.GoogleIconImg src={require('../../assets/google_icon.png')} />
          </S.GoogleIcon>
          <S.GoogleIconText>구글로 로그인하기</S.GoogleIconText>
        </S.GoogleLoginDiv>
      </a>
    </S.Container>
  );
};

export default LoginComponent;
