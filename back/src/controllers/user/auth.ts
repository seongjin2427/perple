import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

import { findUserBySnsId, saveUser } from '@/src/service/user';
import { makeRefreshToken, makeToken, verifyToken } from '@/src/utils/jwt';
import { IUserDocument } from '@/src/models/user';

interface RefreshTokenType {
  userInfo: IUserDocument;
  iat: number;
  exp: number;
}

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('getToken');
  const clientRefreshToken = req.cookies['refreshToken'];
  // if (!clientRefreshToken) {
  //   return res.json({});
  // }
  try {
    const { userInfo } = verifyToken(clientRefreshToken) as RefreshTokenType;

    if (userInfo) {
      const accessToken = makeToken(userInfo);
      const refreshToken = makeRefreshToken(userInfo);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 2 * 10000,
        httpOnly: true,
      });

      return res.json({ accessToken, userInfo });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json('오류 발생');
  }
};

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:8080/auth/google/callback';

export const getGoogleCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('getGoogleToken');

  return res.redirect(
    `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.profile`,
  );
};

export const getGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.query;

  try {
    const { data } = await axios({
      method: 'POST',
      url: `${GOOGLE_AUTH_TOKEN_URL}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECURE_PASSWORD,
        redirectUri: GOOGLE_AUTH_REDIRECT_URL,
        code: code,
      },
    });

    const access_token = data['access_token'];

    const { data: fetchedUser } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    );
    // console.log(fetchedUser);

    const { sub, email, name, picture } = fetchedUser;
    const userInformation = {
      email,
      nickname: name,
      snsId: sub,
      type: 'google',
      profileImage: picture,
    };
    // console.log(userInformation);

    const userInfo = await findUserBySnsId('google', sub);
    let refreshToken: string | undefined;

    if (userInfo) {
      refreshToken = makeRefreshToken(userInfo);
    } else {
      const signUpUser = await saveUser(userInformation);
      if (typeof signUpUser !== 'string') {
        refreshToken = makeRefreshToken(signUpUser);
      }
    }

    res.cookie('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 2 * 10000,
      httpOnly: true,
    });

    return res.redirect(302, 'http://localhost:3000');
  } catch (e) {
    console.log('에러다', e);
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('userLogout');
  res.clearCookie('refreshToken');

  return res.status(200).json({ message: 'Logout!' });
};
