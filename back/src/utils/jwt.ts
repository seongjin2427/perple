import jwt from 'jsonwebtoken';

export const makeToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, 'perpleToken', {
      expiresIn: '10s',
    });
  } catch (e) {
    console.log(e);
  }
};

export const makeRefreshToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, 'perpleToken', {
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
      return 'Expired token';
    }
    if (e.name === 'JsonWebTokenError') {
      console.log(e);
    }
    if (e.name === 'NotBeforeError') {
      console.log(e);
    }
    return 'error';
  }
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (err) {
    console.log(err);
  }
};
