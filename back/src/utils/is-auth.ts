import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { IUserDocument } from '@/src/models/user';
import { verifyToken } from '@/src/utils/jwt';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ error: 'Not authenticated' });
  }
  const token = authHeader?.split(' ')[1];
  let decodedToken;

  try {
    if (token) {
      decodedToken = verifyToken(token) as { userInfo: IUserDocument };
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Somethings wrong!' });
  }

  if (!decodedToken) {
    res.status(401).json({ error: 'Not authenticated' });
  }
  req.userInfo = decodedToken?.userInfo;

  next();
};

export default isAuth;
