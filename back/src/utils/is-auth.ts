import { NextFunction, Request, Response } from 'express';

import User from '@/src/models/user';
import {
  decodeToken,
  makeRefreshToken,
  makeToken,
  verifyToken,
} from '@/src/utils/jwt';

interface TokenType {
  userId: string;
  iat: number;
  exp: number;
}

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log('isAuth');

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const [tokenType, tokenValue] = authHeader?.split(' ');
  const refreshToken = req.cookies['refreshToken'];
  let decodedToken;

  console.log(tokenValue);
  if (tokenValue !== 'null' && tokenValue !== undefined) {
    decodedToken = verifyToken(tokenValue) as TokenType;
  }
  if (refreshToken) {
    decodedToken = verifyToken(refreshToken) as TokenType;
  }

  if (decodedToken && decodedToken.toString() === 'Expired token') {
    res.clearCookie('refreshToken');
    return res.json({ errorMessage: 'login needed' });
  }
  if (!decodedToken) {
    return res.json({ errorMessage: 'login needed' });
  }

  console.log('decodedToken', decodedToken);
  console.log('8');
  req.userInfo = await User.findById(decodedToken?.userId);

  next();
};

export default isAuth;
