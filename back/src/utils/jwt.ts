import { IUserDocument } from '@/src/models/user';
import jwt from 'jsonwebtoken';

export const makeToken = (userInfo: IUserDocument) => {
  try {
    return jwt.sign({ userInfo }, 'perpleToken', {
      expiresIn: '2h',
    });
  } catch (e) {
    console.log(e);
  }
};

export const makeRefreshToken = (userInfo: IUserDocument) => {
  try {
    return jwt.sign({ userInfo }, 'perpleToken', {
      expiresIn: '14d',
    });
  } catch (e) {
    console.log(e);
  }
};

interface SystemError {
  code: string;
  message: string;
  name: string;
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, 'perpleToken');
    return decoded;
  } catch (err) {
    const e = err as SystemError;
    if (e.name === 'TokenExpiredError') {
      console.log(e);
    }
    if (e.name === 'JsonWebTokenError') {
      console.log(e);
    }
    if (e.name === 'NotBeforeError') {
      console.log(e);
    }
    return false;
  }
};