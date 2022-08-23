import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { findUserBySnsId, saveUser } from '@/src/service/user';

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

    const isExist = await findUserBySnsId('google', sub);
    if (isExist) {
      return res.redirect(`http://localhost:3000/?signupId=이미_가입함`);
    } else {
      const signUpUserId = await saveUser(userInformation);
      return res.redirect(`http://localhost:3000/?signupId=${signUpUserId}`);
    }
  } catch (e) {
    console.log('에러다', e);
  }
};
