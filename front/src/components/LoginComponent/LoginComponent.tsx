import React from 'react';

import * as S from './LoginComponent.styled';

const LoginComponent = () => {
  return (
    <S.Container>
      <a href={`${process.env.REACT_APP_GOOGLE_LOGIN_URL}`}>
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
